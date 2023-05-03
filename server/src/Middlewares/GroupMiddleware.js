const { Group } = require("../db.js")
const dotenv = require('dotenv');
const  axios  = require('axios');
dotenv.config({ path: '../../.env'});

const getGroup = async () => {
  try {

    var uniqArr = (arrArg) => {
      return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
    }



    const listG = [];
    const listC = [];

    for(let i = 1; i < 21; i++){
      let products1 = await axios.get(`https://fakestoreapi.com/products/${i}`);
      listG.push(products1.data)
    } 

    for(let i = 1; i < 101;i++){
      let products2 = await axios.get(`https://dummyjson.com/products/${i}`);
      listG.push(products2.data)
    }

   listG.map(async (g) => {
      listC.push(g.category)
    })
    

uniqArr(listC).map(async (g) => {
  await  Group.findOrCreate({
    where:{
      name: g
    }
  })
})

  } catch (error) {
    console.log(error.message);
  }

}

module.exports = {
    getGroup,
  }