from datetime import datetime
from typing import Dict, Literal
from Interface.Person import PersonInterface
from Objects.Book import Book
from Objects.Read import Read
from Objects.Mark import Mark


class Person(PersonInterface):
    def __init__(self, name: str, email: str, person_id: int, password: str, role: Literal["user", "admin"]):
        self.name = name
        self.email = email
        self.person_id = person_id
        self.password = password
        self.role = role

    def to_json(self) -> Dict:
        return {
            "name": self.name,
            "email": self.email,
            "person_id": self.person_id,
            "role": self.role
        }

    def read_book(self, book: Book) -> Read:
        return Read(self.person_id, book.book_id, datetime.utcnow().isoformat(), 0, book.genre)

    def bookmark(self, book: Book, last_read_page: int) -> Mark:
        return Mark(self.person_id, book.book_id, last_read_page)