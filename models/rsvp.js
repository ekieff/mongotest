const mongoose = require('mongoose')

//attendees

//rsvp

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String
})


const rsvpSchema = new mongoose.Schema({
    event: String,
    mealOption: [{
        proteinType: String,
        allergy: Boolean,
        allergyType: String
    }],
    plusOne: Boolean,
    hotelReservation: Boolean,
    guest: [attendeeSchema]
})

module.exports = mongoose.model('RSVP', rsvpSchema)

