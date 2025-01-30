const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect(
            'mongodb+srv://TaskMasterDB:TaskMasterKey@tasks.4e3dw.mongodb.net/'
        );
        console.log('Banco de dados conectado!');
    }
    catch (error) {
        console.log('Falha ao conectar-se ao banco de dados!');
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;