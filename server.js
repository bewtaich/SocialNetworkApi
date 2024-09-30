const express = require("express");
const connectionDB = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const startServer = async ()=>{
  try{
    await connectionDB();
    app.listen(PORT,()=>{
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database", err)
    process.exit(1);
  }
};
startServer();