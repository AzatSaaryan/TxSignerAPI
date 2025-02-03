# Web3 Transaction Signer API

This project is a simple API for signing and sending Ethereum transactions using Express.js and ethers.js.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (recommended version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/web3-transaction-signer-api.git
   cd web3-transaction-signer-api

   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   or

   ```bash
    yarn install
    ```


3. Create a ```.env``` file in the root of the project and add the following environment variables:
   ```Env
   INFURA_API_KEY=your_infura_api_key
   PRIVATE_KEY=your_private_key
   PORT=3000 # Optional, if you want to use a different port
   ```

## Usage

The server will be available at ```http://localhost:3000```

### API Endpoints

### GET ```/```

Returns a simple status message.

### POST ```/sign-transaction```

Signs a transaction.

Request body parameters:

```Json
{
"to": "0xRecipientAddress",
"amount": "AmountInETH"
}
```

### POST ```/send-transaction```

Sends a transaction.
Request body parameters:

```Json
{
"to": "0xRecipientAddress",
"amount": "AmountInETH"
}

```
