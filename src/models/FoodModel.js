const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema(
  {
    name: { type: String, index: true },
    title: { type: String, required: true },
    description: [
      { type: Object }
    ],
    image: [{
      url: String,
      type: {
        type: String,
        enum: ["banner", "photos"]
      }
    }],
  },
  {
    timestamps: true,
  }
);

const food = mongoose.model("Food", foodSchema);
module.exports = food;
