const { Router } = require("express");
const { Product,Group } = require("../db.js");
const { getProduct } = require("../Middlewares/ProductMiddleware.js");
const { getGroup } = require("../Middlewares/GroupMiddleware.js");

const router = Router();


router.get('/', async (req,res)=>{
const {name} = req.query;
try {
    let exist = await Product.findOne({where:{id: 1}});

    if(!exist){
       await getGroup();
       await getProduct();
    }

    let all = await Product.findAll({
       
      order: ['id'],
        include: [{
            model: Group,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }]
       
    })
if(name){
    let pName = all.filter(p => p.name.toLowerCase().includes(name.toLocaleLowerCase()))
if(pName.length > 0){
    return res.status(200).send(pName);
} else {
    return res.status(404).send('Error 404: Not Found');
}
} else {
    return res.status(200).send(await all)
}
} catch (err) {
    return res.status(500).send('Server Error: ' + err.message)
}

})

router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    let product = await Product.findOne({
        where:{id: id},
        include: [{
            model: Group,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }]
    })

    if(product){
        return res.status(200).send(dog);
    }else{
        return res.status(404).send(`Error 404: Cant found item with id: ${id}`)
    }
})

router.post('/', async (req,res)=>{
    let {name,price,image,group,description} = req.body;
try {
    if(!name){return res.status(409).send('Name is require')}

    const exist = await Product.findOne({where: {name:name}});
    if(exist){return res.status(409).send("There is an item with that name")}

const product = await Product.create({
    name,
    image,
    price,
    description,
    official: false,
});
let pGroup = await Group.findAll({where:{name: group}})

await product.addGroup(pGroup);

return res.status(200).send('Item created')
} catch (e) {
    return res.status(500).send(e.message)
}


})

module.exports = router;