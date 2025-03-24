const Item = require('../models/Item');

class ItemService {
    async getAllItems() {
        return await Item.findAll();
    }

    async getItemById(id) {
        return await Item.findByPk(id);
    }

    async createItem(itemData) {
        return await Item.create(itemData);
    }

    async updateItem(id, itemData) {
        const item = await Item.findByPk(id);
        if (!item) return null;
        return await item.update(itemData);
    }

    async deleteItem(id) {
        const item = await Item.findByPk(id);
        if (!item) return false;
        await item.destroy();
        return true;
    }
}

module.exports = new ItemService();