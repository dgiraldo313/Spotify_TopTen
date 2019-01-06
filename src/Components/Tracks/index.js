import React, {Component} from "react";
import { AppConsumer } from "../../Context";
import { PlayerProvider } from "../../Context";
import Track from './Track'
import PlayButton from "../PlayButton";
import Snackbar from '@material-ui/core/Snackbar';

import {withStyles} from "@material-ui/core";
import SnackbarContent from "@material-ui/core/es/SnackbarContent/SnackbarContent";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";


const styles = theme => ({
	container: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridGap: '20px',
		maxWidth: '1080px',
		margin: ' 20px auto',
		padding: '0px 20px',
		justifyItems: 'center',
		paddingBottom: '100px',
		[theme.breakpoints.up(640)]: {
			gridTemplateColumns: 'repeat(2, 1fr)',
		},
		[theme.breakpoints.up(960)]: {
			gridTemplateColumns: 'repeat(3, 1fr)',
		}
	},
	controllerContainer: {
		width: 'auto'
	},
	controller: {
		backgroundColor: '#333333',
		width: '100%',
		minWidth: '400px',
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%'
	},
	content: {
		padding: 0,
		marginLeft: '10px',
		marginRight: '10px'
	},
	link: {
		marginLeft: 'auto',
	},
	cover: {
		width: '60px',
		height: '60px'
	},
	elipsis: {
		width: '250px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	}
});

class Tracks extends Component {

	constructor( props ) {
		super(props)

		this.state = {
			is_track_playing: null,
			player_ref: null,
			track_info: null
		}

		this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this)
	}

	updateCurrentPlayer( obj ) {
		this.setState( ( prevState ) => {
			// When there is a track playing,
			// we want to pause the current player before starting the new one
			if ( prevState.is_track_playing ) {
				prevState.player_ref.pause()
			}

			// need to update reference to player and update if player is playing
			return { ...obj }
		})
	}

	render() {
		const { classes } = this.props
		const { track_info } = this.state
		const mediaPlayerAvailable = Boolean( this.state.player_ref ) // Needed to determined if we need a global player  or not
		const providerContext = {
			...this.state,
			updateCurrentPlayer: this.updateCurrentPlayer
		}


		return (
			<AppConsumer value={ providerContext }>
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
									{/* TODO - Extract this into Player Control Component */}
									{
										mediaPlayerAvailable ?
											<Snackbar
												classes={ { root: classes.controllerContainer } }
												anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
												open={ mediaPlayerAvailable}
											>

												<SnackbarContent
													classes={{ message: classes.contentContainer }}
													className={ classes.controller }
													message={
														<React.Fragment>
															<PlayButton isPlaying={ this.state.is_track_playing }
															            onClick={ () => this.state.player_ref.togglePlay() }
															/>
															<CardContent className={ classes.content }>
																<Typography className={ classes.elipsis }
																						component="h6"
																            variant="h6"
																            align="left">
																	{ track_info.name }
																</Typography>
																<Typography className={ classes.elipsis }
																						color="textSecondary"
																            align="left">
																	{ track_info.album.name }
																</Typography>
															</CardContent>
															<a href={ track_info.external_urls.spotify } target="_blank" className={ classes.link }>
																<Tooltip title="View on Spotify" placement="top">
																	<CardMedia
																		image={ track_info.album.images[0].url }
																		className={ classes.cover }
																	/>
																</Tooltip>
															</a>
														</React.Fragment>
													}
												/>
											</Snackbar>
											: null
									}
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