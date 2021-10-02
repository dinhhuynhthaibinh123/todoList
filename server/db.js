const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "123456",
  hos: "localhost",
  port: 5432,
  database: "todo",
});

module.exports = pool;
