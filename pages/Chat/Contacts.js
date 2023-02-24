Contacts.getCustomInitialProps = async ({ agility, languageCode }) => {
	const api = agility;

	try {
		const contacts = await api.getContentList({
			referenceName: 'contacts',
			languageCode,
			take: 4,
			sort: 'properties.itemOrder',
			direction: api.types.SortDirections.ASC,
		});

		return {
			contacts: contacts.items,
			totalCount: contacts.totalCount,
		};
	} catch (err) {
		console.log(err);
	}
};
