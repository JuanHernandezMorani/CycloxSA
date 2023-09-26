const { Product, Group } = require("../db.js")
const dotenv = require('dotenv');
const  axios  = require('axios');
dotenv.config({ path: '../../.env'});
const { getGroup } = require("./GroupMiddleware.js");

const getProduct = async () => {
  try {
    const list = [];

    var existGroups = Group.findOne({
      where: {id: 1}
    });

    if(!existGroups) getGroup();

    for(let i = 1; i < 21; i++){
  console.log(("Process A: "+i*100)/21+"%");
      let products1 = await axios.get(`https://fakestoreapi.com/products/${i}`);
      list.push(products1.data);
    }


    for(let i = 1; i < 101;i++){
      console.log(("Process B: "+i*100)/101+"%");
      let products2 = await axios.get(`https://dummyjson.com/products/${i}`);
      list.push(products2.data);
    }
    
    list.map(async (p) => {
     await Product.create({
        where:{
          name: p.title,
          image: p.image,
          price: p.price,
          description: p.description,
          category: p.category
        }
      })
    
    })
  
 


  } catch (error) {
    console.log(error.message);
  }

}

module.exports = {
    getProduct,
  }