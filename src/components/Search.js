import { useEffect, useState } from 'react';
import { Box, CircularProgress, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { searchMovies, SEARCH_DELAY, THEME } from '../util';
import { Card, CardHeader, Column, Icon, Row } from 'solid-core/dist/components/styled';

const Search = () => {

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
    <Column width="100%" align="center">
      <Background>
        <TextField
          fullWidth
          variant="outlined"
          onChange={ handleChange }
          InputProps={ {
            endAdornment: !timer ? <Icon theme={ THEME } className="material-icons">check</Icon>
              : <Box><CircularProgress color='primary' /></Box>
          } }
          placeholder='Search Movie...' />
      </Background>
      <Row wrap="wrap" justify="space-around">
        {
          (query && !searchResults.length) &&
          <ErrorMsg>No matching titles found...</ErrorMsg>
        }
        {
          searchResults.map(movie => (
            <Card key={ movie.imdbID }>
              <Row>
                {
                  movie.Poster !== "N/A" ?
                    <Poster width='100em' src={ movie.Poster } alt={ `${ movie.Title }-poster` } />
                    : <BigIcon className='material-icons'>theaters</BigIcon>
                }
                <CardHeader>{ movie.Title } ({ movie.Year })</CardHeader>
              </Row>
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