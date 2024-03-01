const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      minlength: [2, "Client name must be at least 2 characters long"],
    },
    phone1: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    phone2: {
      type: Number,
      default: null,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      minlength: [3, "State must be at least 3 characters long"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      minlength: [3, "City must be at least 3 characters long"],
    },
    instDate: {
      type: Date,
      default: Date.now,
    },
    maintDate: {
      type: Date,
      default: Date.now,
    },
    instPrice: {
      type: Number,
    },
    maintPrice: {
      type: Number,
    },
    tds: {
      type: Number,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
    installed: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isWaiting: {
      type: Boolean,
      default: false,
    },
    withPump: {
      type: Boolean,
      default: false,
    },
    pump: {
      type: Boolean,
      default: false,
    },
    van: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Boolean,
      default: false,
    },
    charger: {
      type: Boolean,
      default: false,
    },
    bp: {
      type: Boolean,
      default: false,
    },
    hp: {
      type: Boolean,
      default: false,
    },
    shut: {
      type: Boolean,
      default: false,
    },
    valve: {
      type: Boolean,
      default: false,
    },
    tank: {
      type: Boolean,
      default: false,
    },
    faucet: {
      type: Boolean,
      default: false,
    },
    t33: {
      type: Boolean,
      default: false,
    },
    membrane: {
      type: Boolean,
      default: false,
    },
    mark: {
      type: String,
      required: [true, "Mark is required"],
      enum: ["ProfinePlus", "Aqualine", "Others"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
