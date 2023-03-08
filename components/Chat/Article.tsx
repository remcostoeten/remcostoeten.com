import React, { useState } from 'react';

const FeatureStory = () => {
	const [showFullStory, setShowFullStory] = useState(false);
	const story =
		'On WhatsApp there\'s the possibility to export your chats which generates a plain .txt. I converted the txt to JSON objects (some chats had almost up to a million lines).<br> Once converted to JSON I fetched the data, mapped over it and displayed it here. Besides that, I\'ve added a search through the map functionality. Initially, it was a filter functionality, but I much prefer a jump to toggle like this.<Br> Also had to come up with a solution for mobile since there\'s little space and flex-direction row wouldn\'t work so I\'ve made it that the search is toggleable in an off-canvas menu. It used to be 35% width 100%height and absolute but due to the toggleable anchors I had to make it sticky, not the pretiest regarding relative styling but it\'ll do. You can find the code for the search component <a href="https://github.com/remcostoeten/remcostoeten.com/blob/develop/components/ChatSearch.tsx" target="_blank">here</a> and <a href="https://github.com/remcostoeten/remcostoeten.com/blob/develop/pages/whatsapp-export/index.tsx" target="_blank">here</a>.';

	const truncatedStory = story.slice(0, 150) + '...';

	return (
		<>
			<article className='contained'>
				<p
					dangerouslySetInnerHTML={{
						__html: showFullStory ? story : truncatedStory,
					}}
				/>
				{!showFullStory && story.length > 150 && (
					<span onClick={() => setShowFullStory(true)}>
						Show More
					</span>
				)}
				{showFullStory && story.length > 150 && (
					<span onClick={() => setShowFullStory(false)}>
						Show less
					</span>
				)}
			</article>
		</>
	);
};

export default FeatureStory;
