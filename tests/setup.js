/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

module.exports = () => {
  const envConfig = dotenv.parse(
    fs.readFileSync(path.join(__dirname, '.env.mock'))
  );

  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
};
