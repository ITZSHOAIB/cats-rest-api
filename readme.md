# Cat REST API

This API allows you to interact with cats. You can create, read, update, and delete cats.

## Setup instructions

- Clone the repository first
- Copy `default.env` file contents to `.env` file and run

```
npm run install
```

## Run the application

To run the application using docker, please run the below commands

```
docker compose build
docker compose up
```

To run the application without docker, please update the `MONGODB_URI` to localhost and run below command

```
npm run start:watch
```

## API Documentation

Once the application is up and running, you will be able to fetch the api documentation by visiting `http://localhost:3001/api-docs`

## Postman collection

The postman collection with all the appropriate endpoint and configuration is provided in the `./src/docs` folder

## Additional information

In order to access cats endpoints, you need to register and login to get the access token. Put the bearer token in the header `Authorization`.

Once the image is uploaded, copy the image file name and hit `http://localhost:3001/images/${yourFileName}` in order to access the uploaded cat image.
