export default {
swagger: "2.0",
info: {
  title: "API de canciones",
  version: "1.0.0"
},
basePath: "/api",
components:{
  securitySchemes:{
    bearerAuth:{
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  }
},
}