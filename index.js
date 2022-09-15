const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const { uri } = require('./config/config');
const route = require('./routes/routes');


const app = express();

app.use(express.json());
app.use(cors());

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" })


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Db");
    }).catch((err) => {
        console.log(err);
    })

app.use('/', route)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

PORT = process.env.PORT || 8080
// app.set('port', process.env.PORT || 8080);
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
})

