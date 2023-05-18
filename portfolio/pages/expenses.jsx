import React, { useState, useEffect } from 'react';
import { auth } from '@/utils/firebase';
import ExpenseCategories from '@/components/expenses/ExpenseCategories';
import ExpenseList from '@/components/expenses/ExpenseList';
import AddExpense from '@/components/expenses/AddExpense';
import MaxBudget from '@/components/expenses/MaxBudget';
import Login from '@/components/ui-elements/buttons/Login';

const Home = () => {
	const [user, setUser] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			console.log(firebaseUser);
			setUser(firebaseUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handleSelectCategory = (category) => {
		setSelectedCategory(category);
	};

	return (
		<main className="p-4 text-offWhite">
			{!user ? (
				<Login />
			) : (
				<>
					<MaxBudget user={user} />
					<ExpenseCategories
						onSelectCategory={handleSelectCategory}
					/>
					<ExpenseList
						user={user}
						selectedCategory={selectedCategory}
					/>
					<AddExpense user={user} />
				</>
			)}
		</main>
	);
};

export default Home;
