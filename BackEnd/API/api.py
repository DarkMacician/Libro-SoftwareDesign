from typing import List
from fastapi import FastAPI, HTTPException, Query
import jwt
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from BackEnd.DAO.ManageDAO import DAOManager
from BackEnd.utilities.config import SECRET_KEY

def get_role(token):
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_payload.get("role")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_username(token):
    try:
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return decoded_payload.get("username")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

class SignUp(BaseModel):
    username: str
    password: str
    email: str
    role: str

class UserLogin(BaseModel):
    username: str
    password: str

class AddBook(BaseModel):
    title: str
    author: str
    url: str
    genre: List[str]
    token: str

class ReadBook(BaseModel):
    book_id: int

class DeleteBook(BaseModel):
    token: str
    book_id: int

class BookMark(BaseModel):
    token: str
    book_id: int
    page: int

class SearchBook(BaseModel):
    title: str

class ExtractBookmark(BaseModel):
    token: str
    book_id: int

# FastAPI App
app = FastAPI()
library_manager = DAOManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hoặc chỉ định cụ thể như ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/signup")
def sign_up(person: SignUp):
    person = {'username': person.username,
              'password': person.password,
              'email': person.email,
              'role': person.role}
    if library_manager.validate_person(person):
        raise HTTPException(status_code=400, detail="Username or Email already registered")
    else:
        library_manager.add_person(person)
        return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    user = {
        "username": user.username,
        "password": user.password
    }
    token = library_manager.authenticate_user(user)
    if token is not None:
        return {"access_token": token['token']}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")

@app.get("/read")
def read(book_id: int = Query(..., description="Book ID to view detail")):
    return library_manager.get_book(book_id)['url']

@app.post("/admin/add_book")
def add_book(book: AddBook):
    book = {
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'url': book.url,
        'token': book.token
    }
    if library_manager.search_book(book['title']):
        raise HTTPException(status_code=400, detail="Book already exists")
    if get_role(book['token']) == 'admin':
        book.pop('token', None)
        library_manager.add_book(book)
        return {"message": "Book added successfully"}
    else:
        raise HTTPException(status_code=403, detail="Permission denied: Admin role required")

@app.delete("/admin/delete_book")
def delete_book(book: DeleteBook):
    book = {
        'book_id': book.book_id,
        'token': book.token
    }

    if not library_manager.find_book(book['book_id']):
        raise HTTPException(status_code=404, detail="Book not found")

    if get_role(book['token']) == 'admin':
        book.pop('token', None)
        library_manager.delete_book(book['book_id'])
        return {"message": "Book deleted successfully"}
    else:
        raise HTTPException(status_code=403, detail="Permission denied: Admin role required")


@app.get("/view_detail")
def view_detail(book_id: int = Query(..., description="Book ID to view detail")):
    book = library_manager.get_book(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    book.pop('_id', None)
    return book

@app.get("/search")
def search(title: str = Query(..., description="Book title to search")):
    books = library_manager.search_book(title)
    if not books:
        raise HTTPException(status_code=404, detail="No books found")
    return books

@app.post("/bookmark")
def bookmark(mark: BookMark):
    mark = {
        "token": mark.token,
        "book_id": mark.book_id,
        "page": mark.page
    }
    if get_role(mark['token']) == 'user':
        mark['username'] = get_username(mark['token'])
        mark.pop('token', None)
        if library_manager.getMark({'username': mark['username'], 'book_id': mark['username']}):
            library_manager.updateMark(mark)
        else:
            library_manager.create_bookmark(mark)
        return {"message": "Book bookmarked successfully"}
    else:
        raise HTTPException(status_code=403, detail="Permission denied: User role required")

@app.get("/get_all_book")
def get_all_book():
    books = library_manager.get_all_books()
    for book in books:
        book.pop('_id', None)
    return books

@app.get("/bookmark")
def get_bookmark(info: ExtractBookmark):
    info = {
        "token": info.token,
        "book_id": info.book_id
    }
    if get_role(info['token']) != 'user':
        raise HTTPException(status_code=403, detail="Permission denied: User role required")

    info['username'] = get_username(info['token'])
    info.pop('token', None)
    result = library_manager.getMark(info)
    if not result:
        raise HTTPException(status_code=404, detail="No Bookmarks found")

    return {
            "status": "success",
            "page": result['page']
        }