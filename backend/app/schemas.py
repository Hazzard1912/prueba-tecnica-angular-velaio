from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import date

class PersonBase(BaseModel):
    full_name: str
    age: int
    skills: List[str]

    @validator('skills', pre=True)
    def split_skills(cls, v):
        if isinstance(v, str):
            return v.split(',')
        return v

class PersonCreate(PersonBase):
    pass

class Person(PersonBase):
    id: int

    class Config:
        orm_mode = True

    @classmethod
    def from_orm(cls, obj):
        # Convertir el string de skills a lista antes de crear el objeto Pydantic
        obj.skills = obj.skills.split(',') if obj.skills else []
        return super().from_orm(obj)

class TaskBase(BaseModel):
    name: str
    deadline: date
    is_completed: bool = False

class TaskCreate(TaskBase):
    persons: List[PersonCreate]

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    deadline: Optional[date] = None
    is_completed: Optional[bool] = None
    persons: Optional[List[PersonCreate]] = None

class Task(TaskBase):
    id: int
    persons: List[Person]

    class Config:
        orm_mode = True