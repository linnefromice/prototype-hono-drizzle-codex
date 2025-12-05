import { Hono } from 'hono'
import healthRouter from './routes/health.js'
import itemsRouter from './routes/items.js'

const app = new Hono()

app.route('/health', healthRouter)
app.route('/items', itemsRouter)

export default app
