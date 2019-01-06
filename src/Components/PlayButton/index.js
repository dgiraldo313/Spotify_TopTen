import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

import { withStyles } from "@material-ui/core";

const styles = theme => ({
	playIcon: {
		border: '1px solid #fff'
	},
})

const PlayButton = ( props ) => {
	const { classes, isPlaying, onClick } = props
	return (
		<Tooltip title="Preview Only" placement="right">

			<IconButton aria-label={ isPlaying ? "Pause" : "Play" }
			            className={ classes.playIcon }
			            onClick={ onClick } >
				{
					isPlaying ? <PauseIcon/> : <PlayArrowIcon />
				}
			</IconButton>
		</Tooltip>
	)
}

export default withStyles(styles)(PlayButton)