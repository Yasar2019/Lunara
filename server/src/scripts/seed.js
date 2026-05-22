require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');

const profiles = [
  {
    name: 'Ariana',
    email: 'ariana@example.com',
    age: 27,
    gender: 'female',
    interestedIn: 'male',
    bio: 'Traveler, coffee lover, and always up for deep conversations.',
    location: 'New York',
    photos: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500'],
    interests: ['travel', 'coffee', 'reading'],
    relationshipGoal: 'Serious relationship',
    vibeTags: ['Travel buddy', 'Deep conversations', 'Coffee dates'],
    prompts: [{ question: 'Perfect Sunday?', answer: 'Brunch then a museum walk.' }],
    verified: true,
    isAdultConfirmed: true,
  },
  {
    name: 'Leo',
    email: 'leo@example.com',
    age: 30,
    gender: 'male',
    interestedIn: 'female',
    bio: 'Gym mornings, startup evenings, gamer nights.',
    location: 'San Francisco',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500'],
    interests: ['gym', 'gaming', 'entrepreneurship'],
    relationshipGoal: 'Casual dating',
    vibeTags: ['Gym partner', 'Gamer', 'Entrepreneur'],
    prompts: [{ question: 'Dream destination?', answer: 'Japan for food and tech.' }],
    verified: false,
    isAdultConfirmed: true,
  },
];

const run = async () => {
  await connectDB();
  await User.deleteMany({});

  const hashedProfiles = await Promise.all(
    profiles.map(async (profile) => ({
      ...profile,
      password: await bcrypt.hash('Password123!', 10),
    }))
  );

  await User.insertMany(hashedProfiles);
  console.log('Seeded users');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
