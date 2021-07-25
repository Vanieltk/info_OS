const express = require('express')
const app = express()

const equipRouter = require('./equipRouter')

//aceita os dados de um formato json
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/equipamentos', equipRouter)

app.listen(3000, () => {
    console.log(`Aplicação em Execução..`)
})