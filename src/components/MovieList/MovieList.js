import { Button, Fab, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Column, Row, Spacer } from "solid-core/dist/components/styled"
import styled from "styled-components";
import { overallScore, sortRating, THEME } from "../../util";
import Grid from "./Grid";
import Table from "./Table";

const RATE_FILTERS = [
  'ALL',
  'UNRATED',
  'RATED'
];

const MovieList = ({ movies, onSelect, onUpdate }) => {

  const [displayList, setList] = useState([])
  const [focus, setFocus] = useState(null)
  const [tagFilter, setTagFilter] = useState('')
  const [rateFilter, setRateFilter] = useState(0)
  const [factor, setFactor] = useState(1)
  const [sortFunction, setSortFunction] = useState(() => sortRating)
  const [gridView, setGridView] = useState(true)

  useEffect(() => {
    setList(movies
      .filter(m => !rateFilter
        || (rateFilter === 1 && !overallScore(m.rating))
        || (rateFilter === 2 && !!overallScore(m.rating)))
      .filter(m => !tagFilter
        || m.tags.findIndex(t => t.toLowerCase().indexOf(tagFilter.toLowerCase()) >= 0) >= 0)
      .sort(sortFunction(factor)))
  }, [movies, tagFilter, rateFilter, sortFunction, factor])

  function addTag(movie) {
    return (tag) => {
      onUpdate({ ...movie, tags: [...movie.tags, tag] })
    }
  }

  function removeTag(movie) {
    return (tag) => {
      let i = movie.tags.indexOf(tag);
      onUpdate({ ...movie, tags: [...movie.tags.slice(0, i), ...movie.tags.slice(i + 1)] });
    }
  }

  function toggleFocus(id) {
    return e => {
      e.stopPropagation()
      if (focus === id) setFocus(null)
      else setFocus(id)
    }
  }

  function openRating(m) {
    return e => {
      e.stopPropagation();
      onSelect(m)
    }
  }

  return (
    <Column align='center'>
      <Spacer height='1em' />
      <Row width='90%' align='center'>
        <Spacer />
        <Background>
          <TextField fullWidth placeholder='filter by tag' onChange={ e => setTagFilter(e.target.value) } />
        </Background>
        <Button
          variant="outlined"
          color='secondary'
          style={ { margin: '0em .5em', width: 100 } }
          onClick={ () => rateFilter + 1 >= RATE_FILTERS.length ? setRateFilter(0) : setRateFilter(rateFilter + 1) }
        >
          { RATE_FILTERS[rateFilter] }
        </Button>
        {
          window.innerWidth >= 800 &&
          <Fab
            size='small'
            color='secondary'
            style={ { margin: '0em .2em' } }
            onClick={ () => setGridView(!gridView) }
          >
            <span className='material-icons'>{ gridView ? 'table_rows' : 'grid_view' }</span>
          </Fab>
        }
        <Fab
          size='small'
          color='secondary'
          style={ { margin: '0em .2em' } }
          onClick={ () => setFactor(factor * -1) }
        >
          <span className='material-icons'>{ factor > 0 ? 'arrow_downward' : 'arrow_upward' }</span>
        </Fab>
      </Row>
      {
        gridView ?
          <Grid
            movies={ displayList }
            addTag={ addTag }
            removeTag={ removeTag }
            focus={ focus }
            toggleFocus={ toggleFocus }
            openRating={ openRating } />
          : <Table
            movies={ displayList }
            addTag={ addTag }
            removeTag={ removeTag }
            focus={ focus }
            toggleFocus={ toggleFocus }
            openRating={ openRating }
            changeSort={ setSortFunction }
          />

      }
    </Column>
  )
}

export default MovieList;

const Background = styled.div`
  background: ${ THEME.dark }DD;
  padding: .2em;
  margin: 0em .3em;
  border-radius: .3em;
  width: 30%;
  min-width: 200px;
  max-width: 30em;
`