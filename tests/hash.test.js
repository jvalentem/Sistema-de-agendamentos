const { hash } = require('bcrypt');
const {hashPassword, comparePassword} = require('../utils/password');


test('senha hasheada', async ()=>{
    const senha = '1234';

    expect(await hashPassword(senha)).not.toBe(senha);
})

test('senha deshasheada', async ()=>{
    const senhaHasheada = await hashPassword("1234");

    expect(comparePassword('1234',senhaHasheada))
})