const houseBlueprint = {
    address: '',
    date: new Date(),
    description: '',
    owner: '',
    size: 0,
    _building_speed: 0.5,
    getDaysToBuild() {
        return this.size / this._building_speed;
    }
};

function HouseBuilder(address, description, owner, size, roomCount) {
    const house = Object.create(houseBlueprint);
    house.address = address;
    house.description = description;
    house.owner = owner;
    house.size = size;
    house.roomCount = roomCount;
    return house;
}
