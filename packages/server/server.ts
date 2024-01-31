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
  const isDev = () => process.env.NODE_ENV === 'development'
  const isProduction = () => !isDev()

  const clientPath = path.join(__dirname, "../client")
  const distPath = path.join(clientPath, "dist")

  let vite: ViteDevServer
  const ssrManifest = isProduction()
    ? await fs.readFile(path.join(distPath, '.vite/ssr-manifest.json'), 'utf-8')
    : undefined 

  const server = express()
  const PORT = 3001
  
  if(isDev()) {
    const {createServer: createServerVite} = await import('vite')
      
    vite = await createServerVite({
      root: clientPath,
      base: '/',
      server: {
        middlewareMode: true
      },

      appType: 'custom'
    })

    server.use(vite.middlewares)
  }

  server.use(express.static(path.join(distPath, 'assets')))

  server.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      let template: string
      let render: (
        store: unknown,
        ssrManifest?: string
      ) => Promise<string>

      if(isProduction()) {
        template = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8')
        
        render = (await import(path.join(distPath, 'ssr/entry-server.cjs'))).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, './index.html'),
          'utf-8'
        )

        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule(
          path.join(clientPath, 'src/entry-server.tsx')
        )).render
      }

      const rendered = await render(ssrManifest)
      const html = template.replace('<!--ssr-outlet-->', rendered).replace('<!--ssr-data-->', 'hello')

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      console.error(error)
    }
  })

}

startServer()