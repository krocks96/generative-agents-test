FROM continuumio/anaconda3

# 仮想環境の構築
RUN conda create -n faiss-env && \
    echo "conda activate faiss-env" >> ~/.bashrc
SHELL ["/bin/bash", "--login", "-c"]

# 必要なパッケージをインストール
RUN conda install -c conda-forge faiss==1.7.2

RUN pip install \
    openai==0.27.6 \
    langchain==0.0.161 \
    fastapi==0.95.1 \
    uvicorn==0.22.0 \
    pydantic==1.10.7 \
    tiktoken==0.4.0 \
    lark==1.1.5

WORKDIR /app

# アプリケーションのコピー
COPY ./app /app

EXPOSE 5001

# FastAPIアプリケーションの起動
CMD ["/bin/bash", "-c", "source activate faiss-env && uvicorn main:app --host 0.0.0.0 --port 5001"]