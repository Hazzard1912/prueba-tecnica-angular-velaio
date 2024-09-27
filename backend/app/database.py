from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb://mongo:27017"

client = AsyncIOMotorClient(MONGO_DETAILS)

database = client.todo_db

task_collection = database.get_collection("tasks")