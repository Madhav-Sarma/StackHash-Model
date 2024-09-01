class Booking {
    constructor(id, userId, showId, seatIds) {
        this.id = id;
        this.userId = userId;
        this.showId = showId;
        this.seatIds = seatIds; // Array of seat IDs
    }
}

module.exports = Booking;
