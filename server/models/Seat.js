class Seat {
    constructor(id, showId, seatNumber, isReserved = false) {
        this.id = id;
        this.showId = showId;
        this.seatNumber = seatNumber;
        this.isReserved = isReserved;
    }
}

module.exports = Seat;
