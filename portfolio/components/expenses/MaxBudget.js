import React, { useState, useEffect } from 'react';
import { getMaxBudget } from '@/utils/firebase';

const MaxBudget = ({ user }) => {
	const [maxBudgetState, setMaxBudgetState] = useState(null);

	useEffect(() => {
		if (user) {
			getMaxBudget(user.uid).then((budget) => {
				setMaxBudgetState(budget);
			});
		}
	}, [user]);

	return (
		<section className="my-8">
			<h2 className="text-xl font-semibold mb-4">Set your Budget</h2>
			<form className="offBlack items-center space-x-4">
				<input
					type="number"
					placeholder="Amount"
					className="border border-gray-300 text-offBlack p-2 w-1/2"
				/>
				<select className="border border-gray-300 p-2 text-offBlack">
					<option>Weekly</option>
					<option>Monthly</option>
				</select>
				<button
					type="submit"
					className="bg-blue-600 text-white p-2 rounded"
				>
					Set Budget
				</button>
			</form>
			{maxBudgetState && (
				<p className="text-xl font-semibold mt-4">
					Your current max budget: {maxBudgetState.amount} (
					{maxBudgetState.frequency})
				</p>
			)}
		</section>
	);
};

export default MaxBudget;
