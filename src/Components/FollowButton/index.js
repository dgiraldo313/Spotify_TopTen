import React from "react";
import SpotifySVG from "../Logo/SpotifySVG";
import Fab from "@material-ui/core/Fab/Fab";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
	follow: {
		display: 'flex',
		flexDirection: 'row',
		width: 'auto',
		height: 'auto',
		marginTop: '10px',
		margin: 'auto',
		color: '#ffffff',
	},
	icon: {
		width: '1.2em',
		height: '1.2em',
		marginRight: '10px',
	}
})

const FollowButton = ( props ) => {
	const { classes } = props
	return (
		<Fab
			variant="extended"
			size="medium"
			color="primary"
			aria-label="Follow"
			className={ classes.follow }
		>
			<SpotifySVG className={ classes.icon } bgColor="#ffffff"/>
			Follow
		</Fab>
	)
}

export default withStyles(styles)(FollowButton)