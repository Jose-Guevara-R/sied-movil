import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { context, step } = req.body;

    if (!context) {
        return res.status(400).json({ error: 'Falta el contexto para la IA' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let systemPrompt = '';
        let userPrompt = '';

        if (step === 6) { // Generar Evidencias
            systemPrompt = `Eres un experto pedagogo del MINEDU. Basándote en la Situación Significativa y las Competencias proporcionadas, sugiere 3 evidencias de aprendizaje tangibles y retadoras. 
      Responde SOLO con un array JSON de strings.
      Ejemplo: ["Un prototipo de filtro de agua casero", "Un informe de indagación sobre la calidad del agua", "Un mural informativo sobre la contaminación"]`;

            userPrompt = `
        Área: ${context.meta_institucional.area}
        Ciclo: ${context.meta_institucional.ciclo}
        Competencias: ${context.diseno_curricular.competencias_seleccionadas.join(', ')}
        Situación Significativa: ${context.diseno_curricular.situacion_significativa}
      `;
        } else if (step === 7) { // Ficha Gamificada
            systemPrompt = `Eres un Diseñador de Juegos Pedagógicos (Gamification Expert). Transforma el diseño de evaluación en una misión épica para el estudiante.
      Responde SOLO en formato JSON con esta estructura:
      {
        "titulo_epico": "string",
        "historia_contexto": "string",
        "misiones": [{"titulo": "string", "consigna": "string", "tipo_respuesta": "texto|dibujo|cuadricula"}]
      }`;

            userPrompt = `
        Contexto: ${JSON.stringify(context.contexto)}
        Situación: ${context.diseno_curricular.situacion_significativa}
        Evidencias seleccionadas: ${context.diseno_instruccional.evidencias.join(', ')}
      `;
        } else if (step === 8) { // Generar Rúbrica
            systemPrompt = `Eres un experto en Evaluación Formativa del MINEDU. Basándote en las misiones gamificadas y el estándar curricular, genera una rúbrica de evaluación.
      Responde SOLO en formato JSON con esta estructura (un array de objetos):
      [
        {
          "criterio": "string",
          "nivel_inicio": "string",
          "nivel_proceso": "string",
          "nivel_logro": "string"
        }
      ]`;

            userPrompt = `
        Misiones: ${JSON.stringify(context.diseno_instruccional.ficha_gamificada.misiones)}
        Estándar CNEB: ${context.diseno_curricular.estandar}
      `;
        }

        const result = await model.generateContent([systemPrompt, userPrompt]);
        const response = await result.response;
        let text = response.text();

        // Limpiar respuesta de posibles backticks de markdown
        text = text.replace(/```json|```/gi, '').trim();

        return res.status(200).json(JSON.parse(text));
    } catch (error) {
        console.error('Error con Gemini IA:', error);
        return res.status(500).json({ error: 'Error al generar sugerencias con IA' });
    }
}
