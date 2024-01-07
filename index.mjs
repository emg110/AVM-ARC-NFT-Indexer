import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { rootGetEndpointModule } from "./rootGetEndpointModule.mjs";
import { AvmArcNftIndexingModuleTokens } from "./AvmArcNftIndexingModuleTokens.mjs";
import { AvmArcNftIndexingModuleTransfers } from "./AvmArcNftIndexingModuleTransfers.mjs";
import { Arc74ModuleTokens } from "./Arc74ModuleTokens.mjs";
import { Arc74ModuleTransfers } from "./Arc74ModuleTransfers.mjs";


export const router = OpenAPIRouter({
  schema: {
    info: {
      title: 'AVM ARC NFT Indexing Module',
      description: 'This module provides a REST API for indexing NFTs on the AVM based blockchains.',
      version: 'v0.0.2',
    },
  },
  docs_url: '/',
});


router.get('/', rootGetEndpointModule);
router.get('/api/v1/tokens', Arc74ModuleTokens);
router.get('/api/v1/transfers', Arc74ModuleTransfers);
router.post('/api/v1/tokens', AvmArcNftIndexingModuleTokens);
router.post('/api/v1/transfers', AvmArcNftIndexingModuleTransfers);
router.all('*', () => new Response('Not Found.', { status: 404 }));
export default {
  fetch: router.handle
}