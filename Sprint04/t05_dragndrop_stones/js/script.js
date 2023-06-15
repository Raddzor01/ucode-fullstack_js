document.querySelectorAll('.block').forEach((element) => {
    element.addEventListener('dblclick', () => {
        element.classList.toggle('draggable');
    });
    element.onmousedown = function (e) {
        if (element.classList.contains('draggable')) {

            element.style.position = 'absolute';
            moveAt(e);
          
            document.body.appendChild(element);

            function moveAt(e) {
                element.style.left = e.pageX - element.offsetWidth / 2 + 'px';
                element.style.top = e.pageY - element.offsetHeight / 2 + 'px';
            }

            document.onmousemove = (e) => {
                moveAt(e);
            }

            element.onmouseup = () => {
                document.onmousemove = null;
                element.onmouseup = null;
            }
        }
    }
});

