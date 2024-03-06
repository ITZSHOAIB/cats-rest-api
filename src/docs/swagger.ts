export const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
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
