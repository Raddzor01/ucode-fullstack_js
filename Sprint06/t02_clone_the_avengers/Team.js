const {Avenger} = require('./Avenger')

class Team {
    constructor(id, avengers) {
        this.id = id;
        this.avengers = avengers;
    }

    battle(damage) {
        this.avengers = this.avengers.filter(hero => {
            hero.hp -= damage.damage;
            return hero.hp > 0;
        });
    }

    calculateLosses(clonedTeam) {
        const lostCount = clonedTeam.avengers.length - this.avengers.length;

        if (lostCount === 0)
            console.log(`We haven't lost anyone in this battle!`);
        else
            console.log(`In this battle we lost ${lostCount} Avengers.`);
    }

    clone() {
        const newAvengers = this.avengers.map((hero) => ({...hero}));
        return new Team(this.id, newAvengers);
    }

}

module.exports = {
    Team: Team
}