from typing import Protocol

class MarkInterface(Protocol):
    person_id: int
    book_id: int
    last_read_page: int

    def to_json(self) -> dict:
        ...