FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 8000

WORKDIR /app/icard

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
