const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
config();

// console.log("Connection String:", process.env.CONNECTIONSTRING);
const client = new MongoClient(process.env.CONNECTIONSTRING);

async function start() {
  try {
    console.log("ahhhhh ?");
    await client.connect();

    console.log("Connected");

    module.exports = client.db("LTCE-QR");
    const app = require("./app");
    app.listen(process.env.PORT);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
}

start();
