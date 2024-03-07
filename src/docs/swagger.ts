import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      title: "Cat REST API",
      description: "A simple API for managing cats",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
      },
    ],
  },
  apis: ["./src/routes/v1/*.ts"],
};
