import {
	AppBar,
	Button,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						Your Logo
					</Typography>
					<IconButton color='inherit' aria-label='search'>
						<SearchIcon />
					</IconButton>
					<IconButton color='inherit' aria-label='shopping cart'>
						<ShoppingCartIcon />
					</IconButton>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
