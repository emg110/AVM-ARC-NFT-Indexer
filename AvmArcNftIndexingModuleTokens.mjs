import { ApiException, OpenAPIRoute, Query, ValidationError, Str } from "@cloudflare/itty-router-openapi";
import * as algosdk from "algosdk";

/**
 * Represents a class for indexing NFTs on the AVM based blockchains.
 * @extends OpenAPIRoute
 */
export class AvmArcNftIndexingModuleTokens extends OpenAPIRoute {
    static schema = {
        tags: ['Arc74IndexingTokens'],
        summary: `This module provides a REST API for indexing NFTs on the AVM based blockchains.`,
        requestBody: {
            round: 0,
            contractId: 0,
            tokenId: 0,
            owner: "",
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
     * Handles the request for indexing ARC NFT tokens.
     * 
     * @param {Request} request - The incoming request object.
     * @param {Object} env - The environment variables.
     * @param {Object} ctx - The context object.
     * @param {Object} data - The data object.
     * @returns {Object} - The response object containing the found ARC NFT token results.
     */
    async handle(request, env, ctx, data) {
        const authorizationHeader = request.headers.get('Authorization');
        if (authorizationHeader !== `Bearer ${env.INDEXER_AUTH_KEY}`) {
            console.error('Indexing module: Unauthorized access!')
            return new Response('Unauthorized Access!', { status: 401 })
        } else if (authorizationHeader === `Bearer ${env.INDEXER_AUTH_KEY}`) {
            console.info('Module Auth verified the request!')
        }
        const tokens = data.json()
        console.log('Received Tokens: ', tokens)

        let res = {
            tokens: tokens,
        }
        console.log('Returning found ARC NFT token results: ', res)
        return res
    }
}
