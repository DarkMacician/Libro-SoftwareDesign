from typing import Dict

from Interface.Mark import MarkInterface


class Mark(MarkInterface):
    def __init__(self, person_id: int, book_id: int, last_read_page: int):
        self.person_id = person_id
        self.book_id = book_id
        self.last_read_page = last_read_page

    def to_json(self) -> Dict:
        return {
            "person_id": self.person_id,
            "book_id": self.book_id,
            "last_read_page": self.last_read_page
        }

    def modify_last_read_page(self, last_read_page: int):
        if last_read_page >= 0:
            self.last_read_page = last_read_page