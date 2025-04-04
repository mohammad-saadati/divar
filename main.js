const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swager.config");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT || 3001;

  require("./src/config/mongoose.config");

  SwaggerConfig(app);

  app.listen(port, () => {
    console.log(`server: http://localhost:${port}`);
  });
}

main();

class Unicorn {
  constructor(name) {
    this.name = name;
  }

  message() {
    return `${this.name} is awesome!`;
  }
}
const newUnicornmessage = new Unicorn("Rainbow").message;
console.log('newUnicornmessage', newUnicornmessage());
