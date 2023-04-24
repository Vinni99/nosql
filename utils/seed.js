const connection = require('../config/connection');
const { User  } = require('../models');
const userSeeds = require('./userData.js');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to MongoDB!');

    await User.deleteMany({});
    await User.collection.insertMany(userSeeds);

    console.log('User data seeded!');
    console.log('Seeding complete!');
});