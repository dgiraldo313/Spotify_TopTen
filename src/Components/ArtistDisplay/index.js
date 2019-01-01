import React, {Component} from "react";
import {AppConsumer} from "../../Context";
import Tracks from '../Tracks'
import FollowButton from "../FollowButton";

import Avatar from "@material-ui/core/es/Avatar/Avatar";

import Typography from '@material-ui/core/Typography';

import {withStyles} from "@material-ui/core";

const styles = theme => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		maxWidth: '960px',
		margin: 'auto',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '30px',
		[theme.breakpoints.up(640)]: {
			flexDirection: 'column',
			textAlign: 'center',
			marginBottom: '50px'
		},
	},
	avatar: {
		width: '100px',
		height: '100px',
		marginRight: '20px',
		[theme.breakpoints.up(640)]: {
			height: '200px',
			width: '200px',
			margin: '0 0 20px 0',
		}
	},
})

const ArtistDisplay = ( props ) => {
	const { classes } = props
	return(
		<AppConsumer>
			{
				context => {
					const selectedArtist = context.selectedArtist
					return (
						selectedArtist ?
							<div>
								{/* TODO Extract into external component? */}
								<div className={ classes.container }>
									<Avatar className={ classes.avatar }
													alt={ selectedArtist.name }
									        src={ selectedArtist.images[0].url } />
									<div>
										<Typography component="h5" variant="h5">
											{ selectedArtist.name }
										</Typography>
										<Typography color="textSecondary">
											{ `${ formatFollowers( selectedArtist.followers.total || 0 ) } Followers` }
										</Typography>
										<FollowButton />
									</div>
								</div>

								<Tracks />

							</div>
							: null
					)
				}
			}
		</AppConsumer>
	);
}

const formatFollowers = ( value ) => value.toString()
																					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")


export default withStyles( styles)(ArtistDisplay)