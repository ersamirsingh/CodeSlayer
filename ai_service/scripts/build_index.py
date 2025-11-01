from utils.db import get_all_laborers
from utils.vecstore import build_index_from_laborers

if __name__ == "__main__":
    laborers = get_all_laborers()
    if not laborers:
        print(" No laborers found in DB.")
        exit(0)

    docs = []
    for l in laborers:
        skills = " ".join(l.get("skills", []))
        bio = l.get("bio", "")
        docs.append({
            "id": str(l["_id"]),
            "content": f"{skills} {bio}",
            "meta": {
                "name": l.get("name"),
                "skills": l.get("skills", []),
                "rating": l.get("rating", 0),
            },
        })

    build_index_from_laborers(docs)
    print(f"✅ Built FAISS index for {len(docs)} laborers.")
