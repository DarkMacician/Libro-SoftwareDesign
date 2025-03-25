from marshmallow import Schema, fields, ValidationError, validates
from marshmallow.validate import OneOf
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://hoaiduy:introdatabase2024@cluster0.kvp0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Library"]  # Replace with your database name
person_collection = db["Person"]  # Replace with your collection name
book_collection = db["Book"]

class UserSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Str(required=True)
    role = fields.Str(required=True, validate=OneOf(["user", "admin"]))
    password = fields.Str(required=True)

    @validates("name")
    def validate_name(self, value):
        if person_collection.find_one({"name": value}):
            raise ValidationError("Name must be unique.")

    @validates("email")
    def validate_email(self, value):
        if person_collection.find_one({"email": value}):
            raise ValidationError("Email must be unique.")

class BookSchema(Schema):
    title = fields.String(required=True)
    author = fields.String(required=True)
    genre = fields.List(fields.String(), required=True)

    @validates("title")
    def validate_title(self, value):
        if book_collection.find_one({"title": value}):
            raise ValidationError("Title must be unique.")

    @validates("genre")
    def validate_genre(self, value):
        if not value:
            raise ValidationError("Genre must not be an empty list.")