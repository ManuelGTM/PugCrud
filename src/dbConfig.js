const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "users",
  user: "mt",
  password: "2206",
});

pool.connect((err) => {
  if (err) {
    console.log("Connection Failed", err.stack);
  } else {
    console.log("Connection Successfully!");
  }
});

module.exports = pool;
