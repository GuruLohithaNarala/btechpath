import sys
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from config import Config

db = None
mongo_client = None
is_mongo_connected = False

def init_db():
    global db, mongo_client, is_mongo_connected
    try:
        mongo_client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=2000)
        # Verify connection
        mongo_client.admin.command('ping')
        db = mongo_client.get_database()
        is_mongo_connected = True
        print(f"[DB] Connected to MongoDB database successfully: {db.name}")
    except (ConnectionFailure, ServerSelectionTimeoutError, Exception) as e:
        print(f"[DB Warning] Local MongoDB connection failed or offline ({e}). Operating in memory/mock fallback mode.")
        is_mongo_connected = False
        db = MockDB()

class MockCollection:
    def __init__(self, name):
        self.name = name
        self.docs = []

    def find(self, filter_dict=None, projection=None):
        if not filter_dict:
            return list(self.docs)
        result = []
        for d in self.docs:
            match = True
            for k, v in filter_dict.items():
                if d.get(k) != v:
                    match = False
                    break
            if match:
                result.append(d)
        return result

    def find_one(self, filter_dict=None):
        res = self.find(filter_dict)
        return res[0] if res else None

    def insert_one(self, doc):
        if '_id' not in doc:
            import uuid
            doc['_id'] = str(uuid.uuid4())
        self.docs.append(doc)
        class InsertResult:
            inserted_id = doc['_id']
        return InsertResult()

    def update_one(self, filter_dict, update_dict, upsert=False):
        doc = self.find_one(filter_dict)
        if doc:
            if '$set' in update_dict:
                doc.update(update_dict['$set'])
            if '$inc' in update_dict:
                for k, v in update_dict['$inc'].items():
                    doc[k] = doc.get(k, 0) + v
            if '$addToSet' in update_dict:
                for k, v in update_dict['$addToSet'].items():
                    if k not in doc:
                        doc[k] = []
                    if v not in doc[k]:
                        doc[k].append(v)
            class UpdateResult:
                matched_count = 1
                modified_count = 1
            return UpdateResult()
        elif upsert:
            new_doc = {**filter_dict}
            if '$set' in update_dict:
                new_doc.update(update_dict['$set'])
            self.insert_one(new_doc)
            class UpdateResult:
                matched_count = 0
                modified_count = 1
            return UpdateResult()
        class UpdateResult:
            matched_count = 0
            modified_count = 0
        return UpdateResult()

    def delete_one(self, filter_dict):
        doc = self.find_one(filter_dict)
        if doc:
            self.docs.remove(doc)
            class DeleteResult:
                deleted_count = 1
            return DeleteResult()
        class DeleteResult:
            deleted_count = 0
        return DeleteResult()

    def count_documents(self, filter_dict=None):
        return len(self.find(filter_dict))

class MockDB:
    def __init__(self):
        self.collections = {}

    def __getitem__(self, name):
        if name not in self.collections:
            self.collections[name] = MockCollection(name)
        return self.collections[name]

    def __getattr__(self, name):
        return self[name]

init_db()

def get_db():
    global db
    if db is None:
        init_db()
    return db
