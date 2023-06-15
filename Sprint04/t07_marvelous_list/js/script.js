const films = [
    {
        id: 1,
        title: "Lord of War",
        poster: "assets/images/1.jpg",
        date: "September 16, 2005",
        info: "An arms dealer confronts the morality of his work as he is being chased by an INTERPOL Agent.",
        actors: ["Nicolas Cage", "Ethan Hawke", "Jared Leto", "Bridget Moynahan"],
    },
    {
        id: 2,
        title: "No Country for Old Men",
        poster: "assets/images/2.jpg",
        date: "May 19, 2007",
        info: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
        actors: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin", "Woody Harrelson"],
    },
    {
        id: 3,
        title: "Lords of the Lockerroom",
        poster: "assets/images/3.jpeg",
        date: "1999",
        info: "Billy Herrington was taking a shower, when Nick Steel entered in lockerroom. After shower Billy started to change clothes and keeps up appearances by challenging Nick to a match. They strip down to their trunks and wrestle.",
        actors: ["Van Darkholme", "TJ Cummings", "Billy Herrington", "Mark Wolff"],
    },
]

document.addEventListener('DOMContentLoaded', () => {
    const filmButtons = document.querySelectorAll('.but');
    const posterElement = document.getElementById('poster');
    const titleElement = document.getElementById('title-f');
    const dateElement = document.getElementById('date');
    const infoElement = document.getElementById('inf');
    const actorsContainer = document.getElementById('actors');
    let selectedFilm = films[0];

    function dispFilm(film) {
        posterElement.src = selectedFilm.poster;
        titleElement.textContent = selectedFilm.title;
        dateElement.textContent = `${selectedFilm.date}`;
        infoElement.textContent = `${selectedFilm.info}`;
        actorsContainer.innerHTML = '';

        selectedFilm.actors.forEach(actor => {
            const actorElement = document.createElement('span');
            actorElement.textContent = actor;
            actorElement.classList.add('actor');
            actorsContainer.appendChild(actorElement);
        });
    }

    function actBut(button) {
        filmButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    dispFilm(selectedFilm);
    actBut(filmButtons[0]);

    filmButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filmId = button.dataset.film;
            selectedFilm = films.find(film => film.id.toString() === filmId);
            if (selectedFilm) {
                dispFilm(selectedFilm);
                actBut(button);
            }
        });
    });
});