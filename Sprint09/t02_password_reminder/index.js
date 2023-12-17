const express = require('express');
const session = require('express-session');
const db = require('./db');

const app = express();
const userRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(__dirname + '/public'));
app.use(session({
    secret: 'its-secret',
    saveUninitialized: true,
    resave: true,
    user: {}
}));

userRouter.post("/create", db.addUser);
userRouter.post("/validate", db.addUser);
userRouter.use("/home", db.home);
app.use("/user", userRouter);
app.use("/done", db.done);
app.get("/logout", db.logout);
app.get("/register", db.register);
app.use("/reminder", db.reminder);
app.use("/login", db.login);
app.use("/", db.index);

app.listen(8080, () => {
    console.log("Server stared at http://127.0.0.1:8080/");
});