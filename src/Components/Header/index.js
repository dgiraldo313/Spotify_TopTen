import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Logo from "../Logo";
import SearchBar from "../SearchBar";

const styles = theme => ({
	header: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxWidth: '1080px',
		padding: '10px 20px',
		margin: 'auto',
		transition: 'height .2s linear',
	},
	regular: {
		transform: 'translateY(25vh)',
		height: 'calc(100vh - 25vh)',
	},
	indent: {
		height: '120px',
		flexDirection: 'row',
	}
})

const Header = ( props ) => {
	const { classes, selected } = props
	const headerStyles = selected ?
												[ classes.header, classes.indent] :
												[ classes.header, classes.regular ];

	return (
		<header className={ headerStyles.join(' ') } >
			<Logo indented={ selected }/>
			<SearchBar indented={ selected } />
		</header>
	)
}

export default withStyles(styles)(Header)