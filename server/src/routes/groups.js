const { Router } = require("express");
const { Group } = require("../db.js");
const { getGroup } = require("../Middlewares/GroupMiddleware.js");

const router = Router();

router.get('/', async (req,res)=>{
    const {name} = req.query;

    try {
        let exist = await Group.findOne({where:{id:1}});
        
        if(!exist){
            await getGroup();
        }
        let all = await Group.findAll({
            order:['id']
        })

if(name){
let pGroup = await all.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
if(pGroup.length > 0){
    return res.status(200).send(pGroup);
} else {
    return res.status(404).send('Error 404: Not found')
}

} else {
    return res.status(200).send(await all)
}


    } catch (err) {
        return res.status(500).send(err.message)
    }
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params;

    let group = await Group.findOne({where: {id: id}});

    if(group){
        return res.status(200).send(group);
    }else{
        return res.status(404).send(`Error 404: Cant found group with id: ${id}`)
    }
})

module.exports = router;