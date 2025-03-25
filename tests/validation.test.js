const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/database');
const Item = require('../models/Item');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    await Item.destroy({ where: {} });
});

describe('Validation Middleware', () => {
    describe('POST /api/items', () => {
        it('should reject item without required fields', async () => {
            const response = await request(app)
                .post('/api/items')
                .send({});
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Name and quantity are required fields');
        });

        it('should reject item with invalid name type', async () => {
            const response = await request(app)
                .post('/api/items')
                .send({
                    name: 123,
                    quantity: 5
                });
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Name must be a non-empty string');
        });

        it('should reject item with invalid quantity type', async () => {
            const response = await request(app)
                .post('/api/items')
                .send({
                    name: 'Test Item',
                    quantity: -1
                });
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Quantity must be a non-negative integer');
        });

        it('should reject item with invalid category type', async () => {
            const response = await request(app)
                .post('/api/items')
                .send({
                    name: 'Test Item',
                    quantity: 5,
                    category: ''
                });
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Category must be a non-empty string');
        });

        it('should reject item with invalid expiration date', async () => {
            const response = await request(app)
                .post('/api/items')
                .send({
                    name: 'Test Item',
                    quantity: 5,
                    expirationDate: 'invalid-date'
                });
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Expiration date must be a valid date');
        });

        it('should accept valid item data', async () => {
            const response = await request(app)
                .post('/api/items')
                .send({
                    name: 'Test Item',
                    quantity: 5,
                    category: 'Test Category',
                    expirationDate: '2024-12-31'
                });
            
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('Test Item');
            expect(response.body.quantity).toBe(5);
        });
    });
});

afterAll(async () => {
    await sequelize.close();
});