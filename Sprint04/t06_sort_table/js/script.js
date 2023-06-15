const data = [
    { name: 'Black Panther', strength: 66, age: 53 },
    { name: 'Captain America', strength: 79, age: 137 },
    { name: 'Captain Marvel', strength: 97, age: 26 },
    { name: 'Hulk', strength: 80, age: 49 },
    { name: 'Iron Man', strength: 88, age: 48 },
    { name: 'Spider-Man', strength: 78, age: 16 },
    { name: 'Thanos', strength: 99, age: 1000 },
    { name: 'Thor', strength: 95, age: 1000 },
    { name: 'Yon-Rogg', strength: 73, age: 52 }
];

let notification = document.querySelector('#notification')
notification.innerHTML = "Sorting by Name, order: ASC"

var table = document.createElement('table');
table.classList.add('table');

var header = document.createElement('tr');
['Name', 'Strength', 'Age'].forEach((element) => {
    let th = document.createElement('th');
    th.textContent = element;
    th.addEventListener('click', () => sortTable(element));
    header.appendChild(th);
});
table.appendChild(header);

function showTableData() {
    const rows = Array.from(table.getElementsByTagName('tr'));
    rows.shift();
    rows.forEach((row) => table.removeChild(row));
    data.forEach((element) => {
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        td.innerText = element.name;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = element.strength;
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerText = element.age;
        tr.appendChild(td);

        table.appendChild(tr);
    });
}

var currentColumn = 'Name';
var sortType = 'ASC';

function sortTable(column) {
    if (column === currentColumn) {
        data.reverse();
        sortType = 'DESC';
        currentColumn = null;
    } else {
        data.sort((a, b) => {
            if (a[column.toLowerCase()] > b[column.toLowerCase()]) {
                return 1;
            }
            return -1;
        });
        sortType = 'ASC';
        currentColumn = column;
    }

    
    showTableData();
    notification.innerHTML = `Sorting by ${column}, order: ${sortType}`;
}

showTableData();

document.getElementById('placeholder').innerHTML = '';
document.getElementById('placeholder').appendChild(table);