const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends:[
    {
        type:Schema.Types.ObjectId,
        ref:'User',
    }
  ],
},
  {
    toJSON: {
        virtuals:true,
    },
    id:false,
});
module.exports = User;
