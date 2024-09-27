from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId

class Person(BaseModel):
    full_name: str
    age: int
    skills: List[str]

class TaskCreate(BaseModel):
    name: str
    deadline: str
    persons: List[Person]
    is_completed: bool = False

class Task(TaskCreate):
    id: Optional[str] = Field(default=None, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

    @classmethod
    def from_mongo(cls, data: dict):
        if not data:
            return None
        id = data.pop('_id', None)
        return cls(_id=str(id), **data)

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    deadline: Optional[str] = None
    persons: Optional[List[Person]] = None
    is_completed: Optional[bool] = None