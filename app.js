const express = require('express');
const port = 3000;
const app = express();


app.use(express.json())
const router = express.Router();
app.use("/api", express.urlencoded({ extended: false }), router);

router.get('/', (req, res) => {
    res.send('tes')
})

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
});