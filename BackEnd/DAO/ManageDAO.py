from datetime import datetime, timedelta
from typing import List, Dict
import jwt
from BackEnd.DAO.Book.dao import BookDAO
from BackEnd.DAO.Book.object import Book
from BackEnd.DAO.Mark.dao import MarkDAO
from BackEnd.DAO.Person.dao import PersonDAO
from BackEnd.DAO.Read.dao import ReadDAO
from BackEnd.DAO.connection import MongoConnection
from BackEnd.utilities.config import SECRET_KEY

class DAOManager:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(DAOManager, cls).__new__(cls)
            cls._instance.__initialized = False
        return cls._instance

    def __init__(self):
        if self.__initialized:
            return
        self.__initialized = True

        self.person_dao = PersonDAO()
        self.book_dao = BookDAO()
        self.read_dao = ReadDAO()
        self.mark_dao = MarkDAO()

    def validate_person(self, query):
        return self.person_dao.check_by_username(query['username']) or self.person_dao.check_by_email(query['email'])

    def add_person(self, data):
        self.person_dao.add(data)

    def authenticate_user(self, data):
        user = self.person_dao.get(data)
        if user:
            token = jwt.encode({"username": user["username"],
                                "role": user['role'],
                                "exp": datetime.utcnow() + timedelta(hours=1)},
                               SECRET_KEY, algorithm="HS256")
            return {"token": token}
        return None

    def get_book(self, id: int) -> Dict:
        return self.book_dao.get({"book_id": int(id)})

    def add_book(self, data: Dict) -> None:
        self.book_dao.post(data)

    def delete_book(self, book_id: int):
        self.book_dao.delete(book_id)

    def updateBook(self, data: Dict) -> None:
        self.book_dao.update(Book(**data))

    def updateMark(self, data: Dict) -> None:
        self.mark_dao.update({"person_id": data["person_id"], "book_id": data["book_id"]}, data)

    def getMark(self, query: Dict) -> Dict:
        return self.mark_dao.get(query)

    def recommend(self, id: str) -> List:
        return []  # Implement recommendation logic

    def getlogs(self, id: str) -> List[Dict]:
        return self.read_dao.get_all()

    def search_book(self, key):
        return self.book_dao.search(key)

    def find_book(self, id):
        return self.book_dao.find(id)

    def create_bookmark(self, data):
        self.mark_dao.post(data)

    def get_all_books(self):
        return self.book_dao.get_all()

    def close(self):
        MongoConnection().close()