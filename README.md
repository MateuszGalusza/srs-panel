# Aplikacja zgłoszeniowa (FastAPI + JS + Railway)

## 📌 Opis projektu

Aplikacja(z założenia Serwisowa) umożliwia użytkownikom (gościom) dodawanie zgłoszeń, a administratorowi przeglądanie ich i oznaczanie jako „Zrobione”. Dodatkowo administrator może zresetować bazę danych.

Projekt składa się z backendu opartego o **FastAPI**, frontendowej części w **HTML + CSS + JavaScript** oraz jest hostowany w chmurze przy użyciu **Railway**.

---

## ⚙️ Technologie

- **Backend:** FastAPI + SQLModel (SQLite)
- **Frontend:** HTML + CSS + JavaScript (Vanilla)
- **Baza danych:** SQLite (lokalna lub osadzona w kontenerze)
- **Konteneryzacja:** Docker + Docker Compose
- **Hosting:** Railway

---

## 🔧 Instrukcja uruchomienia lokalnie

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/twoj-login/projekt-zgloszenia.git
cd projekt-zgloszenia
```

### 2. Budowanie i uruchamianie kontenera

```bash
docker-compose up --build
```

Domyślnie aplikacja będzie dostępna na `http://localhost:8000`.

---

## 🌐 Wersja online

- Backend (Railway): https://backend-production-a5bd.up.railway.app/
- Frontend: (w zależności gdzie wrzucony - GitHub Pages / Netlify)

---

## 🔑 Dane dostępowe

- Hasło admina: `admin123`

---

## 📷 Zrzuty ekranu

(do uzupełnienia po dodaniu screenów)

---

## 📁 Struktura projektu

```
├── main.py               # backend FastAPI
├── requirements.txt
├── Dockerfile
├── docker-compose.yml

├── index.html            # frontend
├── index.js
├── style.css
└── README.md
```

---

## ✅ Funkcje

- Gość może:
  - dodać zgłoszenie
  - przeglądać wszystkie zgłoszenia

- Admin może:
  - przeglądać wszystkie zgłoszenie
  - dodać zgłoszenie 
  - oznaczać zgłoszenia jako „Zrobione”
  - zresetować bazę danych
  - wylogować się

---

## 📫 Autor

- Mateusz Gałusza: 
