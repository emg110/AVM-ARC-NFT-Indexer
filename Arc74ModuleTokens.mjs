import { ApiException, OpenAPIRoute, Query, ValidationError, Str } from "@cloudflare/itty-router-openapi";
import * as algosdk from "algosdk";

export class Arc74ModuleTokens extends OpenAPIRoute {
    static schema = {
        tags: ['Arc74Tokens'],
        summary: `This module provides an ARC74 REST API.`,
        parameters: {
            next: Query(String, {
                description: 'The next page token (Results Pagination if applicable)',
                default: 0,
                required: false
            }),
            limit: Query(Number, {
                description: 'Limit number of returned results',
                default: 100,
                required: false
            }),
            contractId: Query(Number, {
                description: 'Limit number of returned results',
                default: 0,
                required: false
            }),
            tokenId: Query(Number, {
                description: 'Limit number of returned results',
                default: 0,
                required: false
            }),
            owner: Query(String, {
                description: 'Limit number of returned results',
                default: '',
                required: false
            }),
            "mint-min-round": Query(String, {
                description: 'Limit number of returned results',
                default: 0,
                required: false
            }),
            "mint-max-round": Query(String, {
                description: 'Limit number of returned results',
                default: 0,
                required: false
            }),
        },
        responses: {
            '200': {
                schema: {
                    applications: [{
                        "id": 0,
                        "params": {
                            "approval-program": "JAixio1dqvWjxTmx88psDRbE/1zMO/YYAW/11pfGMN+62wC6Ql/SJ8jM6sJ2RxNxkkx4EZS03R5Xio+HbKfnXfQgIKUgJBzwyo7TgxZXfV++vHLWHU6AKb==",
                            "clear-state-program": "FUGjc+iKzXl90K0f9PprJZF6CN0121Poh/J8tfJM2thzZQNNLXjPzsL8ryhNI308uDCiSIqOfAuv8gUJbJLrLi1lDa95Xb71yjF/RM1pZ2gYCkr835+FgkZTzznKd4Pw3a9H4qH+PD9wTe+Ibp8aI+pdzWtTRwBCCmCOL5TyedKifq6y+0TUg6LJvQ5EDYScc3rzRWVMNrBDAXgApiyjpoAuj8OEYWVgdyYCKP++bIzZhkrflYr6KiS2Ac4jxNgqsRgBPXEhlnpMUm4lGwGhL6V2WUoCu12u",
                            "creator": "string",
                            "extra-program-pages": 0,
                            "global-state": [
                                {
                                    "key": "string",
                                    "value": {
                                        "bytes": "string",
                                        "type": 0,
                                        "uint": 0
                                    }
                                }
                            ],
                            "global-state-schema": {
                                "num-byte-slice": 0,
                                "num-uint": 0
                            },
                            "local-state-schema": {
                                "num-byte-slice": 0,
                                "num-uint": 0
                            }
                        },
                        "log-data": [
                            {
                                "logs": [
                                    "FR98dQAAAABHzmba"
                                ],
                                "txid": "7DU4Q3L5DWIAQS46W7RMWQO4FF4FITOKOCO65VWCPOU3CNV3KTFA"
                            },
                            {
                                "logs": [
                                    "FR98dQAAAABHznlB"
                                ],
                                "txid": "DNRVAUU2IK5VN3YTPZK4GXSHIU4HHCYTA5RJCBXOC6QMSQOQAWHA"
                            },
                            {
                                "logs": [
                                    "FR98dXBsYXVzX2FjdGl2YXRl"
                                ],
                                "txid": "MEZ2M2DNJYDWRW6WMGVBH2B6OFIQNEEN6AGEXWXTSQFSXIBNBIDQ"
                            }
                        ],
                    }],
                    transactions: [{
                        "current-round": 0,
                        "transaction": {
                            "application-transaction": {
                                "accounts": [
                                    "string"
                                ],
                                "application-args": [
                                    "string"
                                ],
                                "application-id": 0,
                                "approval-program": "b7jFGh/xSRjRhDOFeEkqlXBjnha4Iwol+pYTunrr5WrHW6e3PDY10RyWv8HIsVdkNwgzZVigUBN3YNeg+5qf/NOjdZSKTdU/aYGXvof9t5QMk/j61Ukd5S1MvBqxApKCW5qg0fyv70Nx+s6AJg7cp6S0jbG+kYXG+Wz4cyz57xTmUOhsERB5sPSv6VybdJpHb9rs6tM8l5KKPoe7ZqaWo44DlV9y2Ndzf5kqLr/kvAps26/vW6/jBYYEdFsBjuAXfr7T4Z5tzk3dw3WCjT9K90/ntv2rl5omAbkLhAE=",
                                "clear-state-program": "U15XsnSFBdgFMvmwH/QSXrFpj9gcLUv7u544D5A4pHhpvOxEetA2wlhkugNS",
                                "extra-program-pages": 0,
                                "foreign-apps": [
                                    0
                                ],
                                "foreign-assets": [
                                    0
                                ],
                                "global-state-schema": {
                                    "num-byte-slice": 0,
                                    "num-uint": 0
                                },
                                "local-state-schema": {
                                    "num-byte-slice": 0,
                                    "num-uint": 0
                                },
                                "on-completion": "noop"
                            },
                            "auth-addr": "string",
                            "close-rewards": 0,
                            "closing-amount": 0,
                            "confirmed-round": 0,
                            "created-application-index": 0,
                            "created-asset-index": 0,
                            "fee": 0,
                            "first-valid": 0,
                            "genesis-hash": "ONZLjbYUhv7eTU8ypRJ5lJIKkU8ByhCSm4Yjo3Ils3RKIS5F1fU7tE7HM45mESxUW1exBhRrJIFjA/vdoCceTnN+NUMkb1LL83uYChWH7UYL0LqdvDyGcy7p9C8yqaeBzlfl5pRCWjN8DP9xx9qFXjnVTclKYYXzG4xTdabqguOsLUsxiJLEJF0lNtzotUeTwYHW1j2jDCXse5DCg9Uu25oZ",
                            "genesis-id": "string",
                            "global-state-delta": [
                                {
                                    "key": "string",
                                    "value": {
                                        "action": 0,
                                        "bytes": "string",
                                        "uint": 0
                                    }
                                }
                            ],
                            "group": "Y1YVNYuszdvYPFRyyQ8PdV9iu9zKSBgC/5zHK86T4j77bsj2CCoWpIn8eSv17hlmsIGI69fe8y2uw3FtoqUhRSsLNFhoFAXCMGNCnpOTjpuFlTlKuu1aj+aHiKeRPd9GCTOexUBb83nqFUCrCY8SIPN3oQ74wAVG8fnMX7uLmnv63O/9xw18xc6AuT3lSkyzoRWq5pJHTeZAN0eIQHBHEq4iPSvDbgfH83l5YHU4BZnheenGsFBvuhfkq6cS0RKt1wNajENKc/mJfFG9cqA1batHQQfRYcu=",
                            "id": "string",
                            "inner-txns": [
                                "string"
                            ],
                            "intra-round-offset": 0,

                            "last-valid": 0,
                            "lease": "S3mA",

                            "logs": [
                                "BC9CI5UiZyok9RShE+W1eMW4WGjE+ytCKPhS5gF2Ih4TtmQl7QJYp2aV6PRDL0UhQTzBJRo25tFS6Yuf2kpCzfrI+gvkqrhEki7Z9E1Rl/24emEKMl8Vn9iOPUcB1+Ss6q9cawbPf8LtNT7JtlImsPVpNxMVigMPXVUs2JDvlDO12A9o6M+85wv8Vh80J84AGqA18Gfd9VyLuG49vPRNQuX/kx24shkDRgBOj5ZT2/CCERwgjSchmnM9258UJj+bMv7tz5IWCu7dJjRqN+/09/vb2nhKleNjNhO6q5vwHVfOQgO43NKH3oDwYKOxTh6S0aAAuyig"
                            ],
                            "note": "00ZilCoh5th5NPVQqx0zZbkhl+MfKwlv5q+sdRdFUxtdK169ph2PGe02THdt9CgyqGQ0dWIg8qPW06jiGxglFwCGGbqPvPPtcCtQOP5owNRTPPuksFn5EQFIygJw/CTF9iQTd8CvecF8UHfmamGYR/kr8lLdBNl0c/hED+ktG5IO05H//bATff0uwRqWuSHXjaLiuYXg9nvkDTQKhoa/WL3Ap2M4u5rbIQflkt0r74VWl4zl3pwDJLy0JaWG8XMoB/AhUD4hDalGaM0hWmnb2dhxuSS79v1=",
                            "receiver-rewards": 0,
                            "rekey-to": "string",
                            "round-time": 0,
                            "sender": "string",
                            "sender-rewards": 0,
                            "tx-type": "pay"
                        }
                    }],
                    tokens: [{
                        owner: "",
                        contractId: "",
                        tokenId: "",
                        "mint-round": "",
                        metadataURI: "",
                        metadata: {}
                    }],
                    "current-round": 0,
                    "next-token": "",
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
        }else if (tokenId) {
            where += ` AND token = ? `
            binds.push(tokenId)
        }else if (owner) {
            where += ` AND owner = ? `
            binds.push(owner)
        }else if (mintMinRound) {
            where += ` AND round >= ? `
            binds.push(mintMinRound)
        }else if (mintMaxRound) {
            where += ` AND round <= ? `
            binds.push(mintMaxRound)
        }

        let statementInsert = ` SELECT * FROM arc72tokens ${where} ORDER BY round DESC ${limit? 'LIMIT ' + limit : 100} ${next? 'OFFSET ' + (next * limit) : ''}`;
        console.log('Statement: ', statementInsert)
        console.log('Binds: ', binds.join(','))
        const { results } = await env.ARC_NFT_DB.prepare(statementInsert).bind(binds.join(',')).run();

        let res = {
            results:  results,
        }
        console.log('Returning found ARC NFT token results: ', res)
        return res
    }
}
