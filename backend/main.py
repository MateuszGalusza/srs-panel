from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, SQLModel, create_engine, Session, select
from typing import Optional, List
from datetime import datetime
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model
class Zgloszenie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tytul: str
    opis: str
    status: str = "Nowe"
    utworzone: datetime = Field(default_factory=datetime.utcnow)

# DB
DB_FILE = os.path.join(os.path.dirname(__file__), "baza_zgloszen.db")
engine = create_engine(f"sqlite:///{DB_FILE}", echo=True)

@app.on_event("startup")
def init_db():
    SQLModel.metadata.create_all(engine)

@app.post("/zgloszenia/", response_model=Zgloszenie)
def dodaj(z: Zgloszenie):
    with Session(engine) as session:
        session.add(z)
        session.commit()
        session.refresh(z)
        return z

@app.get("/zgloszenia/", response_model=List[Zgloszenie])
def lista():
    with Session(engine) as session:
        return session.exec(select(Zgloszenie)).all()

@app.put("/zgloszenia/{zid}/status")
def zmien(zid: int, nowy_status: str):
    with Session(engine) as session:
        z = session.get(Zgloszenie, zid)
        if not z:
            raise HTTPException(404, detail="Nie znaleziono")
        z.status = nowy_status
        session.add(z)
        session.commit()
        return {"ok": True}

@app.post("/zresetuj-db")
def resetuj_baze():
    if os.path.exists(DB_FILE):
        os.remove(DB_FILE)
    SQLModel.metadata.create_all(engine)
    return {"message": "Baza zresetowana"}
print(" FastAPI backend wystartował i załadował wszystkie endpointy")
