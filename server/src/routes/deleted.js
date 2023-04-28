const { Router } = require("express");
const { Product } = require("../db.js");

const router = Router();

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let pFind = Product.findOne({where: {id: id}})

        if(pFind){
            await Product.destroy({
                where: { id: id },
            });
            return res.status(200).send({ message: 'Item removed' });
        } else {
            return res.status(412).send({ message: 'Error 412: cant remove item' });
        }
    } catch (err) {
return res.status(500).send(err.message)
    }

});

module.exports = router;