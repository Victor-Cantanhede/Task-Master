const mongoose = require('mongoose');
const { Schema } = mongoose;


const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    prazo: {
        type: String,
        required: true
    },
    responsavel: {
        type: String,
        required: true
    },
    situacao: {
        type: Boolean,
        default: true
    }
},
{timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = {Task};