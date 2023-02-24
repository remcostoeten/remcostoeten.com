'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
	sliceStartAtom,
	sliceEndAtom,
	currentPageAtom,
} from '../storage/atoms';
import { useAtom } from 'jotai';

export default function BlogPostList({ posts }) {
	// using the global state from Jotai for setting our slice values
	const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
	const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
	const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

	// the number that is added to the states specifies how many posts are displayed per page
	const nextPage = () => {
		setCurrentSliceStart(currentSliceStart + 4);
		setCurrentSliceEnd(currentSliceEnd + 4);
		setCurrentPage(currentPage + 1);
	};

	const previousPage = () => {
		setCurrentSliceStart(currentSliceStart - 4);
		setCurrentSliceEnd(currentSliceEnd - 4);
		setCurrentPage(currentPage - 1);
	};

	return (
		<>
			<div>
				{posts
					.slice(currentSliceStart, currentSliceEnd)
					.map((posts) => (
						<div key={posts.id}>
							<Link href={`/blog/${posts.id}`}>
								<h1>{posts.postTitle}</h1>
								<p>{posts.previewText}</p>
							</Link>
						</div>
					))}
			</div>
			{currentSliceStart >= 4 && (
				<button onClick={previousPage}>previous</button>
			)}
			{currentSliceEnd < posts.items.length && (
				<button onClick={nextPage}>next</button>
			)}
		</>
	);
}
