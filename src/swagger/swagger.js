// ==========================================================
// 📄 Conteúdo de ./src/swagger/swagger.js
// ==========================================================

import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 

// --- Configuração de Caminhos (ES Modules) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------------------------------------
// 1. Definições da Configuração (O QUE ESTAVA FALTANDO!)
// O 'definition' é OBRIGATÓRIO pelo swagger-jsdoc.
// ----------------------------------------------------

const options = {
  definition: { // <--- ESTA CHAVE DEVE EXISTIR!
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos (Swagger Automático)',
      version: '1.0.0',
      description: 'Documentação automática com SwaggerJSdoc + Express'
    },
    servers: [{ 
        url: 'http://localhost:3000', 
        description: 'Servidor local' 
    }]
  },
  // O caminho onde o swagger-jsdoc irá buscar os comentários de documentação
  apis: [path.join(__dirname, '../routes/*.js')] 
};

// ----------------------------------------------------
// 2. Criação da Especificação
// ----------------------------------------------------
const swaggerSpec = swaggerJsdoc(options);

// ----------------------------------------------------
// 3. Geração Estática para o Netlify (BUILD STEP)
// ----------------------------------------------------

// Define o caminho para a pasta 'docs' na raiz do projeto
const docsPath = path.join(__dirname, '../../docs'); 

// Cria a pasta 'docs' se ela não existir
if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath);
}

// Salva a especificação JSON no caminho 'docs/swagger.json'
fs.writeFileSync(path.join(docsPath, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2));

console.log(`Documentação gerada e salva em: ${path.join(docsPath, 'swagger.json')}`);

// ----------------------------------------------------
// 4. Exportação (Para o server.js)
// ----------------------------------------------------

export default swaggerSpec;