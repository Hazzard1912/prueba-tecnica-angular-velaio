from .database import task_collection
from .models import Task, TaskCreate, TaskUpdate
from bson import ObjectId
from pymongo.errors import PyMongoError
from fastapi import HTTPException

async def create_task(task: TaskCreate):
    task_dict = task.model_dump()
    try:
        result = await task_collection.insert_one(task_dict)
        created_task = await task_collection.find_one({"_id": result.inserted_id})
        if created_task:
            return Task.from_mongo(created_task)
        raise HTTPException(status_code=404, detail="Task not found after creation")
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))

async def update_task(task_id: str, task: TaskUpdate):
    try:
        task_dict = task.model_dump(exclude_unset=True)
        result = await task_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": task_dict}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        updated_task = await task_collection.find_one({"_id": ObjectId(task_id)})
        if updated_task:
            return Task.from_mongo(updated_task)
        raise HTTPException(status_code=404, detail="Task not found after update")
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_tasks(skip: int = 0, limit: int = 10):
    try:
        tasks = await task_collection.find().skip(skip).limit(limit).to_list(length=limit)
        return [Task.from_mongo(task) for task in tasks]
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def get_task(task_id: str):
    try:
        task = await task_collection.find_one({"_id": ObjectId(task_id)})
        if task:
            return Task.from_mongo(task)
        raise HTTPException(status_code=404, detail="Task not found")
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
async def complete_task(task_id: str):
    try:
        result = await task_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"is_completed": True}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        updated_task = await task_collection.find_one({"_id": ObjectId(task_id)})
        if updated_task:
            return Task.from_mongo(updated_task)
        raise HTTPException(status_code=404, detail="Task not found after update")
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))

async def delete_task(task_id: str):
    try:
        result = await task_collection.delete_one({"_id": ObjectId(task_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"detail": "Task successfully deleted"}
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_task(task_id: str):
    try:
        task = await task_collection.find_one({"_id": ObjectId(task_id)})
        if task:
            return Task.from_mongo(task)
        raise HTTPException(status_code=404, detail="Task not found")
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))