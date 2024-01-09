import { ApiException, OpenAPIRoute, Query, ValidationError, Str } from "@cloudflare/itty-router-openapi";
import * as algosdk from "algosdk";

export class Arc74ModuleTransfers extends OpenAPIRoute {
    static schema = {
        tags: ['Arc74Transfers'],
        summary: `This module provides an ARC74 REST API.`,
        parameters: {
            next: Query(String, {
                description: 'The next page transfers (Results Pagination if applicable)',
                default: 0,
                required: false
            }),
            limit: Query(Number, {
                description: 'Limit number of returned results',
                default: 100,
                required: false
            }),
            contractId: Query(Number, {
                description: 'ARC72 contract ID',
                default: 0,
                required: false
            }),
            tokenId: Query(Number, {
                description: 'ARC72 token ID',
                default: 0,
                required: false
            }),
            owner: Query(String, {
                description: 'ARC72 owner address',
                default: '',
                required: false
            }),
            "mint-min-round": Query(String, {
                description: 'ARC72 mint min round',
                default: 0,
                required: false
            }),
            "mint-max-round": Query(String, {
                description: 'ARC72 mint max round',
                default: 0,
                required: false
            }),
        },
        responses: {
            '200': {
                schema: {
                    transfers: [{
                        owner: "",
                        contract: 0,
                        token: 0,
                        round: 0,
                        id: 0,

                    }],
                    "next": 0,
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
     * Handles the incoming request for ARC NFT token indexing.
     * 
     * @param {Request} request - The incoming request object.
     * @param {Object} env - The environment variables.
     * @param {Object} ctx - The context object.
     * @param {Object} data - The data object containing the query.
     * @returns {Object} - The response object containing the found ARC NFT tokens.
     */
    async handle(request, env, ctx, data) {
        // const authorizationHeader = request.headers.get('Authorization');
        // if (authorizationHeader !== `Bearer ${env.INDEXER_AUTH_KEY}`) {
        //     console.error('Indexing module: Unauthorized access!')
        //     return new Response('Unauthorized Access!', { status: 401 })
        // } else if (authorizationHeader === `Bearer ${env.INDEXER_AUTH_KEY}`) {
        //     console.info('Module Auth verified the request!')
        // }

        const next = data.query.next
        console.log('Next: ', next)
        const limit = data.query.limit || 100
        console.log('Limit: ', limit)
        const contractId = data.query.contractId
        console.log('Contract ID: ', contractId)
        const tokenId = data.query.tokenId
        console.log('Token ID: ', tokenId)
        const owner = data.query.owner
        console.log('Owner: ', owner)
        const mintMinRound = data.query['mint-min-round']
        console.log('mintMinRound: ', mintMinRound)
        const mintMaxRound = data.query['mint-max-round']
        console.log('mintMaxRound: ', mintMaxRound)
        console.log('Received Query: ', data.query)
        let where = 'WHERE id >= 0 '
        let binds = []
        if (contractId) {
            where += ` AND contract = ? `
            binds.push(contractId)
        } else if (tokenId) {
            where += ` AND token = ? `
            binds.push(tokenId)
        } else if (owner) {
            where += ` AND owner = ? `
            binds.push(owner)
        } else if (mintMinRound) {
            where += ` AND round >= ? `
            binds.push(mintMinRound)
        } else if (mintMaxRound) {
            where += ` AND round <= ? `
            binds.push(mintMaxRound)
        }

        let statementInsert = ` SELECT * FROM arc72tokens ${where} ORDER BY round DESC ${limit ? 'LIMIT ' + limit : 100} ${next ? 'OFFSET ' + (next * limit) : ''}`;
        console.log('Statement: ', statementInsert)
        console.log('Binds: ', binds.join(','))
        const { results } = binds && binds.length > 0 ? await env.ARC_NFT_DB.prepare(statementInsert).bind(binds.join(',')).run(): await env.ARC_NFT_DB.prepare(statementInsert).run();

        let res = {
            results: results,
        }
        console.log('Returning found ARC NFT token results: ', res)
        return res
    }
}
