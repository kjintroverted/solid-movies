import { Button, Fab, IconButton, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Card, Column, Frame, Row, Spacer } from "solid-core/dist/components/styled"
import styled from "styled-components";
import { overallScore, sortRating, THEME } from "../util";
import ChipField from './ChipField';

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
  const [sort, setSort] = useState(1)

  useEffect(() => {
    setList(movies
      .filter(m => !rateFilter
        || (rateFilter === 1 && !overallScore(m.rating))
        || (rateFilter === 2 && !!overallScore(m.rating)))
      .filter(m => !tagFilter
        || m.tags.findIndex(t => t.toLowerCase().indexOf(tagFilter.toLowerCase()) >= 0) >= 0)
      .sort(sortRating(sort)))
  }, [movies, tagFilter, rateFilter, sort])

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
        <Fab
          size='small'
          color='secondary'
          style={ { margin: '0em .2em' } }
          onClick={ () => setSort(sort * -1) }
        >
          <span className='material-icons'>{ sort > 0 ? 'arrow_upward' : 'arrow_downward' }</span>
        </Fab>
      </Row>
      <Container>
        {
          displayList.map(m => (
            <Column justify='flex-start' align='center' width='100%' key={ m.id }>
              <Card className="clickable" onClick={ openRating(m) }>
                <Frame
                  position='absolute'
                  fit='cover'
                  top='0' left='0'
                  width='100%' height='20em'
                  focusX='center' focusY='15%'
                >
                  <img src={ m.data.Poster } alt={ `${ m.data.Title } Poster` } />
                </Frame>
                <Total>{ !!overallScore(m.rating) ? overallScore(m.rating) : <span className='material-icons'>star_half</span> }</Total>
                <Column height='9em' justify='flex-end'>
                  <Title>{ m.data.Title }</Title>
                </Column>
                <Spacer height='1em' />
                <ChipField
                  data={ m.tags }
                  onSubmit={ addTag(m) }
                  onDelete={ removeTag(m) }
                  showForm={ focus === m.id }
                  toggleEdit={ toggleFocus(m.id) }
                />
              </Card>
            </Column>
          ))
        }
      </Container>
    </Column>
  )
}

export default MovieList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
  width: 95%;
  padding: 0em 1em;
  * {
    justify-self: center;
  }
`

const Title = styled.h2`
  margin: 0px;
  padding: .1em;
  background: ${ THEME.primary }CC;
  color: ${ THEME.light };
  border-radius: 2px;
`

const Background = styled.div`
  background: ${ THEME.dark }DD;
  padding: .2em;
  margin: 0em .3em;
  border-radius: .3em;
  width: 30%;
  min-width: 200px;
  max-width: 30em;
`

const Total = styled.span`
  font-size: 2.5em;
  align-self: flex-end;
  background: ${ THEME.primary };
  color: ${ THEME.dark };
  padding: .1em;
  text-shadow: 1px 1px 5px ${ THEME.light }70;
  box-shadow: 2px 2px 10px ${ THEME.light }DD;
  position: absolute;
  top: -.1em;
  right: .2em;
  min-width: 50px;
  text-align: center;
  border-radius: 2px;
`