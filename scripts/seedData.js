const sequelize = require('../config/database');
const Item = require('../models/Item');

const seedData = [
    {
        name: 'Milk',
        quantity: 2,
        category: 'Dairy',
        expirationDate: new Date('2024-04-15')
    },
    {
        name: 'Bread',
        quantity: 3,
        category: 'Bakery',
        expirationDate: new Date('2024-04-10')
    },
    {
        name: 'Dish Soap',
        quantity: 1,
        category: 'Cleaning Supplies',
        expirationDate: new Date('2024-12-31')
    },
    {
        name: 'Toothpaste',
        quantity: 2,
        category: 'Personal Care',
        expirationDate: new Date('2025-01-15')
    },
    {
        name: 'Rice',
        quantity: 5,
        category: 'Grains',
        expirationDate: new Date('2024-12-01')
    },
    {
        name: 'Paper Towels',
        quantity: 4,
        category: 'Household',
        expirationDate: null
    },
    {
        name: 'Chicken Breast',
        quantity: 3,
        category: 'Meat',
        expirationDate: new Date('2024-04-08')
    },
    {
        name: 'Shampoo',
        quantity: 1,
        category: 'Personal Care',
        expirationDate: new Date('2025-06-30')
    }
];

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true }); // This will recreate the table
        await Item.bulkCreate(seedData);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await sequelize.close();
    }
}

seedDatabase();