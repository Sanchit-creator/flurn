const mongoose = require('mongoose');

const conn_url = 'mongodb+srv://sanchit:sanchit@cluster0.c7uvikd.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.log(err))


module.exports = db;