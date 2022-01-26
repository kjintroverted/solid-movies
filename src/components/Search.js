import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { searchMovies, SEARCH_DELAY, THEME } from '../util';
import { Card, CardHeader, Column, Icon, Row, Spacer } from 'solid-core/dist/components/styled';

const Search = ({ add, idList }) => {

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState(null);

  function handleChange({ target }) {
    // CANCEL EXISTING TIMER
    if (timer) clearTimeout(timer)
    // CREATE NEW TIMER
    setTimer(setTimeout(() => setQuery(target.value), SEARCH_DELAY))
  }

  useEffect(() => {
    setTimer(null)
    if (!query) {
      setSearchResults([]);
      return
    }
    // GET NEW RESULTS
    searchMovies(query)
      .then(setSearchResults)
  }, [query])

  return (
    <Column width="100%" height="none" align="center">
      <Background>
        <TextField
          fullWidth
          variant="outlined"
          onChange={ handleChange }
          InputProps={ {
            endAdornment: !timer ? <Icon theme={ THEME } className="material-icons">check</Icon>
              : <Box><CircularProgress color='primary' /></Box>
          } }
          placeholder='Search Movie...'
        />
      </Background>
      <Row wrap="wrap" justify="space-around">
        {
          (query && !searchResults.length) &&
          <ErrorMsg>No matching titles found...</ErrorMsg>
        }
        { // SHOW SEARCH RESULTS
          searchResults.map(movie => (
            <Card key={ movie.imdbID }>
              <Row>
                { // SHOW STOCK IMAGE IF NO POSTER
                  movie.Poster !== "N/A" ?
                    <Poster width='100em' src={ movie.Poster } alt={ `${ movie.Title }-poster` } />
                    : <BigIcon className='material-icons'>theaters</BigIcon>
                }
                <Spacer width='1em' />
                <CardHeader>{ movie.Title } ({ movie.Year })</CardHeader>
              </Row>
              <Actions>
                <Spacer width=".3em" />
                <Button
                  disabled={ idList.includes(movie.imdbID) }
                  color="primary"
                  onClick={ () => add(movie.imdbID) }
                >
                  <span className='material-icons'>
                    { idList.includes(movie.imdbID) ? `check` : `add` }
                  </span>
                  Add To my movies
                </Button>
              </Actions>
            </Card>
          ))
        }
      </Row>
    </Column>
  )
}

export default Search;

const Background = styled.div`
  background: ${ THEME.dark };
  border-radius: .3em;
  width: 90%;
  max-width: 30em;
`

const ErrorMsg = styled.p`
  color: ${ THEME.secondary };
  font-weight: bold;
`

const Poster = styled.img`
  box-shadow: 2px 2px 10px ${ THEME.primary };
`

const BigIcon = styled.h1`
  font-size: 7em;
  text-shadow: 2px 2px 10px ${ THEME.primary };
`

const Actions = styled.div`
  display: flex;
  position: absolute;
  bottom: .5em;
  right: .5em;
`