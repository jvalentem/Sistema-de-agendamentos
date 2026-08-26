//Routers
const agendamentoRouter = require('./routes/agendamentos')
const usuarioRouter = require('./routes/usuario');
const servicosRouter = require('./routes/servicos');
const funcionariosRouter = require('./routes/funcionarios')
//Controllers
const {ServicosController} = require('./controllers/ServicosController');

const data = require('./data/databaseModel')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express');
const session = require('express-session');
const app = express();

app.locals.partials = path.join(__dirname + '/partials/')

app.set('view engine','ejs');
app.set('views',path.join(__dirname + '/views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
	secret: process.env.SESSION_SECRET || 'chave-de-desenvolvimento', // Define a chave usada para assinar e proteger o cookie da sessão.
	resave: false, // Evita salvar novamente a sessão quando ela não foi modificada.
	saveUninitialized: false, // Não cria uma sessão no armazenamento até que ela seja realmente utilizada.
	
    cookie: {// Configura as opções do cookie enviado ao navegador.
		httpOnly: true, // Impede que JavaScript no navegador acesse o cookie diretamente.
		secure: process.env.NODE_ENV === 'production', // Exige HTTPS somente quando a aplicação estiver em produção.
		maxAge: 1000 * 60 * 60 * 24 // Mantém a sessão válida por 24 horas.
	}
}));

// Executa este middleware em todas as requisições seguintes.
app.use((req, res, next) => {
	res.locals.session = req.session; // Disponibiliza os dados da sessão diretamente para os arquivos EJS.
	next();
});

app.use('/agendamento', agendamentoRouter);
app.use('/usuario', usuarioRouter);
app.use('/servico',servicosRouter);
app.use('/funcionario', funcionariosRouter)
app.use(express.static('public')) //arquivos estáticos


app.listen(3000)


app.get('/',ServicosController.getServicos)

