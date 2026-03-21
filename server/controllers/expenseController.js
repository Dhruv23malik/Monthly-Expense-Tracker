const Expense = require('../models/Expense');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public (temporarily)
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Public (temporarily)
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date: date || Date.now()
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public (temporarily)
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // await expense.remove() is deprecated in newer mongoose versions, use deleteOne()
    await expense.deleteOne();
    
    res.status(200).json({ id: req.params.id, message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
};
