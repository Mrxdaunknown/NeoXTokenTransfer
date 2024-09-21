const { ethers } = require('ethers');

const PROVIDER_URL = 'https://neoxt4seed1.ngd.network/'; // Public node (RPC Endpoint) URL
const PRIVATE_KEY = ''; // Enter the private key of the sending address here
const TO_ADDRESS = ''; // Enter the receiver address here
const TOKEN_CONTRACT_ADDRESS = '0x1CE16390FD09040486221e912B87551E4e44Ab17';
const AMOUNT_IN_TOKENS = 0.1;
const DECIMALS = 18;
const WEI_AMOUNT = BigInt(AMOUNT_IN_TOKENS * Math.pow(10, DECIMALS));
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const contractABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, contractABI, wallet);

async function sendToken() {
    try {
        const tx = await tokenContract.transfer(TO_ADDRESS, WEI_AMOUNT.toString());
        console.log('Transaction sent:', tx.hash);

        // Wait for the transaction to confirm
        const receipt = await tx.wait();
        console.log('Transaction successful:', receipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

sendToken();