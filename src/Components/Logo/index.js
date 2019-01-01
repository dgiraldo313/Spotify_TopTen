import React from 'react'

import SpotifySVG from './SpotifySVG'
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";


const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '5px',
		marginBottom: '20px',
		transition: 'all .1s .2s linear',

	},
	logoIcon: {
		width: '5em',
		height: '5em',
		marginRight: '15px'
	},
	logoText: {
		fontSize: '4em',
		fontWeight: '700',
	},
	indentedContainer: {
		margin: '0px',
	},
	indentedIcon: {
		width: '3em',
		height: '3em',
		marginRight: '15px'
	},
	indentedText: {
		width: '0px',
		overflow: 'hidden',
		[theme.breakpoints.up(640)]: {
			width: 'auto',
			fontSize: '2em'
		}
	}

})


const Logo = ( props ) => {
	const { classes, indented } = props
	const containerStyles = indented ?
													[ classes.container, classes.indentedContainer ]
													: [ classes.container ]
	const logoStyles = indented ?
											[ classes.logoIcon, classes.indentedIcon ]
											: [ classes.logoIcon ]
	const textStyles = indented ?
											[ classes.logoText, classes.indentedText ]
											: [ classes.logoText ]
	return (
		<div className={ containerStyles.join(' ') }>
			<SpotifySVG className={ logoStyles.join(' ') } bgColor="#1DB954"/>
			<Typography variant="h1"
			            component="h1"
			            className={ textStyles.join(' ') }
			>
				TopTen
			</Typography>
		</div>

	)
}


export default withStyles(styles)(Logo)