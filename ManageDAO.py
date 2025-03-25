from typing import List, Dict
from DAO.DAO import PersonDAO, BookDAO, ReadDAO, MarkDAO
from Objects.Book import Book


class DAOManager:
    def __init__(self):
        self.person_dao = PersonDAO()
        self.book_dao = BookDAO()
        self.read_dao = ReadDAO()
        self.mark_dao = MarkDAO()

    def getUser(self, id: str) -> Dict:
        return self.person_dao.get({"person_id": int(id)})

    def createUser(self, data: Dict) -> None:
        self.person_dao.add(data)

    def findBook(self, id: str) -> Dict:
        return self.book_dao.get({"book_id": int(id)})

    def getrole(self, id: str) -> str:
        user = self.getUser(id)
        return user["role"] if user else None

    def createBook(self, data: Dict) -> None:
        self.book_dao.add(data)

    def updateBook(self, data: Dict) -> None:
        self.book_dao.update(Book(**data))

    def removeBook(self, id: str) -> None:
        self.book_dao.delete({"book_id": int(id)})

    def updateMark(self, data: Dict) -> None:
        self.mark_dao.update({"person_id": data["person_id"], "book_id": data["book_id"]}, data)

    def getMark(self, query: Dict) -> Dict:
        return self.mark_dao.get(query)

    def recommend(self, id: str) -> List:
        return []  # Implement recommendation logic

    def getlogs(self, id: str) -> List[Dict]:
        return self.read_dao.get_all()

    def close(self):
        self.person_dao.close()
        self.book_dao.close()
        self.read_dao.close()
        self.mark_dao.close()
