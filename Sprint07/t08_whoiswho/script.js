window.onload =  () => {
    document.querySelectorAll('select').forEach((item) => {
        item.addEventListener('change', () => {
            document.querySelector('#submit').click();
        });
    });
};