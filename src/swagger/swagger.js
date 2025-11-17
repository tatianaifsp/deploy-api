import swaggerJsdoc from 'swagger-jsdoc'

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
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)
export default swaggerSpec
