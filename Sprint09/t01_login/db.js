const User = require('./models/user');
const fs = require('fs');
const crypt = require('bcryptjs');

exports.addUser = async (req,res) => {
    let valid = await validate(req.body);
    if(valid.status) {
        let user = new User();
        console.log(req.body);
        user.save({
            full_name: req.body.name,
            login: req.body.login,
            password: await crypt.hash(req.body.password, 8),
            email: req.body.email
        });
        res.redirect('/done');
    } else {
        res.send(render('register', `<div class='error-box'>Error!!! ${valid.error}</div>`));
    }

};

exports.index = (req,res) => {
    res.send(render(req.session.user ? "home" : "index"));
}

exports.done = (req,res) => {
    res.redirect("/done.html");
}

exports.register = (req,res) => {
    res.send(render('registration'));
}

exports.home = (req,res) => {
    if(req.session.user)
        res.send(render("home", `Ваш статус пользователя: ${req.session.user.status}</br>`));
    else
        res.redirect('/login/');

}

exports.login = async (req,res) => {
    if(req.method === 'GET') {
        if(req.session.user)
            res.redirect('/user/home/');
        else
            res.send(render('login'));

    } else {
        let sess = req.session;
        if(sess.user) {
            res.redirect('/user/home/');
        } else {
            let user = new User();
            let result = await user.getList({
                login: req.body.login
            });
            console.log(result);
            if(result.length > 0 && await crypt.compare(req.body.password, result[0].password)) {
                sess.user = result[0];
                res.redirect('/user/home/');
            } else {
                res.send(render('login', '<div class="error-box">Error!! Password and login not valid</div>'));
            }
        }
    }
}

exports.logout = async function(request, response) {
    request.session.destroy((err) => {
        if(err)
            return console.log(err);
        response.redirect('/login');
    });
}

async function validate(data) {
    let user = new User();
    let result, result1;
    let error = '';

    result = await user.getList({
        login: data.login,
    });

    if(result.length > 0)
        error += "Такой логин уже существует! ";

    result1 = await user.getList({
        email: data.email
    });

    if(result1.length > 0)
        error += "Такой email уже используется! ";

    return {status: !(result.length + result1.length), error: error};
}
function render(file, insert = false) {
    try {
        const data = fs.readFileSync(__dirname + `/public/${file}.html`, 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", '');
    } catch (err) {
        console.error(err);
    }
    return false;

}