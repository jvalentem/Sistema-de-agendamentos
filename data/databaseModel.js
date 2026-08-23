const Horario = require('../models/Horario');
const Servico = require('../models/Servico');
const UsuarioModel = require('../models/Usuario');
const Agendamento = require('../models/Agendamento')

const usuarios = []
const servicos = []
const agendamentos = []

//Inicialização dos modelos de teste

//USUARIOS
const admin = new UsuarioModel('admin','123','admin');
const funcionario = new UsuarioModel('funcionario','123','funcionario')
const cliente = new UsuarioModel('cliente','123');

const invasor = new UsuarioModel('invasor','123');

admin.setId(usuarios.length);
usuarios.push(admin)

funcionario.setId(usuarios.length);
usuarios.push(funcionario)

cliente.setId(usuarios.length);
usuarios.push(cliente)

invasor.setId(usuarios.length);
usuarios.push(invasor)


//SERVICOS, HORARIOS
const corteDeCabelo = new Servico('Cortes de cabelo',funcionario,[],45,30);
corteDeCabelo.setId(servicos.length + 1);

const horariosCorte = [new Horario('15:00',corteDeCabelo.getId())];
corteDeCabelo.setHorarios(horariosCorte);
servicos.push(corteDeCabelo);

const psicologia = new Servico('Psicologia',funcionario,[],70,50);
psicologia.setId(servicos.length + 1)

const horariosPsicologa = [new Horario('16:50',psicologia.getId()), new Horario('17:30',psicologia.getId())];
psicologia.setHorarios(horariosPsicologa);
servicos.push(psicologia)

// //AGENDAMENTOS 

// const agendamentoCorte = new Agendamento(corteDeCabelo,horariosCorte[0],cliente.id)
// agendamentos.push(agendamentoCorte);

// const agendamentoPsicologia = new Agendamento(psicologia,horariosPsicologa[1],cliente.id);
// agendamentos.push(agendamentoPsicologia)

module.exports = {usuarios,servicos,agendamentos}