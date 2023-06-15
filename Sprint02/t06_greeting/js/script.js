function checkstring(string) {
    return !/^[a-zA-Z]+$/.test(string);
}

var first_name = prompt('What is your first name?');
if (checkstring(first_name)) {
    alert('Wrong input!');
    console.log('Wrong input!');
} else {
    var last_name = prompt('What is your last name?');
    if (checkstring(last_name)) {
        alert('Wrong input!');
        console.log('Wrong input!');
    } else {
        first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);

        alert('Hello ' + first_name + ' ' + last_name);
        console.log('Hello ' + first_name + ' ' + last_name);
    }
}
