import express from "express"
import connectionShopify from "./shopify/shopify";
import shopifyDBControllers from "./db/controllers/shopifyDBControllers";
import dataRecording from "./db/dataRecording";
import connectDB from "./db/db";
import path from "path"
import fs from "fs/promises"

async function startServer() {
    
  await connectDB()
  const shopifyListProduct = await connectionShopify()
  dataRecording(shopifyListProduct)

  const server = express()
  const PORT = 3001;

  const clientPath = path.join(__dirname, '../client')
  const distPath = path.join(clientPath, 'dist')

  const { createServer: createViteServer } = require('vite')

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  })
  // use vite's connect instance as middleware
  server.use(vite.middlewares)

  server.use(express.static(path.resolve(distPath)))

  server.get("*", async (req, res) => {
    try {
      const url = req.originalUrl
      const productData = []

      const data = await shopifyDBControllers.getData()
      data.map(el => {
        productData.push(el.dataValues)
      })

      let template = await fs.readFile(path.join(distPath, "./index.html"), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule(path.join(clientPath, '/src/entry-server.tsx'))
      const appHtml = await render(url)

      const ssrData = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        productData
      )}</script>`

      const html = template.replace('<!--ssr-outlet-->', appHtml).replace('<!--ssr-data-->', ssrData)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    } catch (error) {
      console.error(error)
    }
  })

  server.listen(PORT, () => {
    console.log(`the server is running on ${PORT}`)
  })
}

startServer()