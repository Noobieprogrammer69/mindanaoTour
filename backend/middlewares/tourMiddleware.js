const Tour = require('../models/tourModel'); // Adjust the path as needed

const tourMiddleware = async (req, res, next, id) => {
    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        req.tour = tour; // Attach the tour to the request object
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = tourMiddleware;