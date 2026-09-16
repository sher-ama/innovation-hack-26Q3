from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .chat.router import router as chat_router
from .config import settings

app = FastAPI(title="Innovation Hack Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Backend is live"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
