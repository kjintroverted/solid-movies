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
  const [rateFilter, setRateFilter] = useState(0)
  const [factor, setFactor] = useState(1)
  const [sortFunction, setSortFunction] = useState(() => sortRating)
  const [gridView, setGridView] = useState(true)
  // FILTERS
  const [tagFilter, setTagFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('')
  const [yearFilter, setYearFilter] = useState('')
  const [titleFilter, setTitleFilter] = useState('')

  useEffect(() => {
    setList(movies
      .filter(m => !rateFilter
        || (rateFilter === 1 && !overallScore(m.rating))
        || (rateFilter === 2 && !!overallScore(m.rating)))
      .filter(m => !tagFilter
        || m.tags.findIndex(t => t.toLowerCase().indexOf(tagFilter.toLowerCase()) >= 0) >= 0)
      .filter(m => !genreFilter
        || m.data.Genre.split(', ').findIndex(t => t.toLowerCase().indexOf(genreFilter.toLowerCase()) >= 0) >= 0)
      .filter(m => !yearFilter
        || m.data.Year.indexOf(yearFilter) === 0)
      .filter(m => !titleFilter
        || m.data.Title.toLowerCase().indexOf(titleFilter.toLowerCase()) === 0)
      .sort(sortFunction(factor)))
  }, [
    movies,
    tagFilter,
    genreFilter,
    yearFilter,
    rateFilter,
    titleFilter,
    sortFunction,
    factor
  ])

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

        {/* FILTERS */ }
        <Background>
          <TextField fullWidth placeholder='find movie' onChange={ e => setTitleFilter(e.target.value) } />
        </Background>
        <Background>
          <TextField fullWidth placeholder='filter by tag' onChange={ e => setTagFilter(e.target.value) } />
        </Background>
        {
          window.innerWidth > 680
          &&
          <>
            <Background>
              <TextField fullWidth placeholder='filter by genre' onChange={ e => setGenreFilter(e.target.value) } />
            </Background>
            <Background>
              <TextField fullWidth placeholder='filter by year' onChange={ e => setYearFilter(e.target.value) } />
            </Background>
          </>
        }

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
      min-width: 100px;
      max-width: 10em;
      `