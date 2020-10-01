const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const BillingCodeSchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        //required: true
    },
});

module.exports = BillingCode = mongoose.model("billingcodes", BillingCodeSchema);