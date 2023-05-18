import React, { useRef, useState, useEffect } from 'react';
import { auth } from '@/utils/firebase'; // Make sure this path is correct
import ExpenseCategories from '@/components/expenses/ExpenseCategories';
import ExpenseList from '@/components/expenses/ExpenseList';
import AddExpense from '@/components/expenses/AddExpense';
import MaxBudget from '@/components/expenses/MaxBudget';
import Login from '@/components/ui-elements/buttons/Login';

const Home = () => {
  const expenseListRef = useRef(null);
  const [user, setUser] = useState(null);

  const handleSelectCategory = (category) => {
    expenseListRef.current.handleSelectCategory(category);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <main className="p-4 text-offWhite">
        <Login />
        <MaxBudget user={user} />
        <ExpenseCategories onSelectCategory={handleSelectCategory} />
        <ExpenseList ref={expenseListRef} user={user} />
        <AddExpense user={user} />
      </main>
    </div>
  );
};

export default Home;
