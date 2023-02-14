require('dotenv').config();
require('./config/database');

const ageRange = require('./models/ageRange');
const Task = require('./models/task');

// IIFE - Immediately Invoked Function Expression
(async function() {

  await ageRange.deleteMany({});
  const ageRanges = await ageRange.create([
    {age: '2+', sortOrder: 10},
    {age: '4+', sortOrder: 20},
    {age: '6+', sortOrder: 30},
    {age: '8+', sortOrder: 40},
    {age: '10+', sortOrder: 50},
    {age: '12+', sortOrder: 60},    
  ]);

  await Task.deleteMany({});
  const tasks = await Task.create([
    {chore: 'Put Toys Away', ageRange: ageRanges[0], points: 2},
    {chore: 'Stack/Put Away Books', ageRange: ageRanges[0], points: 2},
    {chore: 'Put Trash in Garbage and ReCycling', ageRange: ageRanges[0], points: 2},
    {chore: 'Wipe Up Spills', ageRange: ageRanges[0], points: 2},
    {chore: 'Help Get Clothes From Dryer', ageRange: ageRanges[0], points: 2},
    {chore: 'Tidy Up Their Room', ageRange: ageRanges[1], points: 2},
    {chore: 'Set Table', ageRange: ageRanges[1], points: 2},
    {chore: 'Sort Laundry By Family Member', ageRange: ageRanges[1], points: 2},
    {chore: 'Bring Stuff In From Car', ageRange: ageRanges[1], points: 2},
    {chore: 'Use A HAnd-Held Vacuum', ageRange: ageRanges[1], points: 2},
  ]);

  console.log(tasks)

  process.exit();

})();