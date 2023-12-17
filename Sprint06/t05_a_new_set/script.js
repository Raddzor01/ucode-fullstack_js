const clearButton = document.getElementById('clear');
const arrayPost = document.getElementById('array');
const sendButton = document.getElementById('send');

let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let age = document.getElementById('age').value;
let about = document.getElementById('about').value;
let photo = document.getElementById('photo').value;

sendButton.addEventListener('click', () => {
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    age = document.getElementById('age').value;
    about = document.getElementById('about').value;
    photo = document.getElementById('photo').value;

    if (name && email && age && about && photo) {
        name = '';
        email = '';
        age = '';
        about = '';
        photo = '';
        arrayPost.innerHTML = '';
    }
});

clearButton.addEventListener('click', () => {
    name = '';
    email = '';
    age = '';
    about = '';
    photo = '';
    arrayPost.innerHTML = '';
});