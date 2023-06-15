function lazyLoad() {
    const images = Array.from(document.querySelectorAll('img[data-src]'));
    let loadedCount = 0;
    function loadImage(img) {
        const rect = img.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top >= 0 && rect.top <= viewportHeight) {
          const src = img.getAttribute('data-src');
          img.setAttribute('src', src);
          img.removeAttribute('data-src');
          img.style.display = 'block';
          loadedCount++;
          showMess(`${loadedCount} images loaded from 20`, 'red');
        }
    }

    function scrollInf() {
        images.forEach(img => {
            if (img.hasAttribute('data-src')) {
                loadImage(img);
            }
        });
        if (loadedCount === images.length) {
            showMess('20 images loaded from 20', 'green');
            setTimeout(hideMess, 3000);
            window.removeEventListener('scroll', scrollInf);
        }
    }

    function showMess(mess, color) {
        const messEl = document.getElementById('message');
        messEl.textContent = mess;
        messEl.style.backgroundColor = color;
    }

    function hideMess(mess, color) {
        const messEl = document.getElementById('message');
        messEl.textContent = '';
        messEl.style.backgroundColor = '';
    }

    window.addEventListener('scroll', scrollInf);
    scrollInf();
}

lazyLoad();