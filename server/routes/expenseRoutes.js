const express = require('express');
const router = express.Router();
const { 
  getExpenses, 
  addExpense, 
  deleteExpense 
} = require('../controllers/expenseController');

// Placeholder for auth middleware (to be added later)
// const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getExpenses)
  .post(addExpense);

router.route('/:id')
  .delete(deleteExpense);

module.exports = router;
