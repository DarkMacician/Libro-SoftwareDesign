from pymongo import MongoClient
from BackEnd.utilities.config import MongoDB
from BackEnd.DAO.temp import completed_string

class MongoConnection:
    _instance = None
    _client = None
    _db = None

    def __init__(self):
        # Only initialize if instance hasn't been created
        if MongoConnection._instance is None:
            MongoConnection._client = MongoClient(completed_string)
            MongoConnection._db = MongoConnection._client[MongoDB.DATABASE_NAME]
            MongoConnection._instance = self

    @staticmethod
    def get_db_instance():
        if MongoConnection._db is None:
            MongoConnection()
        return MongoConnection._db

    @staticmethod
    def close():
        if MongoConnection._client:
            MongoConnection._client.close()
            MongoConnection._client = None
            MongoConnection._db = None
            MongoConnection._instance = None