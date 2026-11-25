const rateLimit = require('express-rate-limit');

const agendamentoRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error_message: 'Muitas tentativas de agendamento. Tente novamente em alguns minutos.'
        });
    }
});

module.exports = { agendamentoRateLimit };
