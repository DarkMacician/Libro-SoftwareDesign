from pymongo import MongoClient
from BackEnd.utilities.config import MongoDB
from BackEnd.DAO.temp import completed_string

class MongoConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MongoConnection, cls).__new__(cls)
            cls._instance.client = MongoClient(completed_string)
            cls._instance.db = cls._instance.client[MongoDB.DATABASE_NAME]
        return cls._instance

    def get_db_instance(self):
        return self._instance.db

    def close(self):
        if self._instance:
            self.client.close()
            MongoConnection._instance = None