import React, { Component } from 'react';
import {clientId, redirectUri, spotifyAPI} from "./_settings";
import { AppProvider } from "./Context";

import { MuiThemeProvider } from '@material-ui/core/styles';
import SpotifyTheme from './Components/Theme';

import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';

import Header from './Components/Header'
import ArtistDisplay from './Components/ArtistDisplay'
import LinearProgress from '@material-ui/core/LinearProgress';

import {withStyles} from "@material-ui/core";


const styles = theme => ({
	container: {
		minHeight: '100vh',
		'&::before': {
			content: '""',
			position: 'fixed',
			top: 0,
			right: 0,
			left: 0,
			bottom: 0,
			background: 'linear-gradient(rgba(0,0,0,0) -30%,#191414)',
			zIndex: '-1'
		}
	}
})


class App extends Component {

  constructor( props ) {
    super(props)

    this.state = {
      auth_token: null,
	    selectedArtist: null,
	    isSearching: false,
	    query: '',
	    searchResults: []
    }

    this.searchSpotify = this.searchSpotify.bind(this)
	  this.setArtist = this.setArtist.bind(this)
	  this.isSearching = this.isSearching.bind(this)

  }

	componentDidMount() {

  	//TODO extract this to util function
		let hashParams = {};
		let e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ( e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}

		if(!hashParams.access_token) {
			window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
		} else {
		  const auth_token = hashParams.access_token
			this.setState({
        auth_token
			});
		}
	}

	/*
	* Base mixin function to search from Spotify API
	*
	* */
	searchSpotify( params ) {
		return new Promise( ( resolve ) => {
			const uri = `${spotifyAPI}${params}`
			fetch( uri , {
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${ this.state.auth_token }`
				}
			}).then( (resp) => resp.json())
				.then( ( resp ) => resolve( resp ))
				.catch( () => {
					window.location.replace( redirectUri )
				})
		})
	}


  setArtist( artist ) {
		const currArtist = this.state.selectedArtist ? this.state.selectedArtist.id : ''

	  // Do not update if it's the same artist in state
	  if ( currArtist === artist.id ) return false

		const params = `artists/${ artist.id }/top-tracks?country=US`

	  this.searchSpotify(params)
		  .then( ( tracks ) => {
				this.setState( ( prevState ) => {
					return ({
						...prevState,
						selectedArtist: {
							...prevState.selectedArtist,
							...tracks
						}
					})
				})
			})

	  // Set artist with current info, so that we dont wait until the top tracks have loaded
	  this.setState( ( prevState ) => {
		  return ({
			  ...prevState,
			  selectedArtist: artist
		  })
	  })
  }

  isSearching( isSearching ) {
		this.setState( {
			isSearching
		})
	}

	render() {
		const { classes } = this.props
		const context = {
			auth_token: this.state.auth_token,
			setArtist: this.setArtist,
			searchSpotify: this.searchSpotify,
			isSearching: this.isSearching,
			selectedArtist: this.state.selectedArtist
		}

    return (

	    <MuiThemeProvider theme={ SpotifyTheme }>
				<AppProvider value={ context }>
			    <React.Fragment>
			      <CssBaseline />
		       {
			       this.state.auth_token ?
				       <div className={ classes.container } >
					       <Header selected={
					       	this.state.selectedArtist ? true : false }
					       />
					       <ArtistDisplay/>
				       </div>
				       :
				       <React.Fragment>
					       <LinearProgress />
					       <h1>Loading...</h1>
				       </React.Fragment>
		       }
			    </React.Fragment>
				</AppProvider>
	    </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(App);
