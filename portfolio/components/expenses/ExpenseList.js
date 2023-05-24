import React, { useEffect, useState } from 'react';
import { getUserExpenses } from '@/utils/firebase';

const ExpenseList = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (user) {
      getUserExpenses(user.uid).then((fetchedExpenses) => {
        setExpenses(fetchedExpenses);
      });
    }
  }, [user]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Expense List</h2>
      <div>
        {filteredExpenses.map((expense) => (
          <div key={expense.id} className="bg-gray-200 p-4 rounded my-2 flex justify-between">
            <div className='text-offBlack'>
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
};

export default ExpenseList;
