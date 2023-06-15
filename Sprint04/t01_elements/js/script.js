document.querySelectorAll('ul li:not([class])').forEach((element) => {
    element.classList.add('unknown');
});

document.querySelectorAll('ul li:not([data-element])').forEach((element) => {
    element.setAttribute('data-element', 'none');
});

document.querySelectorAll('ul li').forEach((element1) => {
    const dataAttribute = element1.getAttribute('data-element');
    const circleContainer = document.createElement('div');

    dataAttribute.split(' ').forEach((element2) => {
        let newElement = document.createElement('div');
        newElement.classList.add('elem');
        newElement.classList.add(element2);
        if(element2 === 'none') {
            let line = document.createElement('div');
            line.classList.add('line');
            newElement.appendChild(line);
        }
        circleContainer.appendChild(newElement);
    });
    element1.appendChild(circleContainer);
});
