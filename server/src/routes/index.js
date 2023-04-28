const { Router } = require('express');
const products = require('./products.js');
const groups = require('./groups.js');
const deleted = require('./deleted.js');

const api = Router();

api.use('/products', products);
api.use('/groups', groups);
api.use('/deleted', deleted);


module.exports = api;
