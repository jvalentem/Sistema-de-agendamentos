const data = require('./data/databaseModel')
const agendamentoRouter = require('./routes/agendamentos')
const express = require('express');
const app = express();

app.use('/agendamento', agendamentoRouter);


app.listen(3000,()=>{console.log('server online')})

