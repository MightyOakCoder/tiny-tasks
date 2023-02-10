require('dotenv').config();
require('./config/database');

const AgeRange = require('./models/ageRange');
const Task = require('./models/task');

// IIFE - Immediately Invoked Function Expression
(async function() {

  await AgeRange.deleteMany({});
  const ageRanges = await AgeRange.create([
    {name: '2+', sortOrder: 10},
    {name: '4+', sortOrder: 20},
    {name: '6+', sortOrder: 30},
    {name: '8+', sortOrder: 40},
    {name: '10+', sortOrder: 50},
    {name: '12+', sortOrder: 60},    
  ]);

  await Itask.deleteMany({});
  const tasks = await Task.create([
    {name: 'Put Toys Away', ageRange: ageRanges[0], points: 2},
    {name: 'Stack/Put Away Books', ageRange: ageRanges[0], points: 2},
    {name: 'Put Trash in Garbage and ReCycling', ageRange: ageRanges[0], points: 2},
    {name: 'Wipe Up Spills', ageRange: ageRanges[0], points: 2},
    {name: 'Help Get Clothes From Dryer', ageRange: ageRanges[0], points: 2},
    {name: 'Tidy Up Their Room', ageRange: ageRanges[1], points: 2},
    {name: 'Set Table', ageRange: ageRanges[1], points: 2},
    {name: 'Sort Laundry By Family Member', ageRange: ageRanges[1], points: 2},
    {name: 'Bring Stuff In From Car', ageRange: ageRanges[1], points: 2},
    {name: 'Use A HAnd-Held Vacuum', ageRange: ageRanges[1], points: 2},
  ]);

  console.log(tasks)

  process.exit();

})();