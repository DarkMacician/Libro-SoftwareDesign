from typing import Dict, Optional
from DAO.DAO import PersonDAO, BookDAO, ReadDAO, MarkDAO
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your_secret_key"


class ManagementLayer:
    def __init__(self):
        self.person_dao = PersonDAO()
        self.book_dao = BookDAO()
        self.read_dao = ReadDAO()
        self.mark_dao = MarkDAO()
        self.tokens = {}

    def authenticateUser(self, username: str, password: str) -> Optional[Dict]:
        user = self.person_dao.get({"name": username, "password": password})
        if user:
            token = jwt.encode({"user_id": user["person_id"], "exp": datetime.utcnow() + timedelta(hours=1)},
                               SECRET_KEY, algorithm="HS256")
            self.tokens[token] = user["person_id"]
            return {"token": token, "user": user}
        return None

    def createUser(self, userData: Dict) -> None:
        try:
            valid_user = UserSchema().load(userData)
            self.person_dao.add_person(valid_user)
        except ValidationError as e:
            print("Validation Error:", e.messages)

    def invalidateToken(self, token: str) -> bool:
        if token in self.tokens:
            del self.tokens[token]
            return True
        return False

    def verifyTokenAndGetUserId(self, token: str) -> Optional[str]:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            return str(payload["user_id"])
        except jwt.ExpiredSignatureError:
            return None

    def verifyAdminRole(self, userId: str) -> bool:
        user = self.person_dao.get({"person_id": int(userId)})
        return user and user.get("role") == "admin"

    def verifyTokenAndPermissionGetUserId(self, token: str, role: str) -> Optional[str]:
        user_id = self.verifyTokenAndGetUserId(token)
        if user_id and self.verifyAdminRole(user_id) if role == "admin" else True:
            return user_id
        return None

    def verifyTokenGetUserId(self, token: str) -> Optional[str]:
        return self.verifyTokenAndGetUserId(token)

    def getUserPreferences(self, userId: str) -> Optional[Dict]:
        return self.person_dao.get({"person_id": int(userId)})
