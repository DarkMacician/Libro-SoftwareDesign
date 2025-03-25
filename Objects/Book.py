from typing import List, Dict
from datetime import datetime

from Interface.Book import BookInterface


class Book(BookInterface):
    def __init__(self, title: str, author: str, book_id: int, genre: List[str], pages: int, timestamp: str = None):
        self.title = title
        self.author = author
        self.book_id = book_id
        self.genre = genre
        self.pages = pages
        self.timestamp = timestamp or datetime.utcnow().isoformat()

    def to_json(self) -> Dict:
        return {
            "title": self.title,
            "author": self.author,
            "book_id": self.book_id,
            "genre": self.genre,
            "pages": self.pages,
            "timestamp": self.timestamp
        }

    def modify_info(self, title: str = None, author: str = None, genre: List[str] = None, pages: int = None):
        if title:
            self.title = title
        if author:
            self.author = author
        if genre:
            self.genre = genre
        if pages:
            self.pages = pages
        self.timestamp = datetime.utcnow().isoformat()