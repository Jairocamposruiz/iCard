FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app

RUN pip install

ENV PORT=3001

ENV CONNECTION_DB=mongodb+srv://socket_chat:AYjEl7kyodl0JjcJ@cluster0.v06wa.mongodb.net/appBlog

ENV SECRET_JWT=aTTC*cFK*WL8xUP3eivrzVtQK3XrskcEV*x@UQ7zabAgcopb*&*2chCYknRQf8fBzHumNofVKVQd6XJjWc*!n!PqkQQYwirXHao9

EXPOSE 3001

CMD ["npm", "start"]
