import { Fab } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Card, Column, Frame, Spacer } from "solid-core/dist/components/styled"
import styled from "styled-components";
import { overallScore, sortRating, THEME } from "../util";
import ChipField from './ChipField';

const MovieList = ({ movies, onSelect, onUpdate }) => {

  const [displayList, setList] = useState([])

  useEffect(() => {
    setList(movies.sort(sortRating()))
  }, [movies])

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

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <Container>
        {
          displayList.map(m => (
            <Card key={ m.id }>
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
              <Spacer height='.7em' />
              <ChipField data={ m.tags } onSubmit={ addTag(m) } onDelete={ removeTag(m) } />
            </Card>
          ))
        }
      </Container>
    </div>
  )
}

export default MovieList;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
  width: 95%;
  padding: 1em;
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