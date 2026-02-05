import { VercelRequest, VercelResponse } from '@vercel/node';
import pkg from 'pg';
const { Pool } = pkg;

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
        // Asegurar que la tabla existe con el esquema correcto
        await client.query(`
            CREATE TABLE IF NOT EXISTS evaluaciones (
                id UUID PRIMARY KEY,
                meta_institucional JSONB NOT NULL DEFAULT '{}',
                contexto JSONB NOT NULL DEFAULT '{}',
                diseno_curricular JSONB NOT NULL DEFAULT '{}',
                diseno_instruccional JSONB NOT NULL DEFAULT '{}',
                instrumento_evaluacion JSONB NOT NULL DEFAULT '[]',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insertar o actualizar usando el esquema estructurado
        await client.query(
            `INSERT INTO evaluaciones (
                id, 
                meta_institucional, 
                contexto, 
                diseno_curricular, 
                diseno_instruccional, 
                instrumento_evaluacion, 
                updated_at
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
            ON CONFLICT (id) 
            DO UPDATE SET 
                meta_institucional = $2,
                contexto = $3,
                diseno_curricular = $4,
                diseno_instruccional = $5,
                instrumento_evaluacion = $6,
                updated_at = CURRENT_TIMESTAMP`,
            [
                evaluacion.id,
                JSON.stringify(evaluacion.meta_institucional),
                JSON.stringify(evaluacion.contexto),
                JSON.stringify(evaluacion.diseno_curricular),
                JSON.stringify(evaluacion.diseno_instruccional),
                JSON.stringify(evaluacion.instrumento_evaluacion)
            ]
        );

        return res.status(200).json({ success: true });
    } catch (error: any) {
        console.error('Error en la base de datos:', error);
        return res.status(500).json({
            error: 'Error al guardar en la base de datos',
            details: error.message,
            stack: error.stack
        });
    } finally {
        if (client) client.release();
    }
}
