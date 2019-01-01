import React, { Component } from 'react';
import { AppConsumer } from "../../Context";
import { debounce } from "throttle-debounce";

import InputBase from "@material-ui/core/InputBase/InputBase";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/es/Paper/Paper";
import Collapse from '@material-ui/core/Collapse';
import InfoIcon from '@material-ui/icons/Info';
import {withStyles} from "@material-ui/core";


const styles = theme => ({
	container: {
		width: '90%',
		maxWidth: '640px',
		margin: '20px auto',
		boxSizing: 'border-box',
		position: 'relative',
		display: 'block',
		height: '60px',
		borderRadius: '70px',
		zIndex: '99999',
		transition: 'all .2s linear',
		[theme.breakpoints.up(640)]: {
			fontSize: '2em',
		},
	},
	indented: {
		height: '40px',
		[theme.breakpoints.up(640)]: {
			marginRight: '0px',
			width: '300px',
			height: '50px'
		}
	},
	searchBar: {
		width: '100%',
		height: '100%',
		padding: '10px 40px',
		fontSize: '1.2rem',
		opacity: '.7',
	},
	searching: {
		borderRadius: '20px',
		height: 'auto',
		transition: 'none'
	},
	searchingIndented: {
		borderRadius: '20px 20px 0 0',
		transition: 'none'
	},
	results: {
		display: 'block',
		height: '40vh!important',
		overflow: 'scroll'
	},
	resultsIndented: {
		backgroundColor: '#424242',
		borderRadius: '0 0 20px 20px',
		maxHeight: '400px',
		overflow: 'scroll'
	},
	notFound: {
		padding: '2em',
		textAlign: 'center',
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent:'center',
		alignItems: 'center'
	},
	icon: {
		marginRight: '10px'
	}

})

class SearchBar extends Component {
	constructor( props ) {
		super(props)

		this.state = {
			query: '',
			searchResults: [],
		}

		this.inputRef = React.createRef();

		this.handleChange = this.handleChange.bind(this)
		this.resetSearch = this.resetSearch.bind(this)
		this.searchArtist = debounce( 300, this.searchArtist )
	}

	handleChange( e ) {
		const artist = e.target.value
		this.searchArtist( artist )
	}

	resetSearch() {
		this.inputRef.current.value = ''
		this.setState({
			...this.state,
			query: '',
			searchResults: []
		} )
	}

	searchArtist( query ) {
		if ( query ) {
			const params = `search?q=${query}&type=artist&limit=10`
			this.context.isSearching(true)
			this.context.searchSpotify( params )
				.then( ( data ) => {

					// Filter by artists that have images
					const searchResults = data.artists.items.filter( ( artist ) => artist.images.length )

					this.setState( {
						...this.state,
						query,
						searchResults
					})
				})
		} else {
			this.context.isSearching(false)
			this.resetSearch()
		}

	}

	render() {

		const artists = this.state.searchResults
		const { classes, indented } = this.props
		const searchStyles = (
			indented && this.state.query ?
				[ classes.container, classes.indented, classes.searchingIndented ]
					: ( indented ?
						[ classes.container, classes.indented ]
						: ( this.state.query ?
								[ classes.container, classes.searching ]
								: [ classes.container ]
							)
						)
				)

		const resultsStyles = this.state.query ?
													( indented ?
															classes.resultsIndented
															: classes.results )
														: ''

		return (
			<AppConsumer>
				{
					(context) => {
						//make context globally available
						this.context = context

						return (
							<Paper className={ searchStyles.join(' ') }>
								<InputBase className={ classes.searchBar }
													 autoFocus
								           placeholder="Search Artist"
								           type="search"
								           inputRef={ this.inputRef }
								           onChange={(e) => {
									           this.handleChange(e)
								           }}
								/>
								<Collapse in={ this.state.query ? true : false } >
									<Paper className={ resultsStyles }>
									{
										this.state.query ?
											artists.length ?
												<List component="nav">
													{
														artists.map((artist) => (
															<React.Fragment key={artist.id}>
																<ListItem button onClick={() => {
																	this.context.setArtist(artist)
																	this.resetSearch()
																}}>
																	<Avatar alt={artist.name} src={artist.images[0].url}/>
																	<ListItemText primary={artist.name}
																	/>
																</ListItem>
															</React.Fragment>
														))
													}
												</List>
												:
												<Typography color="textSecondary"
																		variant="h5"
												            component="h3"
												            className={ classes.notFound }
												>
													<InfoIcon className={ classes.icon }/>
													No Results
												</Typography>
											:
											null
									}
									</Paper>
								</Collapse>
							</Paper>
						)
					}
				}
			</AppConsumer>
		)
	}
}


export default withStyles(styles)(SearchBar)



