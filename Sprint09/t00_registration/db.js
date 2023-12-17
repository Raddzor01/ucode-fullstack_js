const User = require('./models/user');
const fs = require('fs');
const crypt = require('bcryptjs');

exports.addUser = async (req, res) => {
    let valid = await validate(req.body);
    if(valid.status) {
        let user = new User();
        console.log(req.body);
        await user.save({
            full_name: req.body.name,
            login: req.body.login,
            password: await crypt.hash(req.body.password, 8),
            email: req.body.email
        });
        res.redirect('/done');
    } else {
        res.send(getIndex(`<div class='error-box'>Error!!! ${valid.error}</div>`));
    }

};

exports.index = (req, res) => {
    res.send(getIndex());
}
exports.done = function(req, res) {
    res.redirect("/done.html");
}

async function validate(data) {
    let user = new User();
    let result, result1;
    let error = '';

    result = await user.getList({
        login: data.login,
    });
    if(result.length > 0) {
        error += "Такой логин уже существует! ";
    }

    result1 = await user.getList({
        email: data.email
    });
    if(result1.length > 0) {
        error += "Такой email уже используется! ";
    }

    return {status: !(result.length + result1.length), error: error};
}
function getIndex(insert = false) {
    try {
        const data = fs.readFileSync(__dirname + '/public/registration.html', 'utf-8');
        return (data && insert) ? data.replace("#TEXT#", insert) : data.replace("#TEXT#", '');
    } catch (err) {
        console.error(err);
    }
    return false;

}