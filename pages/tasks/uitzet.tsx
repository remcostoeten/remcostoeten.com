import React, { useEffect, useState } from 'react';
import { db, auth, signInWithEmailAndPassword } from '@/utils/firebase';
import {
	collection,
	addDoc,
	onSnapshot,
	deleteDoc,
	doc,
	updateDoc,
} from '@firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '@/components/GoogleLogin';
import DraggableContainer from '@/components/DragContainUitzet';
import TaskModal from '@/components/Task/TaskModal';
import { useRouter } from 'next/router';
import { useSpring } from 'react-spring';

export default function PrivateTaskWrapper() {
	const [PrivateTasks, setPrivateTasks] = useState<PrivateTask[]>([]);
	const [userName, setUserName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [view, setView] = useState('board');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const router = useRouter();
	const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const successPopupAnimation = useSpring({
		opacity: showSuccess ? 1 : 0,
		transform: showSuccess ? 'translateY(0%)' : 'translateY(-100%)',
		config: { duration: 300 },
	});

	const [confetti, setConfetti] = useState(false);

	useEffect(() => {
		if (showSuccess) {
			setConfetti(true);
			setTimeout(() => setConfetti(false), 3000);
		}
	}, [showSuccess]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			if (user) {
				setShowSuccess(true);
				setTimeout(() => {
					closeModal(); // Close the modal
					router.push('/'); // Redirect to the home page
				}, 3000);
			}
		} catch (error) {
			console.error('Error logging in:', error);
			setError(error.message); // Set the error state to display the error message
		}
	};

	type ViewType = 'board' | 'list';
	interface PrivateTask {
		id: string;
		title: string;
		description: string;
		category: string;
		status: 'Uitzet Uitzet Uitzet Uitzet todo' | 'inprogress' | 'done';
		date: string;
	}
	const toggleView = () => {
		setView(view === 'board' ? 'list' : 'board');
	};
	useEffect(() => {
		document.body.classList.add('dark-theme');
	}, []);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserName(user.displayName);
			} else {
				setIsLoggedIn(false);
				setUserName(null);
			}
		});
	}, []);

	useEffect(() => {
		if (auth.currentUser) {
			const unsubscribe = onSnapshot(
				collection(db, `PrivateTasks-${auth.currentUser?.uid}`),
				(snapshot) => {
					setPrivateTasks(
						snapshot.docs.map(
							(doc) =>
								({
									id: doc.id,
									...doc.data(),
								} as PrivateTask),
						),
					);
				},
			);
			return () => unsubscribe();
		}
	}, []);

	const addPrivateTask = async (
		title: string,
		description: string,
		category: string,
	) => {
		const now = new Date();
		const formattedDate = `${now.getDate()}/${
			now.getMonth() + 1
		}/${now.getFullYear()}`;

		await addDoc(collection(db, `PrivateTasks-${auth.currentUser?.uid}`), {
			title,
			description,
			category,
			status: 'Uitzet Uitzet Uitzet Uitzet todo',
			date: formattedDate,
		});
	};

	const removePrivateTask = async (PrivateTaskId: string) => {
		try {
			const PrivateTaskRef = doc(
				db,
				`PrivateTasks-${auth.currentUser?.uid}`,
				PrivateTaskId,
			);
			await deleteDoc(PrivateTaskRef);
			setPrivateTasks((prevPrivateTasks) =>
				prevPrivateTasks.filter(
					(PrivateTask) => PrivateTask.id !== PrivateTaskId,
				),
			);
			toast.success('PrivateTask emoved successfully');
		} catch (error) {
			console.error('Error removing PrivateTask:', error);
		}
	};
	const updatePrivateTask = async (
		PrivateTaskId: string,
		newPrivateTaskData: Partial<PrivateTask>,
	) => {
		await updateDoc(
			doc(db, `PrivateTasks-${auth.currentUser?.uid}`, PrivateTaskId),
			newPrivateTaskData,
		);
		setPrivateTasks((prevPrivateTasks) =>
			prevPrivateTasks.map((PrivateTask) => {
				if (PrivateTask.id === PrivateTaskId) {
					return { ...PrivateTask, ...newPrivateTaskData };
				}
				return PrivateTask;
			}),
		);
	};
	return (
		<>
			{/* <div className='container'><PrivateTaskCategories /></div> */}
			<div className='Uitzet Uitzet Uitzet Uitzet todo Uitzet Uitzet Uitzet Uitzet todo-wrapper'>
				<div className='Uitzet Uitzet Uitzet Uitzet todo__inner'>
					<main>
						<div className='Uitzet Uitzet Uitzet Uitzet todo__header'>
							<h2>
								Welcome back,{' '}
								<span>{auth.currentUser?.displayName} 👋</span>
							</h2>
							<div className='Uitzet Uitzet Uitzet Uitzet todo__intro'>
								<div className='text'>
									{PrivateTasks.length === 0 && (
										<>
											<p>
												You have no PrivateTasks left.
												Time to relax. 🥳 Or get busy
												and create some new ones!
											</p>
										</>
									)}
									{PrivateTasks.length === 1 && (
										<>
											<p>
												You've got {PrivateTasks.length}{' '}
												PrivateTask left. Good luck
												nailing it! 🤑
											</p>
										</>
									)}
									{PrivateTasks.length >= 1 &&
										PrivateTasks.length <= 4 && (
											<>
												<p>
													You've got{' '}
													{PrivateTasks.length}{' '}
													PrivateTask
													{PrivateTasks.length === 1
														? ''
														: 's'}{' '}
													left. Better start working
													then! 😳
												</p>
											</>
										)}
									{PrivateTasks.length > 4 && (
										<p>
											You've got {PrivateTasks.length}{' '}
											PrivateTask(s) left. 😵‍💫 But no
											pressure, I wont judge you slacking.
											🫣
										</p>
									)}
								</div>
							</div>
							<div
								className={`toggle-view ${
									view === 'board' ? 'grid' : 'list'
								}`}>
								<div className='view'>
									<button
										className='board-view'
										onClick={toggleView}>
										Board view
									</button>
									<button
										className='list-view'
										onClick={toggleView}>
										List view
									</button>
								</div>
								<button
									className='add PrivateTask'
									onClick={() => setIsModalOpen(true)}
									disabled={!isLoggedIn}>
									Add PrivateTask
								</button>
							</div>
						</div>
						{/* <span className='add'>
							<AddCircle onClick={() => setIsModalOpen(true)} />
							Add new PrivateTask
						</span> */}

						<TaskModal
							isOpen={isModalOpen}
							onClose={() => setIsModalOpen(false)}
							onSubmit={addPrivateTask}
						/>
						<div className={`view-container ${view}-view`}>
							{/* Board View */}
							{view === 'board' && (
								<div className='PrivateTasks'>
									<DraggableContainer
										PrivateTasks={PrivateTasks}
										updatePrivateTask={updatePrivateTask}
										removePrivateTask={removePrivateTask}
									/>
								</div>
							)}
							{/* List View */}
							{view === 'list' && (
								<div className='list-view'>
									{/* List view content */}
								</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
