
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const messages = req.body.messages;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: "Eres AulaAI, un asistente educativo en español. Explica las materias paso a paso, ayuda con matemáticas, ciencias, historia y comunicación. Adapta tus explicaciones al nivel escolar del estudiante.",
      input: messages
    });

    return res.status(200).json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "No pude responder. Revisa la configuración."
    });
  }
}
