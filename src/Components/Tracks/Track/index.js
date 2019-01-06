import React, {Component} from 'react'

import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import Slide from '@material-ui/core/Slide';
import Fab from "@material-ui/core/Fab/Fab";
import Player from "../../Player";


const styles = theme => ({
	card: {
		display: 'flex',
		width: '100%',
		[theme.breakpoints.up(460)]: {
			maxWidth: 300,
		},

	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 150,
	},
	song: {
		fontSize: '1.2rem',
		lineHeight: '1.2em',
		marginBottom: 5
	},
	albumTypo: {
		fontSize: '.9rem',
		lineHeight: '1em'
	},
	button: {
		display: 'block',
		width: 'auto',
		height: 'auto',
		marginBottom: '10px',
		margin: 'auto',
		color: '#ffffff',
		fontSize: '.75rem'
	}
})


class Track extends Component {

	constructor(props) {
		super(props)

		this.state = {
			slideIn: false
		}

		this.openOnSpotify = this.openOnSpotify.bind(this)
	}

	componentDidMount() {


		//Slide card component in
		setTimeout( () => {
			this.setState({
				slideIn: true
			})

		}, this.props.delay )
	}


	openOnSpotify( url ) {
		return window.open( url )
	}


	render() {
		const { classes, track } = this.props;

		return (

			<Slide direction="left" in={ this.state.slideIn }>
				<Card className={ classes.card } >
					<div className={classes.details}>
						<CardContent className={ classes.content }>
							<Typography component="h6"
							            variant="h6"
							            align="left"
													className={ classes.song }
							>
								{ track.name }
							</Typography>
							<Typography color="textSecondary"
							            align="left"
							            className={ classes.albumTypo }
							>
								{ track.album.name }
							</Typography>
						</CardContent>
						{
							track.preview_url ?
								<Player url={ track.preview_url }
												trackInfo={ { ...track } }
								/> :
								<Fab
									variant="extended"
									size="medium"
									color="primary"
									aria-label="Open On Spotify"
									className={ classes.button }
									onClick={ () => this.openOnSpotify( track.external_urls.spotify ) }
								>Open On Spotify</Fab>
						}
					</div>
					<CardMedia className={classes.cover}
					           image={ track.album.images[0].url }
					           title={ track.album.name }
					/>
				</Card>
			</Slide>
		)
	}
}


export default withStyles(styles)( Track )