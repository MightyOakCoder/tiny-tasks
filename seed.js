require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Task = require('./models/task');

// IIFE - Immediately Invoked Function Expression
(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {age: '2+', sortOrder: 10},
    {age: '4+', sortOrder: 20},
    {age: '6+', sortOrder: 30},
    {age: '8+', sortOrder: 40},
    {age: '10+', sortOrder: 50},
    {age: '12+', sortOrder: 60},    
  ]);

  await Task.deleteMany({});
  const tasks = await Task.create([
    {chore: 'Put Toys Away', category: categories[0], points: 1},
    {chore: 'Stack/Put Away Books', category: categories[0], points: 1},
    {chore: 'Put Trash in Garbage and Recycling', category: categories[0], points: 2},
    {chore: 'Wipe Up Spills', category: categories[0], points: 3},
    {chore: 'Help Get Clothes From Dryer', category: categories[0], points: 3},
    {chore: 'Tidy Up Their Room', category: categories[1], points: 1},
    {chore: 'Bring Stuff In From Car', category: categories[1], points: 2},
    {chore: 'Use A Hand-Held Vacuum', category: categories[1], points: 2},
    {chore: 'Sort Laundry By Family Member', category: categories[1], points: 3},
    {chore: 'Set Table', category: categories[1], points: 3},
  ]);

  console.log(tasks)

  process.exit();

})();