//Import necessary packages
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
//const openApiDocsRouter = require("./routes/openApiDocs");
const swaggerOptions = require("./routes/openApiDocs.json");
const config = require('./config.js');

console.log(`NODE_ENV = ${config.NODE_ENV}`);

const app = express();
const swaggerApp = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
//const swaggerJsDoc = require("swagger-jsdoc");

//Import necessary Routes
const memeRoutes = require("./routes/meme");

//HOST and PORT
const port = config.PORT || 8081;
const swagger_port = config.SWAGGER_PORT || 8080;
const host = config.HOST;
//Swagger Specification
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XMEME API",
      version: "1.0.0",
      description: "Simple XMEME API"
    }
  },
  apis: ["./routes/*.js"]
};

//const specs = swaggerJsDoc(options); 

//DB Connection
console.log(config.DATABASE);
mongoose
  .connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log('DB Error');
  })

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
swaggerApp.use(cors());

//Routes
swaggerApp.use("/swagger-ui", swaggerUI.serve, swaggerUI.setup(swaggerOptions));
//swaggerApp.use("/",openApiDocsRouter);
app.use("/", memeRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

//Starting a server
app.listen(port,host,() => {
  console.log(`app is running at ${port}`);
});
swaggerApp.listen(swagger_port, () => {
  console.log(`swagger-ui is running at ${swagger_port}`);
});