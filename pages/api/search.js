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

export default async function handler(req, res) {
  const { decor, thickness, width, length } = req.query;

  // Проверка наличия всех параметров
  if (!decor || !thickness || !width || !length) {
    return res.status(400).json({ error: 'Необходимо указать все параметры: decor, thickness, width, length.' });
  }

  try {
    // Формируем SQL-запрос с группировкой и датой постановки
    const query = `
      SELECT 
        decor, 
        thickness, 
        width, 
        length, 
        box_number, 
        MIN(placement_date) AS placement_date, -- Добавляем дату постановки
        COUNT(*) AS pack_count
      FROM packs
      WHERE decor = ? AND thickness = ? AND width = ? AND length = ?
      GROUP BY decor, thickness, width, length, box_number;
    `;
    const values = [decor, thickness, width, length];

    // Выполняем запрос к базе данных
    const [rows] = await pool.query(query, values);

    // Если данные не найдены
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Пачки с указанными параметрами не найдены.' });
    }

    // Возвращаем результаты в формате JSON
    res.status(200).json(rows);
  } catch (err) {
    // Логируем ошибку и возвращаем сообщение об ошибке
    console.error('Ошибка при выполнении запроса:', err);
    res.status(500).json({ error: 'Ошибка на сервере при выполнении запроса.' });
  }
}