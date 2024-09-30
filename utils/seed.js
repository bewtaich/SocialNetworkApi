const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const connectionDB = require('../config/connection');

const users = [
    {
      username: 'lernantino',
      email: 'lernantino@gmail.com',
    },
    {
      username: 'johnDoe',
      email: 'john.doe@example.com',
    },
  ];

  const thoughts = [
    {
      thoughtText: 'Here is a cool thought from lernantino.',
      username: 'lernantino',
    },
    {
      thoughtText: 'John Doe shares a thoughtful message.',
      username: 'johnDoe',
    },
  ];

  const seedDatabase = async () => {
    try {
      // Connect to the database
      await connectionDB();
  
      // Clear existing data
      await User.deleteMany({});
      await Thought.deleteMany({});
  
      // Insert new users
      const createdUsers = await User.insertMany(users);
      console.log('Users seeded:', createdUsers);
  
      // Insert thoughts and associate them with users
      for (const thought of thoughts) {
        const user = createdUsers.find(user => user.username === thought.username);
        if (user) {
          const createdThought = await Thought.create({
            ...thought,
            userId: user._id,
          });
          // Update user's thoughts array
          await User.findByIdAndUpdate(user._id, {
            $push: { thoughts: createdThought._id },
          });
        }
      }
  
      console.log('Thoughts seeded successfully!');
      process.exit(0); 
    } catch (err) {
      console.error('Error seeding database:', err);
      process.exit(1); 
    }
  };

  seedDatabase();