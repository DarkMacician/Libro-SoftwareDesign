from typing import List, Dict
from pymongo import MongoClient, DESCENDING


class BookDAO:
    def __init__(self, collection_name="Book", db_url: str = "mongodb+srv://hoaiduy:introdatabase2024@cluster0.kvp0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", db_name: str = "Library"):
        self.client = MongoClient(db_url)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def post(self, data: Dict):
        last_book = self.collection.find_one({}, sort=[("book_id", DESCENDING)])
        new_book_id = (last_book["book_id"] + 1) if last_book else 1
        data["book_id"] = new_book_id
        self.collection.add(data)

    def get(self, query: Dict):
        return self.collection.find_one(query)

    def get_all(self) -> List[Dict]:
        return list(self.collection.find())

    def update(self, query: Dict, data: Dict):
        self.collection.update_one(query, {"$set": data})

    def delete(self, book_id: int):
        self.collection.delete_one({'book_id': book_id})

    def search(self, query):
        books = self.collection.find({"title": {"$regex": query, "$options": "i"}})
        return [{"_id": str(book["_id"]), "title": book["title"]} for book in books]

    def close(self):
        self.client.close()