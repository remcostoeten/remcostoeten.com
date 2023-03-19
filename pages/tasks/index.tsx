import React, { useEffect, useState } from 'react';
import { db, auth } from '@/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import Header from '@/components/header/Header';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Task = {
    id: string;
    title: string;
    description: string;
    category: string;
};

export default function Index() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

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
        auth.onAuthStateChanged((user) => {
            setIsLoggedIn(Boolean(user));
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, `tasks-${auth.currentUser?.uid}`),
            (snapshot) => {
                return setTasks(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            }
        );
        return () => unsubscribe();
    }, [auth.currentUser]);

    const addTask = async (title: string, description: string, category: string) => {
        const docRef = await addDoc(collection(db, `tasks-${auth.currentUser?.uid}`), {
            title,
            description,
            category,
        });
        const newTask = { id: docRef.id, title, description, category };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };
    const removeTask = async (taskId: string) => {
        try {
            const taskRef = doc(db, `tasks-${auth.currentUser?.uid}/${taskId}`);
            await deleteDoc(taskRef);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            toast.success('Task removed successfully');
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };


    const updateTask = async (taskId: string, newTaskData: Partial<Task>) => {
        await updateDoc(doc(db, `tasks-${auth.currentUser?.uid}`, taskId), newTaskData);
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, ...newTaskData };
                }
                return task;
            })
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = e.currentTarget.title.value;
        const description = e.currentTarget.description.value;
        const category = e.currentTarget.category.value;
        addTask(title, description, category);
        e.currentTarget.reset();
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items);
    };

    return (
        <>
            <Header />
            <div className="container todo">
                <div className="todo__intro">
                    {isLoggedIn ? (
                        <div className="text">
                            <h1>Welcome back, {auth.currentUser?.displayName}!</h1>
                            <p>
                                You've got {tasks.length} task(s) left. But no pressure, I won't judge you slacking.
                            </p>
                            <div className="tasks">
  <ToastContainer autoClose={false} />
                                {tasks.map((task, index) => (
                                    <div className="tasks__task" key={task.id}>
                                        <h2 className="title">{task.title}</h2>
                                        <p className="description">{task.description}</p>
                                        <span className="category">{task.category}</span>
                                        <button onClick={() => removeTask(task.id)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="authenticate-please">
                            <h2>In order to use the to-do app you need to be logged in.</h2>
                        </div>
                    )}
                </div>
                <div className="todo__task-section">
                    <form onSubmit={handleSubmit} className="todo__add">
                        <label>
                            Title:
                            <input type="text" name="title" required />
                        </label>
                        <label>
                            Description:
                            <textarea name="description" required />
                        </label>
                        <label>
                            Category:
                            <input type="text" name="category" required />
                        </label>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            </div>
           </>
    );

}
