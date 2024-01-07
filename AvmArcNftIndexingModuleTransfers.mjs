import { ApiException, OpenAPIRoute, Query, ValidationError, Str } from "@cloudflare/itty-router-openapi";
import * as algosdk from "algosdk";

/**
 * Represents a class for handling transfers in the AvmArcNftIndexingModule.
 * This module provides a REST API for indexing NFTs on the AVM based blockchains.
 */
export class AvmArcNftIndexingModuleTransfers extends OpenAPIRoute {
    static schema = {
        tags: ['Arc74IndexingTransfers'],
        summary: `This module provides a REST API for indexing NFTs on the AVM based blockchains.`,
        requestBody: {
            round: 0,
            from: "",
            to: "",
            contractId: 0,
            tokenId: 0,
        },
        responses: {
            '200': {
                schema: {
                    tokens: [{
                        round: 0,
                        contractId: 0,
                        tokenId: 0,
                        owner: "",
                    }]
                },
            },
            '400': {
                message: "Bad request!"
            },
            '401': {
                message: "Unauthorized Access!"
            },
            '502': {
                message: "Internal indexing module error!"
            }
        },
    }

    /**
     * Handles the incoming request for ARC NFT transfers.
     * 
     * @param {Request} request - The incoming request object.
     * @param {Object} env - The environment variables.
     * @param {Object} ctx - The context object.
     * @param {Object} data - The data object.
     * @returns {Object} - The response object containing the transfers.
     */
    async handle(request, env, ctx, data) {
        const authorizationHeader = request.headers.get('Authorization');
        if (authorizationHeader !== `Bearer ${env.INDEXER_AUTH_KEY}`) {
            console.error('Indexing module: Unauthorized access!')
            return new Response('Unauthorized Access!', { status: 401 })
        } else if (authorizationHeader === `Bearer ${env.INDEXER_AUTH_KEY}`) {
            console.info('Module Auth verified the request!')
        }
        const transfers = data.json()
        console.log('Received Transfers: ', transfers)

        let res = {
            transfers: transfers,
        }
        console.log('Returning found ARC NFT transfer results: ', res)
        return res
    }
}
