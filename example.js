// Example usage of mexc-spot-balance-checker
require('dotenv').config();

// Import the balance checker
const { getTotalBalance, getSpecificBalance } = require('./Get_Balance.js');

// Example: Get total balance
async function checkTotalBalance() {
    try {
        const balance = await getTotalBalance();
        console.log('Total Balance:', balance);
    } catch (error) {
        console.error('Error checking total balance:', error.message);
    }
}

// Example: Get specific coin balance
async function checkSpecificCoin() {
    try {
        const coinBalance = await getSpecificBalance('BTC');
        console.log('BTC Balance:', coinBalance);
    } catch (error) {
        console.error('Error checking BTC balance:', error.message);
    }
}

// Run examples
checkTotalBalance();
checkSpecificCoin(); 