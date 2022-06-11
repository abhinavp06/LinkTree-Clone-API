# LinkTree-Clone-API
Just like in https://linktr.ee/ , a user can sign up and have multiple links displayed.

## Technology Used:
### MongoDB, Mongoose, Express, Node.js

## INSTRUCTIONS:
### To run this API:
####      1. First clone the repository
####      2. Install the node modules by the following command: ```npm install``` in the server directory.
####      3. Add a .env file in the server directory. An example .env file is present in this repository.
####      4. To run in development mode, type the following: ```npm run dev```
####      5. To send requests to the API, a Postman JSON file has been added in the repository. Load the JSON file in Postman and send requests.

## FEATURES:
#### 1. Authentication using **passport.js** (sign in, sign up, sign out).
#### 2. Relevant middlewares (for example: a user cannot edit some other user's links, bio).
#### 3. CRUD operations on links.

## TO BE ADDED:
#### 1. A premium user feature where a normal user can only have 5 links but a premium user can have 12.
#### 2. A profile picture for the user.
