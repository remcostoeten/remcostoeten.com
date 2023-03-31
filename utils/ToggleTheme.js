export const toggleTheme = () => {
	if (document.body.classList.contains('theme-white')) {
		document.body.classList.remove('theme-white');
		document.body.classList.add('theme-dark');
	} else {
		document.body.classList.remove('theme-dark');
		document.body.classList.add('theme-white');
	}
};

export const signIn = (signIn, setIsLoggedIn) => {
	signIn(); // roept de signIn functie aan vanuit de LoginLogic module
	setIsLoggedIn(true); // update de isLoggedIn variabele
};
