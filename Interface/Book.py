from typing import Protocol

class BookInterface(Protocol):
    title: str
    author: str
    book_id: int
    genre: list
    pages: int
    timestamp: str

    def to_json(self) -> dict:
        ...