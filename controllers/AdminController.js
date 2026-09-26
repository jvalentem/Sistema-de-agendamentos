const {FuncionarioService} = require('../services/FuncionarioService')
const {AgendamentoService} = require('../services/AgendamentoServices');
const { ServicosService } = require('../services/ServicosService');
const {UserService} = require('../services/UserService')
const {ClienteService} = require ('../services/ClienteService')

class AdminController{

    static async getFuncionarios(req,res){
        try{
            const funcionarios = await FuncionarioService.getFuncionarios();
            if(funcionarios) return res.status(200).json(funcionarios);
            
            return res.status(404).json('Nenhum funcionário cadastrado')
        }catch(e){return res.status(400).json(e)}
    }

    static async getServicos(req,res){
        try{
            const servicos = await ServicosService.getServicos();
            if(servicos) return res.status(200).json(servicos)

            return res.status(404).json('Nenhum serviço cadastrado')
        }catch(e){return res.status(400).json(e)}
    }

    static async getAgendamentos(req,res){
        try{
            const agendamentos = await AgendamentoService.getAgendamentos();
            if(agendamentos) return res.status(200).json(agendamentos)

            return res.status(404).json('Nenhum agendamento!')
        }catch(e){return res.status(400).json(e)}

    }

    static async getUsuarios(req,res){
        //Usuarios: funcionarios e admins
        try{
            const usuarios = await UserService.getUsers()
            if(usuarios) return res.status(200).json(usuarios)

            return res.status(404).json('Nenhum usuario cadastrado')
        }catch(e){return res.status(400).json(e)}
    }
    
    static async getClientes(req,res){
        try{
            const clientes = await ClienteService.getClientes();
            if(clientes) return res.status(200).json(clientes)
                
            return res.status(404).json('Nenhum cliente cadastrado')
        }catch(e){return res.status(400).json(e)}
    }
}

module.exports = {AdminController}