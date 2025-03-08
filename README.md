This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



CREATE TABLE IF NOT EXISTS packs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    decor VARCHAR(255) NOT NULL,
    thickness INT NOT NULL,
    width INT NOT NULL,
    length INT NOT NULL,
    box_number VARCHAR(50) NOT NULL,
    placement_date DATE NOT NULL
);


INSERT INTO packs (decor, thickness, width, length, box_number, placement_date)
SELECT '0101 PR EX', 16, 1830, 2500, '185.11', CURDATE()
FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) AS a
CROSS JOIN (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7) AS b
LIMIT 67;

-- Добавляем 100 пачек в бокс 173.11
INSERT INTO packs (decor, thickness, width, length, box_number, placement_date)
SELECT '0101 PR EX', 16, 1830, 2500, '173.11', CURDATE()
FROM (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) AS a
CROSS JOIN (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) AS b
LIMIT 100;

Эуспорт данных базы mysql
SELECT * INTO OUTFILE 'файл.csv'
       FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
       LINES TERMINATED BY '\n'
       FROM имя_таблицы;
       
Создание резервной копии
mysqldump -u пользователь -p имя_базы > backup.sql  # Для MySQL
     pg_dump -U пользователь -d имя_базы > backup.sql    # Для PostgreSQL
     
Просмотр структуры таблицы(столбцы, типы данных)
DESCRIBE имя_таблицы;  -- Для MySQL
       \d+ имя_таблицы        -- Для PostgreSQL
       .schema имя_таблицы    -- Для SQLite
       
       
Выбор таблицы и просмотр ее содержимого
SELECT * FROM имя_таблицы LIMIT 10;  -- Просмотр первых 10 строк

Просмотр списка таблиц 
SHOW TABLES;  -- Для MySQL
       \dt           -- Для PostgreSQL
       .tables       -- Для SQLite