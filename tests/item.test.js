const request = require('supertest');
const express = require('express');
const app = require('../server');
const sequelize = require('../config/database');
const Item = require('../models/Item');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    await Item.destroy({ where: {} });
});

describe('Item API', () => {
    const testItem = {
        name: 'Test Item',
        quantity: 10,
        category: 'Test Category',
        expirationDate: new Date('2024-12-31')
    };

    describe('POST /api/items', () => {
        it('should create a new item', async () => {
            const response = await request(app)
                .post('/api/items')
                .send(testItem);
            
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(testItem.name);
            expect(response.body.quantity).toBe(testItem.quantity);
        });
    });

    describe('GET /api/items', () => {
        it('should return all items', async () => {
            await Item.create(testItem);
            
            const response = await request(app)
                .get('/api/items');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBe(1);
        });
    });

    describe('GET /api/items/:id', () => {
        it('should return a single item', async () => {
            const item = await Item.create(testItem);
            
            const response = await request(app)
                .get(`/api/items/${item.id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(testItem.name);
        });
    });

    describe('PUT /api/items/:id', () => {
        it('should update an item', async () => {
            const item = await Item.create(testItem);
            const updatedData = { ...testItem, name: 'Updated Item' };
            
            const response = await request(app)
                .put(`/api/items/${item.id}`)
                .send(updatedData);
            
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updatedData.name);
        });
    });

    describe('DELETE /api/items/:id', () => {
        it('should delete an item', async () => {
            const item = await Item.create(testItem);
            
            const response = await request(app)
                .delete(`/api/items/${item.id}`);
            
            expect(response.status).toBe(204);
            
            const deletedItem = await Item.findByPk(item.id);
            expect(deletedItem).toBeNull();
        });
    });
});

afterAll(async () => {
    await sequelize.close();
});