import React from 'react';

const AddExpense = () => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
    <form className="flex flex-col space-y-4">
      <input type="text" placeholder="Expense Name" className="border border-gray-300 p-2" />
      <input type="number" placeholder="Amount" className="border border-gray-300 p-2" />
      <select className="border border-gray-300 p-2">
        <option>Food</option>
        <option>Transportation</option>
        <option>Entertainment</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Expense</button>
    </form>
  </section>
);

export default AddExpense;
