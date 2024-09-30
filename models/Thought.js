const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    userName: {
        type: String,
        required: true,
    }
  }  
);

const Thought = model('thought', thoughtSchema);

module.exports=Thought;