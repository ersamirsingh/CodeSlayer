import os
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()
# env_path = os.path.join(os.path.dirname(__file__), '.env')
# load_dotenv(dotenv_path=env_path)

print("Loaded MONGO_DB =", os.getenv("MONGO_DB"))
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
print("Mongo DB:",MONGO_DB)
print("Mongo URI : ", MONGO_URI)
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

users_coll = db["users"]
jobs_coll = db["jobs"]

def get_job(job_id: str):
    try:
        return jobs_coll.find_one({
            "_id": ObjectId(job_id)
        })
    except Exception:
        return None
    
def get_all_labourers():
    return list(users_coll.find({
        "role": "labourer",
        "isBlocked": False,
        "verified": True
    }))
