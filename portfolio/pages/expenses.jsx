import React from 'react';
import MaxBudget from '@/components/expense/MaxBudget';
import ExpenseCategories from '@/components/expense/ExpenseCategories';
import ExpenseList from '@/components/expense/ExpenseList';
import AddExpense from '@/components/expense/AddExpense';

const Home = () => (
  <div>
    <main className="p-4">
      <MaxBudget />
      <ExpenseCategories />
      <ExpenseList />
      <AddExpense />
    </main>
  </div>
);

export default Home;
