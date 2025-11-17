// ==========================================================
// 🧠 server.js — Ponto de entrada principal da API
// ==========================================================

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './src/swagger/swagger.js'
import productRoutes from './src/routes/products.js'

const app = express()
app.use(express.json())

// ==========================================================
// 🧩 Rotas principais
// ==========================================================
app.use('/api/products', productRoutes)

// ==========================================================
// 📘 Documentação automática do Swagger
// ==========================================================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ==========================================================
// 🚀 Inicialização do servidor
// ==========================================================
const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  console.log(`📘 Documentação Swagger: http://localhost:${PORT}/api-docs`)
})
