const express = require('express');
const app = express();
const sequelize = require('./config/database');
const itemService = require('./services/itemService');

module.exports = app;

// Middleware for parsing JSON bodies
app.use(express.json());

// Initialize database
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Error synchronizing database:', err);
});

// GET all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await itemService.getAllItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
});

// GET single item by ID
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await itemService.getItemById(parseInt(req.params.id));
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error: error.message });
    }
});

// POST new item
app.post('/api/items', async (req, res) => {
    try {
        if (!req.body.name || !req.body.quantity) {
            return res.status(400).json({ message: 'Name and quantity are required' });
        }

        const item = await itemService.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
});

// PUT update item
app.put('/api/items/:id', async (req, res) => {
    try {
        const updatedItem = await itemService.updateItem(parseInt(req.params.id), req.body);
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
});

// DELETE item
app.delete('/api/items/:id', async (req, res) => {
    try {
        const success = await itemService.deleteItem(parseInt(req.params.id));
        if (!success) return res.status(404).json({ message: 'Item not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
});

const net = require('net');

function checkPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', () => resolve(false));
        server.once('listening', () => {
            server.close();
            resolve(true);
        });
        server.listen(port);
    });
}

async function startServer(initialPort) {
    let port = initialPort;
    const maxAttempts = 10;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const isAvailable = await checkPortAvailable(port);
        if (isAvailable) {
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            }).on('error', (error) => {
                console.error('Server error:', error);
            });
            return;
        }
        console.log(`Port ${port} is in use, trying port ${port + 1}...`);
        port++;
    }
    console.error(`Could not find an available port after ${maxAttempts} attempts`);
    process.exit(1);
}

if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    startServer(PORT);
}