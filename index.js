const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./config')
const router = require('./routes/index')



app.use('/api', router)
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})

