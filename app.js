let cors = require('cors');
let express = require('express');
let bodyparser=require('body-parser')
let app = express()
require('dotenv/config')
app.use(express.json())
app.use(cors());

app.use(bodyparser.json());

let connectDB = require("./config/db")
connectDB();
const indexRouter = require('./Main_Routes/index.routes');
let port = process.env.PORT || 5000;

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use('/uploads',express.static('uploads')); // upload flder publically
app.use('/api', indexRouter);

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})