/*
Linhas 1–3: importam Express, o cliente HTTP nativo do Node e o middleware de rate limit.
Linhas 8–22: iniciam um servidor Express temporário numa porta disponível. A rota de teste usa o mesmo limitador de agendamentos; se a requisição passar, responde 201.
Linhas 24–28: fecham o servidor após o teste para não deixar processos ou conexões abertos.
Linhas 30–45: definem uma função que envia uma requisição POST e retorna o código HTTP e o corpo da resposta.
Linhas 47–61: enviam cinco requisições do mesmo IP e verificam que todas passam. A sexta deve receber 429 e a mensagem de limite excedido.
*/



const express = require('express');
const http = require('node:http');
const { agendamentoRateLimit } = require('../middlewares/agendamentoRateLimit');

let server;
let agendamentoUrl;

beforeAll(async () => {
    const app = express();
    app.post('/agendar/:sid', agendamentoRateLimit, (req, res) => {
        res.sendStatus(201);
    });

    server = app.listen(0);
    await new Promise((resolve, reject) => {
        server.once('listening', resolve);
        server.once('error', reject);
    });

    const { port } = server.address();
    agendamentoUrl = `http://127.0.0.1:${port}/agendar/1`;
});

afterAll(async () => {
    await new Promise((resolve, reject) => {
        server.close(error => error ? reject(error) : resolve());
    });
});

function requestAgendamento() {
    return new Promise((resolve, reject) => {
        const request = http.request(agendamentoUrl, { method: 'POST' }, response => {
            let body = '';
            response.setEncoding('utf8');
            response.on('data', chunk => body += chunk);
            response.on('end', () => resolve({
                statusCode: response.statusCode,
                body
            }));
        });

        request.on('error', reject);
        request.end();
    });
}

test('limita a cinco tentativas de agendamento por IP', async () => {
    const respostasPermitidas = [];

    for (let tentativa = 0; tentativa < 5; tentativa++) {
        respostasPermitidas.push(await requestAgendamento());
    }

    const respostaBloqueada = await requestAgendamento();

    expect(respostasPermitidas.map(resposta => resposta.statusCode))
        .toEqual([201, 201, 201, 201, 201]);
    expect(respostaBloqueada.statusCode).toBe(429);
    expect(JSON.parse(respostaBloqueada.body).error_message)
        .toMatch(/Muitas tentativas de agendamento/);
});