require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();

const PORT = process.env.PORT || 3000;
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Web3 Transaction Signer API");
});

app.post("/sign-transaction", async (req, res) => {
  try {
    const { to, amount } = req.body;
    const provider = new ethers.InfuraProvider("mainnet", INFURA_API_KEY);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = {
      to: to,
      value: ethers.parseEther(amount),
      gasLimit: 2100,
    };

    const signedTransaction = await wallet.signTransaction(transaction);
    res.json({ transaction: signedTransaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/send-transaction", async (req, res) => {
  try {
    const { to, amount } = req.body;
    const provider = new ethers.InfuraProvider("mainnet", INFURA_API_KEY);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const balance = await provider.getBalance(wallet.address);
    const gasLimit = BigInt(21000);
    const gasPrice = await provider.getFeeData();
    const gasCost = gasLimit * gasPrice.maxFeePerGas;
    const sendAmount = ethers.parseEther(amount);
    if (balance < sendAmount + gasCost) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const transaction = {
      to: to,
      value: sendAmount,
      gasLimit: gasLimit,
      maxFeePerGas: gasPrice.maxFeePerGas,
      maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas,
    };

    const txResponse = await wallet.sendTransaction(transaction);
    res.json({ txHash: txResponse.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
