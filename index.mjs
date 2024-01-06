import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { AvmArcNftIndexingModule } from "./AvmArcNftIndexingModule.mjs";


export const router = OpenAPIRouter({
  schema: {
    info: {
      title: 'AVM ARC NFT Indexing Module',
      description: 'This module provides a REST API for indexing NFTs on the AVM based blockchains.',
      version: 'v0.0.2',
    },
  },
  docs_url: '/',
})

router.get('/', AvmArcNftIndexingModule);



// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

export default {
  fetch: router.handle
}