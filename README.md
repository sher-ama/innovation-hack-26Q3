# Seating Intelligence Copilot

Scaffold monorepo for a Seating Intelligence Copilot with a React/Vite frontend and a Python/FastAPI backend.

## Planned layout

```text
frontend/   # React + Vite app (UI, chat, seat-map workflows)
backend/    # FastAPI service (orchestration, APIs, data access)
```

## Local development (planned)

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Integration seam (knowledge base)

The first integration seam will live in `backend/app/services/knowledge_base/` behind a service interface.
The frontend will call backend endpoints only; retrieval and ranking logic stays isolated in this backend module.
