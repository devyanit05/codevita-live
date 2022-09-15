var CareerForm = require('../models/CareerForm');


exports.DataCareer =  (req,res) => {
    if(!req.body){
        res.status(400).send({message:'Content can not be empty'});
        return;
    }

    const {name,email,number,college,appliedFor} = req.body;
    let data = new CareerForm({
        name,
        email,
        number,
        college,
        appliedFor
    })

    data.save()
    .then(() => {
        console.log("Saved")
        res.send({status: "saved Succesfully", data})
    })
    .catch((err)=>{
        console.log(err);
    })
}