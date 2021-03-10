const monk = require('monk')

// Connection URL
const url = 'localhost:27017/db-rabbit-mongo';

const db = monk(url);

module.exports = db;

