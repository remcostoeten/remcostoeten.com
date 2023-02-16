import { createContext } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
	authReady: false,
});

export default const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// init netlify identity connection
		netlifyIdentity.init();
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};