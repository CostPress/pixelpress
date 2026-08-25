const pool = require("./db");

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD type:", typeof process.env.DB_PASSWORD);
console.log("DB_PASSWORD loaded:", !!process.env.DB_PASSWORD);
console.log("DB_PORT:", process.env.DB_PORT);

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL connected successfully!");
    console.log("Database time:", result.rows[0].now);
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:");
    console.error(error.message);
  } finally {
    await pool.end();
  }
}

testConnection();