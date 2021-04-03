const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth/",
      categorias: "/api/categorias/",
      usuarios: "/api/usuarios/",
    };

    //conectar a BD
    this.conectarDB();

    //middlewares
    this.middlewares();

    //routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
