const getUsers = (req, res) => {
    res.send("Lista de usuários");
};

const createUser = (req, res) => {
    res.send("Usuário criado");
};

module.exports = { getUsers, createUser };
