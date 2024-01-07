import {OpenAPIRoute} from "@cloudflare/itty-router-openapi";
/**
 * Represents a module that provides a REST API for indexing NFTs on the AVM based blockchains.
 * @class
 * @extends OpenAPIRoute
 */
export class rootGetEndpointModule extends OpenAPIRoute {
  static schema = {
    tags: ['Arc74Indexing'],
    summary: `This module provides a REST API for indexing NFTs on the AVM based blockchains.`,
    responses: {
      '200': {
        schema: {
          message: "AVM ARC NFT Indexer API!🚀 Restricted zone ahead!",
          arc74: ""
        },
      },
      '400': {
        message: "Bad request!"
      },
    },
  }
  async handle() {
    console.log('Returning API info on root endpoint call!')
    return Response('AVM ARC NFT Indexer API!🚀 Restricted zone ahead!!', { status: 200 })
  }
}
