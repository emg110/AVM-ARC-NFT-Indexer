import { ApiException, OpenAPIRoute, Query, ValidationError, Str } from "@cloudflare/itty-router-openapi";
import * as algosdk from "algosdk";
import moment from "moment-timezone";

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
            console.error('Bearer + ', authorizationHeader)
            return new Response('Unauthorized Access!', { status: 401 })
        } else if (authorizationHeader === `Bearer ${env.INDEXER_AUTH_KEY}`) {
            console.info('Module Auth verified the request!')
        }
        console.log(data)
        const token = data.body
        console.log('Received ARC72 Token: ', token)
        const now = moment();
        const tenSecondsAgo = now.subtract(10, 'seconds');
        //const statement = tokens.map(token => `insert into arc72-tokens (id, contract-id, owner, round, timestamp) values (${token.tokenId}, ${token.contractId}, ${token.owner}, ${token.round}, ${tenSecondsAgo})`).join(';')
        console.log('Received ARC72 Timestamp: ', tenSecondsAgo.unix())
        const statementTable = `
        CREATE TABLE IF NOT EXISTS arc72tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token INTEGER,
            contract INTEGER,
            owner TEXT,
            round INTEGER,
            timestamp INTEGER
        );
       `
        let statementIndexContract = ` CREATE INDEX IF NOT EXISTS idx_token_contract ON arc72tokens (contract);`;
        let statementIndexToken = ` CREATE INDEX IF NOT EXISTS idx_token_token ON arc72tokens (token);`;
        let statementIndexRound = ` CREATE INDEX IF NOT EXISTS idx_token_round ON arc72tokens (round);`;
        let statementIndexTimestamp = ` CREATE INDEX IF NOT EXISTS idx_token_timestamp ON arc72tokens (timestamp);`;
        let statementInsert = ` INSERT INTO arc72tokens (token,contract,owner,round,timestamp) VALUES (${token.tokenId},${token.contractId},"${token.owner}",${token.round},${tenSecondsAgo.unix()});`;
        console.log('Statement: ', statementInsert)
        const { results } = await env.ARC_NFT_DB.prepare([statementTable, statementIndexContract,statementIndexToken,statementIndexRound,statementIndexTimestamp, statementInsert]).all();

        let res = {
            results: results,
            token: token,
        }
        console.log('Returning found ARC NFT token results: ', res)
        return res
    }
}
