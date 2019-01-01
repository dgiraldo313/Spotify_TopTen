import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	controls: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		padding: '10px'
	},
	playIcon: {
		border: '1px solid #fff'
	},
	player: {
		width: '0!important',
		height: '0!important',
		position: 'absolute'
	}
})

class Player extends Component {

	constructor( props ) {
		super(props)

		this.state = {
			isPlaying: false
		}

		this.togglePlay = this.togglePlay.bind(this)
	}

	togglePlay() {
		this.setState( ( prevState ) => {
			return({
				isPlaying: !prevState.isPlaying
			})
		})
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.controls}>
				<Tooltip title="Preview Only" placement="right">
					<IconButton aria-label={ this.state.isPlaying ? "Pause" : "Play" }
					            className={ classes.playIcon }
											onClick={ this.togglePlay }
					>
						{
							this.state.isPlaying ?
								<PauseIcon/>
								: <PlayArrowIcon />
						}
					</IconButton>
				</Tooltip>
				<ReactPlayer url={ this.props.url }
				             config={ { file: { forceAudio: true } } }
				             playing={ this.state.isPlaying }
				             className={ classes.player }

				/>
			</div>
		)
	}
}




export default withStyles(styles)(Player)
