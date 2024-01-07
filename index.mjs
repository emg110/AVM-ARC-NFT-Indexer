import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { rootGetEndpointModule } from "./rootGetEndpointModule.mjs";
import { AvmArcNftIndexingModuleTokens } from "./AvmArcNftIndexingModuleTokens.mjs";
import { AvmArcNftIndexingModuleTransfers } from "./AvmArcNftIndexingModuleTransfers.mjs";
import { Arc74ModuleTokens } from "./Arc74ModuleTokens.mjs";
import { Arc74ModuleTransfers } from "./Arc74ModuleTransfers.mjs";

/**
 * Router for the AVM ARC NFT Indexing Module.
 *
 * @module router
 * @typedef {Object} Router
 * @property {Object} schema - The OpenAPI schema for the router.
 * @property {Object} schema.info - Information about the router.
 * @property {string} schema.info.title - The title of the router.
 * @property {string} schema.info.description - The description of the router.
 * @property {string} schema.info.version - The version of the router.
 * @property {string} docs_url - The URL for the router's documentation.
 */
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