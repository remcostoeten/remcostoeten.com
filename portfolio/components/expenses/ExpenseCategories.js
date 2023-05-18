import React from 'react';

const ExpenseCategories = () => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Select Expense Category</h2>
    <div className="flex items-center space-x-4">
      <button className="bg-blue-600 text-white p-2 rounded">Food</button>
      <button className="bg-blue-600 text-white p-2 rounded">Transportation</button>
      <button className="bg-blue-600 text-white p-2 rounded">Entertainment</button>
    </div>
  </section>
);

export default ExpenseCategories;
