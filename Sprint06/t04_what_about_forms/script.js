const checkButton = document.getElementById('choice');
checkButton.addEventListener('click', () => {
    const radioButtons = document.querySelectorAll('input[type=radio]');
    const message = document.getElementById('result');
    let selectedValue;
    radioButtons.forEach((radio) => {
        if (radio.checked)
            selectedValue = radio.value;
    });

    if (selectedValue === '3')
        message.innerHTML = 'Correct answer!';
    else if (selectedValue === '1' || selectedValue === '2')
        message.innerHTML = 'Shame on you! Go and watch Avengers!';
    else
        message.innerHTML = 'Please choose an answer option.';
});