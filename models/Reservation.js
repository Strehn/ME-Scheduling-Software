const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//  Reservation Schema
const ReservationSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    start: {
        type: String,  //format: 'YYYY-MM-DD HH:MM:SS'
        //type: Date,
        required: true
    },
    end: {
        type: String,  
        //type: Date,
        required: true
    },
    resourceId: {
        type: Number,
        // type: Schema.Types.ObjectId,
        // ref: "machines",
        required: true
    },
    machine: {
        type: Schema.Types.ObjectId,
        ref: "machines",
        //required: true
    },
    title: {
        type: String,
        default: 'Busy'
    },
    bgColor: {
        type: String,
        default: '#c41d1d'
    },
    billingCode: {
        type: Schema.Types.ObjectId,
        ref: "billingcodes",
        required: true
    },
    grad: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
});

module.exports = Task = mongoose.model("reservations", ReservationSchema);