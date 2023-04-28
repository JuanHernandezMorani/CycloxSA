const { Product, Group } = require("../db.js")
const dotenv = require('dotenv');
const  axios  = require('axios');
dotenv.config({ path: '../../.env'});

const getProduct = async () => {

}

module.exports = {
    getProduct,
  }