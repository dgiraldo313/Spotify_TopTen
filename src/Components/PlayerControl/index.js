import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Tooltip from '@material-ui/core/Tooltip';
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



	render() {
		return (
			<span>Heloo</span>
		)
	}
}




export default withStyles(styles)(Player)
