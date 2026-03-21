import Database from '@tauri-apps/plugin-sql';

export default async function runTest() {
    try {
        async function initDB() {
            const db = await Database.load('sqlite:chat.db');
            await db.execute(`
            CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `);
            return db;
        }

        const db = await initDB();

        await db.execute(
            "INSERT INTO messages (role, content) VALUES ($1, $2)",
            ['user', 'testing db']
        );

        const rows = await db.select("SELECT * FROM messages");
        console.log(rows);

    } catch (err) {
        console.error("DB error:", err);
    }
}


