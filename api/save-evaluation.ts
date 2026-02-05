import { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const evaluacion = req.body;

    if (!evaluacion || !evaluacion.id) {
        return res.status(400).json({ error: 'Faltan datos de la evaluación' });
    }

    const client = await pool.connect();

    try {
        // Asegurar que la tabla existe
        await client.query(`
      CREATE TABLE IF NOT EXISTS evaluaciones (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Insertar o actualizar
        await client.query(
            `INSERT INTO evaluaciones (id, data, updated_at) 
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (id) 
       DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP`,
            [evaluacion.id, JSON.stringify(evaluacion)]
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error en la base de datos:', error);
        return res.status(500).json({ error: 'Error al guardar en la base de datos' });
    } finally {
        client.release();
    }
}
