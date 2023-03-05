const fs = require('fs');
const rawData = fs.readFileSync('data.json');
const jsonData = JSON.parse(rawData);
