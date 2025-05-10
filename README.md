# MEXC Spot Account Balance Checker

A Node.js utility to check and monitor your MEXC spot account balances.

## Features

- Check total account balance
- Check specific coin balances
- Real-time balance monitoring
- Easy to use API integration

## Prerequisites

- Node.js (v14 or higher)
- MEXC API Key and Secret
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/shakilkhan1801/mexc-spot-account-balance-check.git
cd mexc-spot-account-balance-check
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your MEXC API credentials:
```
MEXC_API_KEY=your_api_key_here
MEXC_API_SECRET=your_api_secret_here
```

## Usage

### Check Total Balance
```javascript
node Get_Balance.js
```

### Check Specific Coin Balance
```javascript
node Check_specific.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

Please do not share your API keys or commit them to the repository. Always use environment variables for sensitive information.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.