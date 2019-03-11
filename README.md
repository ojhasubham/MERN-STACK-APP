# MERN-STACK-APP

#### Clone the repo

```sh
$ https://github.com/ojhasubham/MERN-STACK-APP.git
$ cd MERN-STACK-APP/
```
## Setup for server-side(node and express)

#### 1. Install dependency

```sh
$ npm install
```

#### 2. Run and watch the app

```sh
$ npm run server
```
You can access API from: 
```sh
http://localhost:9000/
```
API List

```sh
POST http://localhost:9000/auth/signup 
Request body
{ firstName:'abc', lastName:'mnp', email:'example@exam.com',password:'xxxxx' }

POST http://localhost:9000/auth/login 
Request body
{ email:'example@exam.com', password:'xxxxx' }

```

```sh
GET http://localhost:9000/api/books
GET http://localhost:9000/api/books/${id}
DELETE http://localhost:9000/api/books/${id}
POST http://localhost:9000/api/books/ 
Request body
{ title:'abc', author:'mnp' }
```

## Setup for client-side(react)

#### 1. Install dependency

```sh
$ cd client/
$ npm install
```

#### 2. Run app

```sh
$ npm start
```

You can access your app form 

```sh
http://localhost:8080
```

#### 2. Build app that is use in server side

```sh
$ npm run build
```

You can access your build app form 

```sh
http://localhost:9000
```

#### 3. After Building the app that show in step 2, now you can deploy this project on server that support node (Heroku, aws server)

