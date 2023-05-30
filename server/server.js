import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from './router/route.js'


const app = express();

/**middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

/**http get */
app.get('/', (req, res) => {
   res.status(201).json("Home get request") 
})

/**api routes */
app.use('/api', router);

/**start server only when connected to mongodb */
connect().then(() => {
  try {
      app.listen(port, () => {
          console.log(`Server connected to http://localhost:${port}`);
      })
  } catch (error) {
      console.log('Cannot connect to the server')
  }
}).catch(error => {
  console.log("Invalid database connection...!");

})
