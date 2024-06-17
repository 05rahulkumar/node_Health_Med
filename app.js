let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv/config');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

let connectDB = require("./config/db");
connectDB();

const indexRouter = require('./Main_Routes/index.routes');
let port = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads')); // upload folder publicly accessible
app.use('/api', indexRouter);

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
