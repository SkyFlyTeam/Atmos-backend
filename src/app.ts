import router from "./routes"
import sequelize from "./config/connection"; // Import the sequelize instance
import { registerSwagger } from "./interfaces/swagger/swagger";
import { NextFunction, Request, Response } from "express";
import AuthToken from "./utils/auth";


const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
// app.use(function(req: Request, res: Response, next: NextFunction) {

//   if (!['POST', 'PUT', 'DELETE'].includes(req.method) || req.url == '/usuario/login')
//     return next();

//   const authToken = AuthToken(req);
//   if (authToken.status != 200)
//     return res.status(401).json({ message: authToken.message, detalhes: authToken.detalhes });

//   next();
// });
app.use(router);
registerSwagger(app)

const PORT = process.env.PORT || 5000;

// Sync database and then start the server
sequelize.sync({ force: false })  // Altere para `true` se quiser recriar as tabelas durante o desenvolvimento
  .then(async () => {
    console.log('Database synchronized');

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });