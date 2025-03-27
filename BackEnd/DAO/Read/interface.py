from typing import Protocol

class ReadInterface(Protocol):
    person_id: int
    book_id: int
    start_time: str
    end_time: int
    genre: list


    def to_json(self) -> dict:
        ...