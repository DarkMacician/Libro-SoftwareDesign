import os

from dotenv import load_dotenv, dotenv_values

from BackEnd.utilities.config import MongoDB
load_dotenv(dotenv_path="BackEnd/DAO\.env")

connection_string = MongoDB.CONNECTION_STRING

substring1 = os.getenv("SUBSTRING1")
substring2 = os.getenv("SUBSTRING2")

completed_string1 = connection_string.replace("substring1", str(substring1))
completed_string = completed_string1.replace("substring2", str(substring2))