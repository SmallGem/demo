FROM python:3.6-alpine

RUN apk add gcc python3-dev musl-dev postgresql-dev

RUN mkdir code
WORKDIR code

ENV FLASK_APP app.py

COPY requirements.txt ./
COPY server/ server/
COPY migrations/ migrations/
COPY app.py ./

ADD entrypoint.sh entrypoint.sh

RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
