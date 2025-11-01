const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Your calculator functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : 'Error: Division by zero';

app.use(express.json());

// API routes
app.get('/api', (req, res) => {
    res.json({ 
        message: 'Calculator API is running!',
        endpoints: {
            calculate: '/api/calculate?operation=add&a=5&b=3',
            status: '/api/status'
        }
    });
});

app.get('/api/calculate', (req, res) => {
    const { operation, a, b } = req.query;
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    let result;
    switch(operation) {
        case 'add': result = add(numA, numB); break;
        case 'subtract': result = subtract(numA, numB); break;
        case 'multiply': result = multiply(numA, numB); break;
        case 'divide': result = divide(numA, numB); break;
        default: result = 'Error: Invalid operation';
    }

    res.json({ operation, a: numA, b: numB, result });
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Only start server if not in test environment
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Calculator API server running on port ${PORT}`);
    });
}

module.exports = app;
