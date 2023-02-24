Chats.getCustomInitialProps = async ({ agility, languageCode }) => {
	const api = agility;

	try {
		const chats = await api.getContentList({
			referenceName: 'contacts',
			languageCode,
			take: 4,
			sort: 'properties.itemOrder',
			direction: api.types.SortDirections.ASC,
		});

		return {
			contacts: chats.items,
			totalCount: chats.totalCount,
		};
	} catch (err) {
		console.log(err);
	}
};
