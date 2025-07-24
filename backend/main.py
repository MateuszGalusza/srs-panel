from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, SQLModel, create_engine, Session, select
from typing import Optional, List
from datetime import datetime

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model danych
class Zgloszenie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tytul: str
    opis: str
    status: str = "Nowe"
    utworzone: datetime = Field(default_factory=datetime.utcnow)

# Baza danych
sqlite_file_name = "baza_zgloszen.db"
engine = create_engine(f"sqlite:///{sqlite_file_name}", echo=True)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# Endpointy
@app.post("/zgloszenia/", response_model=Zgloszenie)
def dodaj_zgloszenie(zgloszenie: Zgloszenie):
    with Session(engine) as session:
        session.add(zgloszenie)
        session.commit()
        session.refresh(zgloszenie)
        return zgloszenie

@app.get("/zgloszenia/", response_model=List[Zgloszenie])
def lista_zgloszen():
    with Session(engine) as session:
        return session.exec(select(Zgloszenie)).all()

@app.get("/zgloszenia/{zgloszenie_id}", response_model=Zgloszenie)
def szczegoly_zgloszenia(zgloszenie_id: int):
    with Session(engine) as session:
        z = session.get(Zgloszenie, zgloszenie_id)
        if not z:
            raise HTTPException(status_code=404, detail="Nie znaleziono zgłoszenia")
        return z

@app.put("/zgloszenia/{zgloszenie_id}/status")
def zmien_status(zgloszenie_id: int, nowy_status: str):
    with Session(engine) as session:
        z = session.get(Zgloszenie, zgloszenie_id)
        if not z:
            raise HTTPException(status_code=404, detail="Nie znaleziono zgłoszenia")
        z.status = nowy_status
        session.add(z)
        session.commit()
        return {"message": "Status zmieniony"}
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lub ogranicz do np. ["https://frontend-production-XXXX.up.railway.app"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
