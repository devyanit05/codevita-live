const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    number:{
        type:String,
    },
    college:{
        type:String,
        required: true
    },
    appliedFor:{
        type:String,
        required:true
    }
})

const CareerForm = mongoose.model('career', formSchema);
module.exports = CareerForm;