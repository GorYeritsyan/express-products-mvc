const fs = require("fs").promises;
const path = require("path");

class MainService {
  async readDb(fileName) {
    return JSON.parse(
      await fs.readFile(
        path.join(__dirname, "..", "db", `${fileName}.json`),
        "utf-8"
      )
    );
  }

  async writeDb(fileName, data) {
    await fs.writeFile(
      path.join(__dirname, "..", "db", `${fileName}.json`),
      JSON.stringify(data, null, 2)
    );
  }
  
}

module.exports = MainService;
