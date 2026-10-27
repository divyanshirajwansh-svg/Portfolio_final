/**
 * VERCEL SERVERLESS FUNCTION - SKY AI CHATBOT
 * Endpoint: POST /api/chat
 * Reads server-side environment variables and securely proxies requests to AI provider
 */

const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  // CORS & Method Check
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { message, history } = req.body || {};

    // Input Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid request: "message" string is required.' });
    }

    const cleanMessage = message.trim();
    if (cleanMessage.length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }
    if (cleanMessage.length > 500) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 500 characters.' });
    }

    // Load Grounded Context
    let contextData = {};
    try {
      const contextPath = path.join(process.cwd(), 'data', 'portfolio-context.json');
      if (fs.existsSync(contextPath)) {
        contextData = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
      }
    } catch (e) {
      // Fallback if file read fails
    }

    // Server-side Secrets (never exposed to frontend)
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const genericKey = process.env.CHATBOT_API_KEY;

    // Grounded System Prompt
    const systemPrompt = `
You are Sky, a friendly, encouraging, and optimistic portfolio assistant for Divyanshi Rajwansh.
Personality:
- Warm, kind, curious, supportive, and positive with a gentle sunshine vibe ☀️.
- Use tasteful emojis (☀️, ✨) and gentle affirmations, but stay concise and technically helpful.
- Never invent facts, degrees, companies, awards, or project details about Divyanshi.
- If a requested detail is not found in the verified portfolio data below, politely acknowledge that you do not have that information and suggest contacting Divyanshi directly via email.

Verified Portfolio Data:
${JSON.stringify(contextData, null, 2)}
`;

    // 1. If Gemini API key is configured
    if (geminiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            ...(Array.isArray(history) ? history.map(h => ({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: h.content }]
            })) : []),
            {
              role: 'user',
              parts: [{ text: cleanMessage }]
            }
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 250
          }
        })
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return res.status(200).json({ reply: replyText });
        }
      }
    }

    // 2. If OpenAI API key is configured
    if (openAiKey || genericKey) {
      const keyToUse = openAiKey || genericKey;
      const openAiUrl = 'https://api.openai.com/v1/chat/completions';
      const openAiRes = await fetch(openAiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keyToUse}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...(Array.isArray(history) ? history.map(h => ({
              role: h.role === 'assistant' ? 'assistant' : 'user',
              content: h.content
            })) : []),
            { role: 'user', content: cleanMessage }
          ],
          temperature: 0.6,
          max_tokens: 250
        })
      });

      if (openAiRes.ok) {
        const openAiData = await openAiRes.json();
        const replyText = openAiData.choices?.[0]?.message?.content;
        if (replyText) {
          return res.status(200).json({ reply: replyText });
        }
      }
    }

    // 3. Fallback when keys are not configured on server
    // Inform the frontend so it falls back to the client-side grounded knowledge engine seamlessly
    return res.status(200).json({
      fallback: true,
      message: 'Serverless key not configured; client fallback active.'
    });

  } catch (error) {
    // Avoid logging or leaking sensitive stack traces
    return res.status(500).json({
      error: 'An internal error occurred while processing your request with Sky.',
      fallback: true
    });
  }
};
