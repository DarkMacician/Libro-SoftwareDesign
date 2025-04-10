from datetime import datetime
from typing import List, Dict
from pymongo import MongoClient

from BackEnd.DAO.temp import completed_string
from BackEnd.utilities.config import MongoDB


class MarkDAO:
    def __init__(self, collection_name="Mark", db_url=completed_string, db_name=MongoDB.DATABASE_NAME):
        self.client = MongoClient(db_url)
        self.db = self.client[db_name]
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

    def close(self):
        self.client.close()