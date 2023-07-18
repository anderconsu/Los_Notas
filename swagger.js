export default {
  swagger: "2.0",
  info: {
    title: "API LOS_NOTAS",
    version: "1.0.0",
  },
  basePath: "/api",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/client/login": {
      post: {
        summary: "Login to LOS_NOTAS api.",
        description: "Function that allows you to log in. As a response to the log you will receive a token.",
        parameters: [
          {
            name: "username",
            in: "formData",
            required: true,
            description: "Enter username.",
            type: "string"
          },
          {
            name: "password",
            in: "formData",
            required: true,
            description: "Enter the password.",
            type: "string"
          }
        ],
        responses: {
          "200": {
            "description": "Successful response."
          },
          "400": {
            "description": "Request Failed."
          },
          "401": {
            "description": "It's not authorized."
          },
        },
      },
    },
    "/note": {
      get: {
        summary: "Get all notes.",
        description: "Function to get all notes. Requires authentication.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            description: "Enter the JWT token: 'Bearer `token`'.",
            type: "string"
          }
        ],
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token",
        },
        responses: {
          "200": {
            "description": "Successful response."
          },
          "400": {
            "description": "Request Failed."
          },
          "401": {
            "description": "It's not authorized."
          },
        },
      },
    },
    "/note/id/{id}": {
      get: {
        summary: "Get a specific note.",
        description: "Function to get a specific note by its ID. requires authentication.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            description: "Enter the JWT token: 'Bearer `token`'.",
            type: "string"
          },
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the note.",
            type: "string",
          },
        ],
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token",
        },
        responses: {
          "200": {
            "description": "Successful response."
          },
          "400": {
            "description": "Request Failed."
          },
          "401": {
            "description": "It's not authorized."
          },
        },
      },
    },
    "/note/category": {
      get: {
        summary: "Get all categorys.",
        description: "Function to obtain all category. Requires authentication.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            description: "Enter the JWT token: 'Bearer `token`'.",
            type: "string"
          },
        ],
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token",
        },
        responses: {
          "200": {
            "description": "Successful response."
          },
          "400": {
            "description": "Request Failed."
          },
          "401": {
            "description": "It's not authorized."
          },
        },
      },
    },
    "/note/category/{id}": {
      get: {
        summary: "Get notes by category.",
        description: "Function to obtain notes by category. requires authentication.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "Authorization",
            in: "header",
            required: true,
            description: "Enter the JWT token: 'Bearer `token`'.",
            type: "string"
          },
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the category.",
            type: "string",
          },
        ],
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "JWT token",
        },
        responses: {
          "200": {
            "description": "Successful response."
          },
          "400": {
            "description": "Request Failed."
          },
          "401": {
            "description": "It's not authorized."
          },
        },
      },
    },
  },
}