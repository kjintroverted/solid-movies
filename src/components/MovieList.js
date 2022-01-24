import { Button, Fab, TextField } from "@material-ui/core";
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
    if (id !== focus) setFocus(id)
    else setFocus(null)
  }

  return (
    <Column align='center'>
      <Spacer height='1em' />
      <Row width='90%' align='center'>
        <Background>
          <TextField variant='filled' fullWidth placeholder='filter tag' onChange={ e => setTagFilter(e.target.value) } />
        </Background>
        <Spacer />
        <Button
          variant="outlined"
          color='secondary'
          style={ { margin: '0em .2em', width: 100 } }
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
            <Column justify='flex-start' align='center' width='100%'>
              <Card className="clickable" key={ m.id } onClick={ () => toggleFocus(m.id) }>
                <Frame
                  position='absolute'
                  fit='cover'
                  top='0' left='0'
                  width='100%' height='10em'
                  focusX='center' focusY='15%'
                >
                  <img src={ m.data.Poster } alt={ `${ m.data.Title } Poster` } />
                </Frame>
                <Column height='9em' justify='flex-end'>
                  <Title>{ m.data.Title }</Title>
                </Column>
                <Action>
                  <Fab
                    onClick={ () => onSelect(m) }
                    size='large'
                    color='secondary'>
                    {
                      overallScore(m.rating) ?
                        <Rate>{ overallScore(m.rating) }</Rate>
                        : <Rate className="material-icons">star_half</Rate>
                    }
                  </Fab>
                </Action>
                <Spacer height='1em' />
                <ChipField data={ m.tags } onSubmit={ addTag(m) } onDelete={ removeTag(m) } showForm={ focus === m.id } />
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
  background: ${ THEME.primary }DD;
`

const Rate = styled.h1`
  color: ${ THEME.dark };
`

const Action = styled.span`
  position: absolute;
  top: -.2em;
  right: -.2em;
`

const Background = styled.div`
  background: ${ THEME.dark };
  border-radius: .3em;
  width: 30%;
  min-width: 200px;
  max-width: 30em;
`