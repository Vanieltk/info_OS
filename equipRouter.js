
const express = require('express');
const router = express.Router();
const cors = require('cors')
const multer = require('multer')
const path = require("path")
router.use(cors())  

const knex = require('./dbconfig')


router.get('/', async (req, res) => {
    try {
        const equipamentos = await knex('equipamentos').orderBy("os")
        res.status(200).json(equipamentos)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})




var storage = multer.diskStorage({

    destination: (req, file, cb) => cb(null, path.resolve(__dirname, 'fotos')),

    filename: (req, file, cb) => cb(null, file.originalname + '-' + Date.now())

})

// const storage = multer.diskStorage({
//     destination:  (req, file, callback) => callback(null, './fotos'),
//     filename: (req, file, callback) => callback(null, Date.now()+ '-' + file.originalname)
    
//   })
   
  const upload2 = multer({ storage })


  router.post('/', upload2.single('foto'), async (req, res) => {
    console.log(req.file.originalname);
    console.log(req.file.filename)
    console.log(req.file.mimetype)
    console.log(req.file.size)
    
    const { equipamento, nome, modelo } = req.body
    const foto = req.file.path

    if(!equipamento || !nome || !modelo || !foto){
        res.status(406).json({msg:'Informe o equipamento nome do cliente e o modelo'})
        return
    }

    try {
        const novo = await knex('equipamentos').insert({ equipamento, nome, modelo,foto })
        res.status(200).json({ os: novo[0] })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

})


router.delete('/:os', async (req, res) => {
    const os =req.params.os
    try {
        await knex('equipamentos').del().where({os})
        res.status(200).json()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})


router.put('/:os', async (req, res) => {
    const os =req.params.os
    const {modelo} = req.body
    try {
        await knex('equipamentos').update({modelo}).where({os})
        res.status(200).json()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
})

router.get('/pesq/:palavra', async (req, res) => {
    const{palavra}=req.params
    try {
        const equipamentos = await knex('equipamentos').where('modelo', 'like', `%${palavra}%`)
        .orWhere('nome','like', `%${palavra}`)
        res.status(200).json(equipamentos)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
})
module.exports = router
