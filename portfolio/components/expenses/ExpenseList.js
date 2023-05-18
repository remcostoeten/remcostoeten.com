import React from 'react';

const expenses = [
  // Dummy data; replace this with your actual data or state management
  { id: 1, name: 'Groceries', amount: 50, category: 'Food' },
  { id: 2, name: 'Bus fare', amount: 20, category: 'Transportation' },
];

const ExpenseList = () => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Expense List</h2>
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="bg-gray-200 p-4 rounded my-2 flex justify-between">
          <div>
            <p>{expense.name}</p>
            <p>{expense.amount}</p>
            <p>{expense.category}</p>
          </div>
          <button className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      ))}
    </div>
  </section>
);

export default ExpenseList;
