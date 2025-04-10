import pytest
from fastapi.testclient import TestClient

from BackEnd.API.api import app

client = TestClient(app)

# Shared variables
user = {
    "username": "testuser",
    "password": "testpass",
    "email": "test@example.com",
    "role": "user"
}

admin = {
    "username": "adminuser",
    "password": "adminpass",
    "email": "admin@example.com",
    "role": "admin"
}

tokens = {}

# ---------- Signup ----------
def test_signup_user():
    res = client.post("/signup", json=user)
    assert res.status_code in [200, 400]

def test_signup_admin():
    res = client.post("/signup", json=admin)
    assert res.status_code in [200, 400]


# ---------- Login ----------
def test_login_user_success():
    res = client.post("/login", json={
        "username": user["username"], "password": user["password"]
    })
    assert res.status_code == 200
    tokens["user"] = res.json()["access_token"]

def test_login_admin_success():
    res = client.post("/login", json={
        "username": admin["username"], "password": admin["password"]
    })
    assert res.status_code == 200
    tokens["admin"] = res.json()["access_token"]

def test_login_fail():
    res = client.post("/login", json={"username": "wrong", "password": "123"})
    assert res.status_code == 401


# ---------- Add Book ----------
def test_add_book_as_admin_success():
    res = client.post("/add_book", json={
        "title": "PyTest Book",
        "author": "Test Author",
        "url": "http://example.com/book",
        "genre": ["test"],
        "token": tokens["admin"]
    })
    assert res.status_code in [200, 400]  # 400 nếu book đã tồn tại

def test_add_book_duplicate():
    res = client.post("/add_book", json={
        "title": "PyTest Book",
        "author": "Dup",
        "url": "http://example.com/dup",
        "genre": ["dup"],
        "token": tokens["admin"]
    })
    assert res.status_code == 400

def test_add_book_as_user_fail():
    res = client.post("/add_book", json={
        "title": "Hack Book",
        "author": "Malicious",
        "url": "http://bad.com",
        "genre": ["hack"],
        "token": tokens["user"]
    })
    assert res.status_code == 403


# ---------- Search Book ----------
def test_search_book_success():
    res = client.get("/search?title=PyTest Book")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
    global book_id
    book_id = res.json()[0].get("id") or res.json()[0].get("book_id")

def test_search_book_not_found():
    res = client.get(f"/search?title=Unknown Book")
    assert res.status_code == 404

# ---------- View Detail (query param style) ----------
def test_view_detail_success():
    res = client.get(f"/view_detail?book_id=5")
    assert res.status_code == 200
    assert "title" in res.json()

def test_view_detail_not_found():
    res = client.get("/view_detail?book_id=9999")
    assert res.status_code == 404
    assert res.json()["detail"] == "Book not found"

# ---------- Read Book ----------
def test_read_book_success():
    res = client.get("/read?book_id=5")
    assert res.status_code == 200

# ---------- Bookmark ----------
def test_bookmark_as_user_success():
    res = client.post("/bookmark", json={
        "token": tokens["user"],
        "book_id": 5,
        "page": 10
    })
    assert res.status_code == 200

def test_bookmark_as_admin_fail():
    res = client.post("/bookmark", json={
        "token": tokens["admin"],
        "book_id": 5,
        "page": 20
    })
    assert res.status_code == 403

def test_bookmark_invalid_token():
    res = client.post("/bookmark", json={
        "token": "invalid.token.here",
        "book_id": 5,
        "page": 1
    })
    assert res.status_code == 401


# ---------- Delete Book ----------
def test_delete_book_as_user_fail():
    res = client.request("DELETE", "/delete_book", json={
        "token": tokens["user"],
        "book_id": 5
    })
    assert res.status_code == 403

def test_delete_book_success():
    res = client.request("DELETE", "/delete_book", json={
        "token": tokens["admin"],
        "book_id": 5
    })
    assert res.status_code == 200 or res.status_code == 404

def test_delete_book_not_found():
    res = client.request("DELETE", "/delete_book", json={
        "token": tokens["admin"],
        "book_id": 99999
    })
    assert res.status_code == 404


# ---------- Edge cases ----------
def test_add_book_missing_token():
    res = client.post("/add_book", json={
        "title": "NoToken",
        "author": "None",
        "url": "http://none.com",
        "genre": ["missing"]
    })
    assert res.status_code == 422  # Missing field

def test_bookmark_missing_page():
    res = client.post("/bookmark", json={
        "token": tokens["user"],
        "book_id": book_id
    })
    assert res.status_code == 422