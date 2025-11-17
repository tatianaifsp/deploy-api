import { Router } from 'express'
const router = Router()

let products = [
  { id: 1, name: 'Notebook', price: 3500 },
  { id: 2, name: 'Mouse', price: 120 },
  { id: 3, name: 'Monitor', price: 980 }
]

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Rotas de produtos (sem banco de dados)
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get('/', (req, res) => res.json(products))

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))
  product ? res.json(product) : res.status(404).json({ message: 'Produto não encontrado' })
})

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' })
  products[index] = { ...products[index], ...req.body }
  res.json(products[index])
})

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto deletado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Produto não encontrado' })
  products.splice(index, 1)
  res.status(204).send()
})

export default router
