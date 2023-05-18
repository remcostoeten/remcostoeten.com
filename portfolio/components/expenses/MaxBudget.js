import React from 'react';

const MaxBudget = () => (
  <section className="my-8">
    <h2 className="text-xl font-semibold mb-4">Set your Budget</h2>
    <form className="flex items-center space-x-4">
      <input type="number" placeholder="Amount" className="border border-gray-300 p-2 w-1/2" />
      <select className="border border-gray-300 p-2">
        <option>Weekly</option>
        <option>Monthly</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Set Budget</button>
    </form>
  </section>
);

export default MaxBudget;
