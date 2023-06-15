function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorageItem(key) {
    return localStorage.getItem(key);
}

function refreshOutput() {
    var output = getLocalStorageItem("notes") || "[Empty]";
    document.getElementById("output").innerText = output;
}

function getCurrentDateTime() {
    var now = new Date();
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    return " [" + date + ", " + time + "]";
}

refreshOutput();

document.getElementById('addButton').addEventListener('click', () => {
    var text = document.getElementById("textInput").value.trim();
    if (text === "") {
        alert("It's empty. Try to input something in 'Text input'.");
        return;
    }
    var notes = getLocalStorageItem("notes") || "";
    notes += "--> " + text + getCurrentDateTime() + "\n";
    setLocalStorageItem("notes", notes);
    refreshOutput();
});

document.getElementById('clearButton').addEventListener('click', () => {
    var confirmation = confirm("Are you sure?");
    if (confirmation) {
        setLocalStorageItem("notes", "");
        refreshOutput();
    }
});