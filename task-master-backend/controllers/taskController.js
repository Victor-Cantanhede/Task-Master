const { Task: TaskModel } = require('../models/Task.js');

const taskController = {
    create: async (req, res) => {
        try {
            const request = req.body;
            const task = {
                title: request.title,
                description: request.description,
                category: request.category,
                prazo: request.prazo,
                responsavel: request.responsavel
            };

            const response = await TaskModel.create(task);

            res.status(201).json({response, msg: 'Cadastro efetuado com sucesso!'});
        }
        catch (error) {
            console.log('Falha no cadastramento!');
            console.log(`Erro: ${error}`);
        }
    },

    getAll: async (req, res) => {
        try {
            const task = await TaskModel.find();

            res.json(task);
        }
        catch (error) {
            console.log('Falha na requisição GET!');
            console.log(`Erro: ${error}`);
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const task = await TaskModel.findById(id);

            if (!task) {
                res.status(404).json({msg: 'Não foi possível localizar sua requisição!'});
                return;
            }

            res.json(task);
        }
        catch (error) {
            console.log('Falha na requisição GET!');
            console.log(`Erro: ${error}`);
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const task = await TaskModel.findById(id);

            if (!task) {
                res.status(404).json({msg: 'Não foi possível localizar sua requisição DELETE!'});
                return;
            }

            const deletedTask = await TaskModel.findByIdAndDelete(id);

            res.status(200).json({deletedTask, msg: 'Exclusão realizada com sucesso!'});
        }
        catch (error) {
            console.log('Falha na requisição DELETE!');
            console.log(`Erro: ${error}`);
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const request = req.body;
            const task = {
                title: request.title,
                description: request.description,
                category: request.category,
                prazo: request.prazo,
                responsavel: request.responsavel
            };

            const updatedTask = await TaskModel.findByIdAndUpdate(id, task, {new: true});

            if (!updatedTask) {
                res.status(404).json({msg: 'Não foi possível atualizar sua requisição!'});
                return;
            }

            res.status(200).json({updatedTask, msg: 'Atualização efetuada com sucesso!'});
        }
        catch (error) {
            console.log('Falha na atualização!');
            console.log(`Erro: ${error}`);
        }
    }
};

module.exports = taskController;