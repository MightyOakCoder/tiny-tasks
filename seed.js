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
    {task: 'Put Toys Away', ageRange: ageRanges[0], points: 2},
    {task: 'Stack/Put Away Books', ageRange: ageRanges[0], points: 2},
    {task: 'Put Trash in Garbage and ReCycling', ageRange: ageRanges[0], points: 2},
    {task: 'Wipe Up Spills', ageRange: ageRanges[0], points: 2},
    {task: 'Help Get Clothes From Dryer', ageRange: ageRanges[0], points: 2},
    {task: 'Tidy Up Their Room', ageRange: ageRanges[1], points: 2},
    {task: 'Set Table', ageRange: ageRanges[1], points: 2},
    {task: 'Sort Laundry By Family Member', ageRange: ageRanges[1], points: 2},
    {task: 'Bring Stuff In From Car', ageRange: ageRanges[1], points: 2},
    {task: 'Use A HAnd-Held Vacuum', ageRange: ageRanges[1], points: 2},
  ]);

  console.log(tasks)

  process.exit();

})();