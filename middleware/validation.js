const validateItem = (req, res, next) => {
    const { name, quantity, category, expirationDate } = req.body;

    // Validate required fields
    if (!name || !quantity) {
        return res.status(400).json({
            message: 'Name and quantity are required fields'
        });
    }

    // Validate data types
    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
            message: 'Name must be a non-empty string'
        });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            message: 'Quantity must be a non-negative integer'
        });
    }

    // Validate optional fields
    if (category !== undefined && (typeof category !== 'string' || category.trim().length === 0)) {
        return res.status(400).json({
            message: 'Category must be a non-empty string'
        });
    }

    if (expirationDate) {
        const date = new Date(expirationDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({
                message: 'Expiration date must be a valid date'
            });
        }
    }

    next();
};

module.exports = { validateItem };