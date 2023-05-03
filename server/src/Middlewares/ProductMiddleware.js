const { Product, Group } = require("../db.js")
const dotenv = require('dotenv');
const  axios  = require('axios');
dotenv.config({ path: '../../.env'});

const getProduct = async () => {
  try {
    const list = [];

    for(let i = 1; i < 21; i++){
      let products1 = await axios.get(`https://fakestoreapi.com/products/${i}`);
      list.push(products1.data)
    }


    for(let i = 1; i < 101;i++){
      let products2 = await axios.get(`https://dummyjson.com/products/${i}`);
      list.push(products2.data)
    }
    
    list.map(async (p) => {
      let group = await Group.findOne({where:{name: p.category}});
      let product = await Product.create({
        where:{
          name: p.title,
          image: p.image,
          price: p.price,
          description: p.description
        }
      })
    await product.addGroup(group.id)
    })
  
 


  } catch (error) {
    console.log(error.message);
  }

}

module.exports = {
    getProduct,
  }