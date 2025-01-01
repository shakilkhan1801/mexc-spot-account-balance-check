// get_Balance.js

require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

// Load API credentials from .env
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

// Base URL for MEXC API
const BASE_URL = 'https://api.mexc.com';

// Function to generate HMAC SHA256 signature
function generateSignature(secretKey, params) {
    const sortedKeys = Object.keys(params).sort();
    const sortedParams = sortedKeys.map(key => `${key}=${params[key]}`).join('&');
    return crypto.createHmac('sha256', secretKey).update(sortedParams).digest('hex');
}

// Function to fetch and filter specific account balances
async function getSpecificBalances(assets = ['USDT', 'ETH']) {
    const endpoint = '/api/v3/account';
    const timestamp = Date.now();

    // Prepare parameters
    const params = {
        api_key: ACCESS_KEY,
        timestamp: timestamp
    };

    // Generate signature
    params.signature = generateSignature(SECRET_KEY, params);

    try {
        // Make GET request to fetch account data
        const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
        const balances = response.data.balances;

        // Filter for specified assets
        const filtered = balances.filter(balance => assets.includes(balance.asset));

        // Display the filtered balances
        console.log(`\nBalances for [${assets.join(', ')}]:`);
        filtered.forEach(b => {
            console.log(`- ${b.asset}: Free = ${b.free}, Locked = ${b.locked}`);
        });

    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Execute the function
getSpecificBalances();
