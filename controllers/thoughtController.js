const { Thought, User } = require("../models");

const getAllThoughts = async (req,res)=>{
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err)
    }
}

const getThoughtById = async (req,res)=>{
    try{
        const thought = await Thought.findById(req.params.id);
        if(!thought){
            return res.status(404).json({message: 'No thought found with this ID'})
        }
       res.json(thought); 
    } catch (err) {
        res.status(500).json(err)
    }
}

const createThought = async (req,res) => {
    try{
        const thought = await Thought.create(req.body);

        await User.findByIdAndUpdate(req.body.userId,
            {$push:{thoughts:thought._id}},
            {new:true}
        );

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
