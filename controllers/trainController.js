const Train = require('../models/trainModel');

exports.addTrain = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;
  try {
      await Train.createTrain(name, source, destination, totalSeats);
      res.status(201).json({ message: 'Train added successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getTrainsByRoute = async (req, res) => {
    const { source, destination } = req.query;
    try {
        const trains = await Train.findTrainsByRoute(source, destination);
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};