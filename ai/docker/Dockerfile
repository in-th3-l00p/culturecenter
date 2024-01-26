FROM python:3.11-slim
WORKDIR /usr/local/src/ai

COPY . /usr/local/src/ai
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "app.py"]