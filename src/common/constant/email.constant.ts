import "dotenv/config";

export const RABBITMQ_URL = process.env.RABBITMQ_URL;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const OLLAMA_URL = process.env.OLLAMA_URL;

console.log({
    RABBITMQ_URL: RABBITMQ_URL,
    SMTP_USER: SMTP_USER,
    SMTP_PASS: SMTP_PASS,
    OLLAMA_URL: OLLAMA_URL
})