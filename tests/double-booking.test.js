const {AgendamentoService} = require('../services/AgendamentoServices');
const pool = require('../data/mysql').pool


beforeEach(async () => {
  await pool.query('DELETE FROM agendamentos WHERE fk_horario = ?', [1]);
  await pool.query('UPDATE horarios SET ocupado = false WHERE id = ?', [1]);
});

afterAll(async () => {
  await pool.end(); // senão o Jest fica pendurado com o pool aberto
});

test('double booking previnido', async () => {
  const resultados = await Promise.all([
    AgendamentoService.createAgendamento(1,1,1),
    AgendamentoService.createAgendamento(1,1,2)
  ]);

  expect(resultados.filter(r => r === true)).toHaveLength(1);

  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM agendamentos WHERE fk_horario = ?', [1]);
  expect(total).toBe(1);
});