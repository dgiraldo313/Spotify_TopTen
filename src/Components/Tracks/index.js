import React, {Component} from "react";
import { AppConsumer } from "../../Context";
import { PlayerProvider } from "../../Context";
import Track from './Track'

import {withStyles} from "@material-ui/core";


const styles = theme => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridGap: '20px',
		maxWidth: '1080px',
		margin: ' 20px auto',
		padding: '0px 20px',
		justifyItems: 'center',
		[theme.breakpoints.up(640)]: {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		[theme.breakpoints.up(960)]: {
			gridTemplateColumns: 'repeat(3, 1fr)',
		},
	},
});

class Tracks extends Component {

	constructor( props ) {
		super(props)

		this.state = {
			is_track_playing: false,
			player_ref: null
		}
	}

	render() {
		const { classes } = this.props
		const providerContext = {
			...this.state,
		}

		return (
			<AppConsumer>
				{
					context => {
						const { selectedArtist } = context
						return (
							selectedArtist.tracks ?
								<PlayerProvider value={ providerContext }>
									<div className={ classes.container }>
										{
											selectedArtist.tracks.map( ( track, index ) => (
												<Track track= { { ...track } }
																delay={ index * 25 }/>
											))
										}
									</div>
								</PlayerProvider>
								: null
						)
					}
				}
			</AppConsumer>
		)
	}

}

export default withStyles(styles)(Tracks)