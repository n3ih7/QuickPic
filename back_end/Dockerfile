FROM ubuntu:18.04

RUN apt-get update -y && apt-get install -y python3 python3-pip

COPY ./backend /backend

WORKDIR /backend

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD [ "python3", "run.py" ]