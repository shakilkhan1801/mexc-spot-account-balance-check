require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

// Load API credentials from .env
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

// Base URL for MEXC API
const BASE_URL = 'https://api.mexc.com';

// Logging function (optional, for enhanced logging)
function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('app.log', `[${timestamp}] ${message}\n`);
}

// Function to generate signature
function generateSignature(secretKey, params) {
    // Sort the parameters alphabetically by key
    const sortedKeys = Object.keys(params).sort();
    const sortedParams = sortedKeys.map(key => `${key}=${params[key]}`).join('&');

    // Generate HMAC SHA256 signature
    return crypto.createHmac('sha256', secretKey).update(sortedParams).digest('hex');
}

// Utility function for signed requests
async function signedRequest(method, endpoint, additionalParams = {}) {
    const timestamp = Date.now(); // Current timestamp in milliseconds

    // Base parameters
    const params = {
        api_key: ACCESS_KEY,
        timestamp: timestamp,
        ...additionalParams
    };

    // Generate signature
    const signature = generateSignature(SECRET_KEY, params);
    params.signature = signature;

    try {
        const response = await axios({
            method: method,
            url: `${BASE_URL}${endpoint}`,
            params: method === 'GET' ? params : {},
            data: method === 'POST' ? params : {},
            headers: {
                'Content-Type': 'application/json'
            }
        });

        log(`Successful ${method} request to ${endpoint}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            log(`Error Response from ${endpoint}: ${JSON.stringify(error.response.data)}`);
            throw new Error(JSON.stringify(error.response.data, null, 2));
        } else {
            log(`Error: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

// Function to get account balance
async function getAccountBalance() {
    try {
        const data = await signedRequest('GET', '/api/v3/account');
        console.log('Account Balance:', JSON.stringify(data, null, 2));
        log('Fetched account balance successfully.');
        return data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example Usage
(async () => {
    // Fetch Account Balance
    await getAccountBalance();
})();
