from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ルーターのインポート
from routes import router

app = FastAPI()

# CORS設定
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routerをアプリケーションに組み込む
app.include_router(router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5001)
