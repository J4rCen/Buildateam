import express from "express"
import connectionShopify from "./shopify/shopify";
import shopifyDBControllers from "./db/controllers/shopifyDBControllers";
import dataRecording from "./db/dataRecording";
import connectDB from "./db/db";
import path from "path"
import fs from "fs/promises"
import { ViteDevServer } from "vite";
import * as process from 'process'

async function startServer() {
    
  await connectDB()
  const shopifyListProduct = await connectionShopify()
  dataRecording(shopifyListProduct)

  
  const server = express()
  const PORT = 3000;

  const clientPath = path.join(__dirname, '../client')
  const distPath = path.join(clientPath, 'dist')

  let vite: ViteDevServer;
  const base = process.env.BASE || '/'

  const { createServer } = await import('vite')

  vite = await createServer({
    server: {middlewareMode: true},
    appType: 'custom',
    base
  })

  server.use(vite.middlewares)

  server.use(express.static(path.resolve(distPath), { index: false }))

  server.use("*", async (req, res) => {
    try {
      const url = req.originalUrl
      const productData = []

      const data = await shopifyDBControllers.getData()
      data.map(el => {
        productData.push(el.dataValues)
      })

      let template = await fs.readFile(path.join(distPath, "./index.html"), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      let render = (await vite.ssrLoadModule(path.join(clientPath, './src/entry-server.tsx'))).render

      const rendered = await render(url, template)

      const ssrData = `<script>window.__PRELOADED_STATE__=${JSON.stringify(
        productData
      )}</script>`

      const html = template.replace('<!--ssr-outlet-->', rendered).replace('<!--ssr-data-->', ssrData)

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