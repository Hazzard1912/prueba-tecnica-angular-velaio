from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .models import Task
from .crud import create_task, update_task, get_tasks, delete_task, get_task, complete_task

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tasks/", response_model=Task)
async def create_task_endpoint(task: Task):
    return await create_task(task)

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task_endpoint(task_id: str, task: Task):
    return await update_task(task_id, task)

@app.patch("/tasks/{task_id}", response_model=Task)
async def update_task_endpoint(task_id: str):
    return await complete_task(task_id)

@app.get("/tasks/", response_model=List[Task])
async def get_tasks_endpoint(skip: int = 0, limit: int = 10):
    return await get_tasks(skip, limit)

@app.get("/tasks/{task_id}", response_model=Task)
async def get_task_endpoint(task_id: str):
    return await get_task(task_id)

@app.delete("/tasks/{task_id}")
async def delete_task_endpoint(task_id: str):
    deleted_count = await delete_task(task_id)
    if deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Task deleted"}