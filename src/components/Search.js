import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Column } from 'solid-core';
import styled from 'styled-components';
import { SEARCH_DELAY, THEME } from '../util';

const Search = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState(null);
  const [timer, setTimer] = useState(null);

  function handleChange({ target }) {
    // CANCEL EXISTING TIMER
    if (timer) clearTimeout(timer)
    // CREATE NEW TIMER
    setTimer(setTimeout(() => setQuery(target.value), SEARCH_DELAY))
  }

  useEffect(() => {
    // ON QUERY UPDATE
    //  GET NEW RESULTS
    //  SET NULL TIMER
    if (query) console.log("Search:", query);
  }, [query])

  return (
    <Column width="100%" align="center">
      <Background>
        <TextField onChange={ handleChange } fullWidth variant="outlined" placeholder='Search Movie...' />
      </Background>
    </Column>
  )
}

export default Search;

const Background = styled.div`
  background: ${ THEME.dark }90;
  border-radius: .3em;
  width: 90%;
  max-width: 30em;
`
