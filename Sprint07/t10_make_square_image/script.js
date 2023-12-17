const input = document.querySelector("input");

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value) {
        fetch("/upload/?url=" + input.value)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector("#image1")
                    .innerHTML = `<img src="${data.img[0]}" alt="img0">
        <img src="${data.img[1]}" alt="img1">
        <img src="${data.img[2]}" alt="img2">
        <img src="${data.img[3]}" alt="img3">`;
            });
    }
});
