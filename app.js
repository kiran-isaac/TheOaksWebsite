const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const SHA256 = require("crypto-js").SHA256;
const session = require("express-session");

const app = express();

const port = 5000 || process.env.port;

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
const staff = JSON.parse(readFileSync("views/staff.json"));

const requireLogin = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.redirect('/login')
    }
    next();
}

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

app.get("/staff/policies", requireLogin, (req, res) => {
    res.render("staff/policies", {pages : staff.pages})
});

app.get("/staff/forum", requireLogin, (req, res) => {
    res.render("staff/forum", {pages : staff.pages})
});

app.get("/staff", requireLogin, (req, res) => {
    res.render("staff/staff", {pages : staff.pages})
});

app.get("/login", (req, res) => {
    res.render("login", {pages : pages})
})

app.post("/login", async (req, res) => {
    if (SHA256(req.body.password).toString() == staff.password) {
        req.session.loggedIn = true;
        req.session.cookie.maxAge = (60 * 1000);
    };
    res.redirect("/staff");
})

app.get("*", (req, res) => {
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})