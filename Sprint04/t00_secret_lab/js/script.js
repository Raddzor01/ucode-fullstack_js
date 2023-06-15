function transformation() {
    let heroText = document.querySelector('#hero');
    if(heroText.textContent == "Bruce Banner") {
        heroText.innerText = 'Hulk';
        heroText.style.fontSize = '130px';
        heroText.style.letterSpacing = '6px';
        document.querySelector('#lab').style.backgroundColor = '#70964b';
    } else {
        heroText.innerText = 'Bruce Banner';
        heroText.style.fontSize = '';
        heroText.style.letterSpacing = '';
        document.querySelector('#lab').style.backgroundColor = '';
    }
}