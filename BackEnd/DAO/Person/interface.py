from typing import Protocol, Literal

class PersonInterface(Protocol):
    name: str
    email: str
    person_id: int
    password: str
    role: Literal["user", "admin"]

    def to_json(self) -> dict:
        ...
