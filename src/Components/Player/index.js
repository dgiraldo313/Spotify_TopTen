import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import PlayButton from "../PlayButton";
import { PlayerConsumer } from '../../Context'

import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
	controls: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		padding: '10px'
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
			is_playing: false
		}

		this.playerRef = this

		this.togglePlay = this.togglePlay.bind(this)
		this.pause = this.pause.bind(this)
		this.play = this.play.bind(this)
	}

	togglePlay() {
		this.setState( ( prevState ) => {
			const is_playing = !prevState.is_playing
			const properties = {
				is_track_playing : is_playing,
				player_ref : this.playerRef,
				track_info: this.props.trackInfo
			}

			// This is causing a warning because its triggering another set state
			this.playerContext.updateCurrentPlayer( { ...properties })

			// Update local state of player
			return({ is_playing })
		})
	}

	pause() {
		this.setState({
			is_playing: false
		})
	}

	play() {
		this.setState({
			is_playing: true
		})
	}


	render() {
		const { classes } = this.props
		return (
			<PlayerConsumer>
				{
					playerContext => {

						this.playerContext = playerContext

						return (
							<div className={classes.controls} >
								<PlayButton isPlaying={ this.state.is_playing}
														onClick={ this.togglePlay }
								/>
								<ReactPlayer url={ this.props.url }
								             config={ { file: { forceAudio: true } } }
								             playing={ this.state.is_playing }
								             className={ classes.player }
								             onEnded={ this.togglePlay }
								/>
							</div>
						)
					}
				}
			</PlayerConsumer>
		)
	}
}




export default withStyles(styles)(Player)
