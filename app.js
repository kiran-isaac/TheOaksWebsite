const express = require("express");
const { readFileSync } = require("fs");
const app = express();
const path = require("path");
const SHA1 = require("crypto-js").SHA1;

const session = require("express-session");

const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended : true}));

app.use(session({
    secret : "afa24hjalkj4lf",
    saveUninitialized : true,
    resave : false
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static("public"))
app.use('/static', express.static(path.join(__dirname, 'public')))

const pages = JSON.parse(readFileSync("views/pages.json"));
const staff = JSON.parse(readFileSync("views/staff.json"))

const staffOnlyPages = staff.pages;

app.get("/", (req, res) => {
    res.render("index", {pages : pages})
});

app.get("/about", (req, res) => {
    res.render("about", {pages : pages})
});

app.get("/clubs", (req, res) => {
    res.render("clubs", {pages : pages})
});

app.get("/contact", (req, res) => {
    res.render("contact", {pages : pages})
});

app.get("/join", (req, res) => {
    res.render("join", {pages : pages})
});

app.get("/register", (req, res) => {
    res.render("register", {pages : pages})
});

app.get("/staff/policies", (req, res) => {
    res.render("staff/policies", {pages : pages})
})

app.get("/staff", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/staff/policies");
    } else {
        res.redirect("/login");
    };
});

app.get("/login", (req, res) => {
    res.render("login", {pages : pages})
})

app.post("/login", async (req, res) => {
    console.log(req.body.password);
    if (SHA1(req.body.password).toString() == staff.password) {
        req.session.loggedIn = true;
        req.session.cookie.maxAge = 60 * 60 * 1000;
    };
    res.redirect("/staff");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})