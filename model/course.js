const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    instructorName: { type: String }, // denormalised for display speed
    date: { type: Date, required: true },
    startTime: { type: String },
    endTime: { type: String },
    duration: { type: String },
  },
  { timestamps: true },
);  

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    description: { type: String, default: "" },
    image: { type: String, default: "" }, 
    lectures: [lectureSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
