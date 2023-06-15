function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}

function refreshOutput() {
    var output = getCookie("notes") || "[Empty]";
    document.getElementById("output").innerText = output;
}

refreshOutput();

document.getElementById('addButton').addEventListener('click', () => {
    var text = document.getElementById("textInput").value.trim();
    if (text === "") {
        alert("It's empty. Try to input something in 'Text input'.");
        return;
    }
    var notes = getCookie("notes") || "";
    notes += "--> " + text + "\n";
    setCookie("notes", notes, 30);
    refreshOutput();
});

document.getElementById('clearButton').addEventListener('click', () => {
    var confirmation = confirm("Are you sure?");
    if (confirmation) {
        setCookie("notes", "", -1);
        refreshOutput();
    }
});