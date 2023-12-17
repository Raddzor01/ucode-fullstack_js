const User = require('./models/user');
const fs = require('fs');
const crypt = require('bcryptjs');
const nodemailer = require("nodemailer");

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
        const data = fs.readFileSync(__dirname + `/views/${file}.html`, 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", '');
    } catch (err) {
        console.error(err);
    }
    return false;

}

exports.reminder = async (req, res) => {
    if(req.method === 'GET') {
        res.send(render('reminder'));
    } else {
        let user = new User();
        let result = await user.getList({
            email: req.body.email
        });
        let message = "";
        if(result.length > 0) {
            sendEmail(result[0].email, result[0].password);
            message = "<div class='success-box'>Ваш пароль отправлен на Ваш email</div>";
        } else {
            message = "<div class='error-box'>Пользователя с таким email не существует!</div>";
        }
        res.send(render(
            'reminder',
            {text: message})
        );
    }
}

async function sendEmail(email, pass) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"D.Harin" <Danylo.Harin@cit.khpi.edu.ua>',
        to: email,
        subject: "Important! Password reminder.",
        text: "Your password is: <b>" + pass + "</b>",
        html: "Your password is: <b>" + pass + "</b>",
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}