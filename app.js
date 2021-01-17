const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended : true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000)