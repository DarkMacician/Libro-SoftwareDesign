from typing import List, Dict
from BackEnd.DAO.connection import MongoConnection


class MarkDAO:
    def __init__(self, collection_name="Mark"):
        self.db = MongoConnection().get_db()
        self.collection = self.db[collection_name]

    def post(self, data: Dict):
        self.collection.insert_one(data)

    def get(self, query: Dict):
        return self.collection.find_one(query)

    def get_all(self) -> List[Dict]:
        return list(self.collection.find())

    def update(self, query: Dict, data: Dict):
        self.collection.update_one(query, {"$set": data})

    def delete(self, query: Dict):
        self.collection.delete_one(query)