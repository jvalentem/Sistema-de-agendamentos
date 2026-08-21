const express = require('express');
const router = express.Router();

router.get('/detalhar/:id',(req,res)=>{
    const agendamentoid = req.params.id;
    console.log(agendamentoid);
})

router.delete('/:id',(req,res)=>{
    console.log('deletando', req.params.id);
})

module.exports = router