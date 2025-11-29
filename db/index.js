const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";

let mydb;

module.exports = {
  connectToDB: () => {
    MongoClient.connect(URI)
      .then((client) => {
        mydb = client.db('shopDB');
        // cb();
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getDB: () => mydb,
};
