import swaggerJsdoc from 'swagger-jsdoc'
import fs from 'fs' // Módulo File System para salvar o arquivo
import path from 'path' // Módulo Path para manipular caminhos

// 1. Definição da variável 'options' (ESSENCIAL)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos (Swagger Automático)',
      version: '1.0.0',
      description: 'Documentação automática com SwaggerJSdoc + Express'
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }]
  },
  // O caminho onde o swagger-jsdoc irá buscar os comentários de documentação
  apis: ['./src/routes/*.js'] 
}

// 2. Criação da especificação usando a variável 'options'
const swaggerSpec = swaggerJsdoc(options)

// 3. Lógica para salvar o arquivo JSON (Para o Deploy no Netlify)
const docsPath = path.join(process.cwd(), 'docs')

// Cria a pasta 'docs' se ela não existir
if (!fs.existsSync(docsPath)) {
    fs.mkdirSync(docsPath)
}

// Salva a especificação JSON no caminho 'docs/swagger.json'
fs.writeFileSync(path.join(docsPath, 'swagger.json'), JSON.stringify(swaggerSpec, null, 2))

console.log(`Documentação gerada e salva em: ${path.join(docsPath, 'swagger.json')}`)

// Se este arquivo for usado apenas para geração estática, 
// o 'export default swaggerSpec' pode ser removido, mas não causa erro.
// export default swaggerSpec