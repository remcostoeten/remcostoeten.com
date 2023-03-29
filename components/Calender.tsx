// src/components/Calendar.tsx (update the imports)
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addEvent, getEvents } from '@/utils/firebase';

const CustomCalendar: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [eventName, setEventName] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [events, setEvents] = useState<any[]>([]);
	const [displayEvent, setDisplayEvent] = useState<any>(null);

	useEffect(() => {
		const unsubscribe = getEvents((fetchedEvents: any[]) => {
			setEvents(fetchedEvents);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedDate) {
			alert('Please select a date');
			return;
		}

		await addEvent(selectedDate, eventName, eventDescription);

		setEventName('');
		setEventDescription('');
		alert('Event added successfully');
	};

	const tileContent = ({ date }: { date: Date }) => {
		const eventOnDate = events.find((event) => {
			const eventDate = new Date(event.date);
			return (
				eventDate.getFullYear() === date.getFullYear() &&
				eventDate.getMonth() === date.getMonth() &&
				eventDate.getDate() === date.getDate()
			);
		});

		if (eventOnDate) {
			return <div className='event-bullet'>•</div>;
		}
		return null;
	};

	const handleDateClick = (date: Date | null) => {
		setSelectedDate(date);

		const eventOnDate = events.find((event) => {
			const eventDate = new Date(event.date);
			return (
				eventDate.getFullYear() === date?.getFullYear() &&
				eventDate.getMonth() === date?.getMonth() &&
				eventDate.getDate() === date?.getDate()
			);
		});

		setDisplayEvent(eventOnDate);
	};

	return (
		<div>
			<Calendar
				value={selectedDate}
				onClickDay={handleDateClick}
				tileContent={tileContent}
			/>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={eventName}
					onChange={(e) => setEventName(e.target.value)}
					placeholder='Event name'
					required
				/>
				<input
					type='text'
					value={eventDescription}
					onChange={(e) => setEventDescription(e.target.value)}
					placeholder='Event description'
					required
				/>
				<button type='submit'>Add Event</button>
			</form>
			{displayEvent && (
				<div>
					<h3>
						{new Date(displayEvent.date).toLocaleDateString()}:{' '}
						{displayEvent.name}
					</h3>
					<p>{displayEvent.description}</p>
				</div>
			)}
			<style jsx>{`
				.event-bullet {
					position: relative;
					top: -20px;
					left: 10px;
					font-size: 1.2em;
					line-height: 0.8;
					color: red;
				}
			`}</style>
		</div>
	);
};

export default CustomCalendar;
