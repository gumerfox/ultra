import mysql from 'mysql2/promise';

// Настройки подключения к MariaDB
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ultra',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;