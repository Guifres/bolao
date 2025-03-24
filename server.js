const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const palpitesRoutes = require('./routes/palpites');
const pagamentosRoutes = require('./routes/pagamentos');
const db = require('./database');  // Conexão com PostgreSQL

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/palpites', palpitesRoutes);
app.use('/pagamentos', pagamentosRoutes);

// 🔥 Endpoint para cadastrar resultados manualmente
app.post('/resultados', async (req, res) => {
    const { time1, time2, gols_time1, gols_time2, data } = req.body;

    try {
        await db.query(
            'INSERT INTO resultados (time1, time2, gols_time1, gols_time2, data) VALUES ($1, $2, $3, $4, $5)',
            [time1, time2, gols_time1, gols_time2, data]
        );

        res.status(201).json({ message: 'Resultado cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar resultado:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Endpoint para validar palpites considerando o formato JSON do banco de dados
app.get('/palpites/palpites', async (req, res) => {
    try {
        // Recuperar os resultados dos jogos
        const resultadoJogos = await db.query('SELECT jsonb_array_elements(resultados) AS jogo FROM resultados_rodada');
        const jogos = resultadoJogos.rows.map(row => row.jogo); // Converte os jogos em um array de objetos

        // Recuperar os palpites dos usuários
        const resultadoPalpites = await db.query('SELECT * FROM palpites');
        const palpites = resultadoPalpites.rows;

        // Armazenar os vencedores
        const vencedores = [];

        // Loop através dos palpites e comparar com os resultados
        for (const palpite of palpites) {
            let acertouTodos = true;

            for (const jogoPalpite of palpite.palpites) {
                // Encontre o resultado correto do jogo
                const resultadoReal = jogos.find(jogo => {
                    const time1 = Object.keys(jogo)[0]; // Exemplo: "ECVitoria"
                    const time2 = Object.keys(jogo)[1]; // Exemplo: "Juventude"
                    return (time1 === jogoPalpite.time1 && time2 === jogoPalpite.time2);
                });

                if (!resultadoReal) {
                    console.log(`Não encontrou o jogo entre ${jogoPalpite.time1} e ${jogoPalpite.time2}`);
                    acertouTodos = false;
                    break;
                }

                // Verifique os placares
                const placarRealTime1 = resultadoReal[jogoPalpite.time1];
                const placarRealTime2 = resultadoReal[jogoPalpite.time2];

                if (
                    parseInt(placarRealTime1) !== jogoPalpite.gols1 ||
                    parseInt(placarRealTime2) !== jogoPalpite.gols2
                ) {
                    acertouTodos = false;
                    break;
                }
            }

            // Se acertou todos os palpites, é um vencedor
            if (acertouTodos) {
                vencedores.push({ nome: palpite.nome, telefone: palpite.telefone });
            }
        }

        // Retorne os vencedores como resposta
        res.json(vencedores);
    } catch (error) {
        console.error('Erro ao buscar vencedores:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



