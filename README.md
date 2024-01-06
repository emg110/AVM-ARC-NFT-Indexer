# AVM-ARC-NFT-Indexer
This module is an indexer module and API (OA3) that supports indexing of scanned NFT object payloads from scanner module and also serves requests from presenter module (public access API)

## This is the indexer module for ARC NFT indexing architecture & POC!

## ARC74 based ARC72 NFT Indexer API System

```mermaid
graph TD
    AlgodAPI[Algod API]
    Scanner --> AlgodAPI[Algod API]
    Scanner --> Indexing[Indexing Serverless API]
    Presenter --> Indexing[Indexing Serverless API]
    User --> Presenter[Presenter API]

    style AlgodAPI fill:#f9f,stroke:#000,stroke-width:2px
    style Scanner fill:#bbf,stroke:#000,stroke-width:2px
    style Indexing fill:#f9d,stroke:#000,stroke-width:2px
    style Presenter fill:#bfb,stroke:#000,stroke-width:2px
    style User fill:#fdb,stroke:#000,stroke-width:2px
  ```
  
## General Flow 
This diagram represents the flow of data and interactions in the ARC74-based ARC72 NFT indexer API system.

  ```mermaid
flowchart LR
    AlgodAPI[Algod API]
    Scanner[Scanner NodeJS Module]
    Indexing[Indexing Serverless API]
    Presenter[Presenter API]
    User[User]
    CloudflareD1[Cloudflare D1 SQL Instance]

    Scanner -->|Scans rounds & events| AlgodAPI
    Scanner -->|Calls POST methods with batch payload| Indexing
    Indexing -->|Writes data to| CloudflareD1
    CloudflareD1 -->|Reads data from| Indexing
    Presenter -->|Calls GET methods| Indexing
    User -->|Calls ARC74 GET methods| Presenter

    style AlgodAPI fill:#f9f,stroke:#000,stroke-width:2px
    style Scanner fill:#bbf,stroke:#000,stroke-width:2px
    style Indexing fill:#fbf,stroke:#000,stroke-width:2px
    style Presenter fill:#bfb,stroke:#000,stroke-width:2px
    style User fill:#fbb,stroke:#000,stroke-width:2px
    style CloudflareD1 fill:#ff9,stroke:#000,stroke-width:2px
  ```
