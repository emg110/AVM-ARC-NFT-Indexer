# AVM-ARC-NFT-Indexer
This module is an indexer module and API (OA3) that supports indexing of scanned NFT object payloads from scanner module and also serves requests from presenter module (public access API)

## This is the indexer module for ARC NFT indexing architecture & POC!

## ARC74 based ARC72 NFT Indexer API System

This diagram represents the flow of data and interactions in the ARC74-based ARC72 NFT indexer API system.

```mermaid
flowchart LR
    AlgodAPI[Algod API]
    Scanner[Scanner NodeJS Module]
    Indexer[Indexer Serverless API]
    Presenter[Presenter API]
    User[User]
    Cloudflare[Cloudflare D1 SQL Instance]

    AlgodAPI -->|Scans rounds & events| Scanner
    Scanner -->|Requests with ARC72 contracts batch| Indexer
    Indexer -->|Writes JSON objects to| Cloudflare
    Presenter -->|Calls endpoints| Indexer
    User -->|Interacts with| Presenter

    style AlgodAPI fill:#f9f,stroke:#333,stroke-width:2px
    style Scanner fill:#bbf,stroke:#333,stroke-width:2px
    style Indexer fill:#fbf,stroke:#333,stroke-width:2px
    style Presenter fill:#bfb,stroke:#333,stroke-width:2px
    style User fill:#fbb,stroke:#333,stroke-width:2px
    style Cloudflare fill:#ff9,stroke:#333,stroke-width:2px
