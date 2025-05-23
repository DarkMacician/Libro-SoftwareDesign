import pytest
from fastapi.testclient import TestClient
import jwt
from BackEnd.API.api import app
from BackEnd.utilities.config import SECRET_KEY

client = TestClient(app)

def create_token(username="testuser", role="user"):
    return jwt.encode({"username": username, "role": role}, SECRET_KEY, algorithm="HS256")

# -------------------------------
# SIGN UP
# -------------------------------
def test_signup_success():
    res = client.post("/signup", json={
        "username": "user1211111111111111jhvytcaaaaaaaaaa",
        "password": "pass123",
        "email": "user1@exampleaaaaaaaaa.com",
        "role": "user"
    })
    assert res.status_code == 200
    assert res.json()["message"] == "User registered successfully"

def test_signup_duplicate():
    client.post("/signup", json={
        "username": "userdup",
        "password": "123",
        "email": "userdup@example.com",
        "role": "user"
    })
    res = client.post("/signup", json={
        "username": "userdup",
        "password": "123",
        "email": "userdup@example.com",
        "role": "user"
    })
    assert res.status_code == 400
    assert res.json()["detail"] == "Username or Email already registered"

# -------------------------------
# LOGIN
# -------------------------------
def test_login_success():
    client.post("/signup", json={
        "username": "logintest",
        "password": "logintest",
        "email": "logintest@example.com",
        "role": "user"
    })
    res = client.post("/login", json={
        "username": "logintest",
        "password": "logintest"
    })
    assert res.status_code == 200
    assert "access_token" in res.json()

def test_login_fail():
    res = client.post("/login", json={
        "username": "nouser",
        "password": "wrong"
    })
    assert res.status_code == 401
    assert res.json()["detail"] == "Invalid username or password"

# -------------------------------
# ADD BOOK (Admin only)
# -------------------------------
def test_add_book_success_as_admin():
    token = create_token("admin1", "admin")
    res = client.post("/admin/add_book",
        headers={"token": token},
        json={
            "title": "Book16789aaaaaaaaa",
            "author": "Author1",
            "url": "http://example.com/book.pdf",
            "genre": ["Fiction"]
        })
    assert res.status_code == 200

def test_add_book_as_user_forbidden():
    token = create_token("user1", "user")
    res = client.post("/admin/add_book",
        headers={"token": token},
        json={
            "title": "Should Fail",
            "author": "User",
            "url": "http://example.com",
            "genre": ["Drama"]
        })
    assert res.status_code == 403

def test_add_existing_book():
    token = create_token("admin2", "admin")
    data = {
        "title": "Existing Book",
        "author": "Author",
        "url": "http://example.com/exist.pdf",
        "genre": ["Sci-Fi"]
    }
    client.post("/admin/add_book", json=data, headers={"token": token})
    res = client.post("/admin/add_book", json=data, headers={"token": token})
    assert res.status_code == 400

# -------------------------------
# READ BOOK
# -------------------------------
def test_read_book_success():
    token = create_token("admin3", "admin")
    client.post("/admin/add_book", json={
        "title": "Read Test",
        "author": "Read Auth",
        "url": "http://example.com/read.pdf",
        "genre": ["Mystery"]
    }, headers={"token": token})
    books = client.get("/search", params={"title": "Read Test"}).json()
    book_id = books[0]['book_id']
    res = client.get("/read", params={"book_id": book_id})
    assert res.status_code == 200

# -------------------------------
# DELETE BOOK (Admin only)
# -------------------------------
def test_delete_book_not_found():
    token = create_token("admin", "admin")
    res = client.delete("/admin/delete_book", params={"book_id": 999999}, headers={"token": token})
    assert res.status_code == 404

def test_delete_book_permission_denied():
    token = create_token("user1", "user")
    res = client.delete("/admin/delete_book", params={"book_id": 1}, headers={"token": token})
    assert res.status_code == 403

# -------------------------------
# BOOKMARK (User only)
# -------------------------------
def test_bookmark_success():
    token = create_token("userbm", "user")
    # You must ensure a book exists beforehand
    book = {
        "title": "BM Book",
        "author": "BMark",
        "url": "http://example.com/bm.pdf",
        "genre": ["Genre"]
    }
    admin_token = create_token("adminbm", "admin")
    client.post("/admin/add_book", json=book, headers={"token": admin_token})
    books = client.get("/search", params={"title": "BM Book"}).json()
    book_id = books[0]['book_id']
    res = client.post("/bookmark", headers={"token": token}, json={"book_id": book_id, "page": 5})
    assert res.status_code == 200

def test_bookmark_forbidden():
    token = create_token("admin", "admin")
    res = client.post("/bookmark", headers={"token": token}, json={"book_id": 1, "page": 1})
    assert res.status_code == 403

# -------------------------------
# GET BOOKMARK
# -------------------------------
def test_get_bookmark_success():
    token = create_token("userbm2", "user")
    admin_token = create_token("adminbm2", "admin")
    client.post("/admin/add_book", json={
        "title": "BM2 Book",
        "author": "BMark",
        "url": "http://example.com/bm2.pdf",
        "genre": ["Genre"]
    }, headers={"token": admin_token})
    books = client.get("/search", params={"title": "BM2 Book"}).json()
    book_id = books[0]['book_id']
    client.post("/bookmark", headers={"token": token}, json={"book_id": book_id, "page": 9})
    res = client.get("/bookmark", headers={"token": token}, params={"book_id": book_id})
    assert res.status_code == 200
    assert res.json()["page"] == 9

def test_get_bookmark_not_found():
    token = create_token("userbm3", "user")
    res = client.get("/bookmark", headers={"token": token}, params={"book_id": 99999})
    assert res.status_code == 404
