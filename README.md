# Funny movies backend

---

This project is using [ExpressJS](https://expressjs.com/), [MongooseJS](https://mongoosejs.com/) and a few more utility libraries to develop the backend side for the **Funny movies** webapp

## Setting up

- Make sure you have [NodeJS](https://nodejs.org/en/download) installed on your machine.

- You can use `npm` or `yarn` to run the installation command: `npm i` or `yarn`. Since `npm` comes with the `NodeJS`, let's use it to run the scripts available within the source.

## Available scripts

- `npm run dev`: To start the server in develop mode
- `npm run start`: To start the server

## Available APIs

- `POST` `/api/auth/signin`: For signing in
- `POST` `/api/auth/signup`: For signing up
- `GET` `/api/movies`: For getting movies list
- `POST` `/api/movie`: For posting a movie
- `POST` `/api/movie/upvote`: For upvoting a movie
- `POST` `/api/movie/downvote`: For downvoting a movie

## Source structure

- [controllers](./app/controllers): Contains controllers handling authentication and movie actions
- [middlewares](./app/middlewares): Contains handlers verifying the incomming requests
- [models](./app/models): Contains data schemas
- [routes](./app/routes): Contains endpoints definitions
- [server.js](./server.js): Initial point
