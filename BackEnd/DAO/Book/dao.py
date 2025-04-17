from typing import List, Dict
from pymongo import DESCENDING
from BackEnd.DAO.connection import MongoConnection

class BookDAO:
    def __init__(self, collection_name="Book"):
        db = MongoConnection.get_db_instance()
        self.collection = db[collection_name]

    def post(self, data: Dict):
        last_book = self.collection.find_one({}, sort=[("book_id", DESCENDING)])
        new_book_id = (last_book["book_id"] + 1) if last_book else 1
        data["book_id"] = new_book_id
        self.collection.insert_one(data)

    def get(self, query: Dict):
        return self.collection.find_one(query)

    def get_all(self) -> List[Dict]:
        return list(self.collection.find())

    def update(self, query: Dict, data: Dict):
        self.collection.update_one(query, {"$set": data})

    def delete(self, book_id: int):
        self.collection.delete_one({'book_id': book_id})

    def search(self, key):
        books = self.collection.find({"title": {"$regex": key, "$options": "i"}})
        return [{"_id": str(book["_id"]), "title": book["title"]} for book in books]

    def find(self, id):
        book = self.collection.find_one({"book_id": id})
        return book

    def close(self):
        self.client.close()