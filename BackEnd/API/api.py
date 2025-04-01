from typing import List
from fastapi import FastAPI, HTTPException
import jwt
from pydantic import BaseModel
from BackEnd.Management.LibraryManager import ManagementLayer

KEY = "aaaaadafsdfe"

def get_role(token):
    decoded_payload = jwt.decode(token, KEY, algorithms=["HS256"])
    return decoded_payload.get("role")

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
    username: str
    book_id: int
    page: int

# FastAPI App
app = FastAPI()
library_manager = ManagementLayer()

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
def read(book_id: ReadBook):
    return library_manager.get_book_url(book_id)

@app.post("/add_book")
def add_book(book: AddBook):
    if get_role(book['token']) == 'admin':
        book.pop('token', None)
        library_manager.add_book(book)
        return {"message": "Book added successfully"}
    else:
        raise HTTPException(status_code=403, detail="Permission denied: Admin role required")

@app.delete("/delete_book")
def delete_book(book: DeleteBook):
    if get_role(book['token']) == 'admin':
        book.pop('token', None)
        library_manager.delete_book(book['book_id'])
        return {"message": "Book deleted successfully"}
    else:
        raise HTTPException(status_code=403, detail="Permission denied: Admin role required")

@app.get("/view_detail/{book_id}")
def view_detail(book_id: str):
    book = library_manager.view_detail(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@app.get("/search")
def search(q: str):
    books = library_manager.search_book(q)
    if len(books) == 0:
        return books
    else:
        raise HTTPException(status_code=404, detail="No books found")

@app.post("/bookmark")
def bookmark(mark: BookMark):
    library_manager.create_bookmark(mark)
    return {"message": "Book bookmarked successfully"}