from typing import Dict, List

from Interface.Read import ReadInterface


class Read(ReadInterface):
    def __init__(self, person_id: int, book_id: int, start_time: str, end_time: int, genre: List[str]):
        self.person_id = person_id
        self.book_id = book_id
        self.start_time = start_time
        self.end_time = end_time
        self.genre = genre

    def to_json(self) -> Dict:
        return {
            "person_id": self.person_id,
            "book_id": self.book_id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "genre": self.genre
        }