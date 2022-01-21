import { Fab } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Card, Column, Frame } from "solid-core/dist/components/styled"
import styled from "styled-components";
import { overallScore, THEME } from "../util";

const MovieList = ({ movies, onSelect }) => {

  const [displayList, setList] = useState([])

  useEffect(() => {
    setList(movies.sort((a, b) => a.data.Title.localeCompare(b.data.Title)))
  }, [movies])

  return (
    <Container>
      {
        displayList.map(m => (
          <Card className="movie" key={ m.id }>
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
          </Card>
        ))
      }
    </Container>
  )
}

export default MovieList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  *.movie {
    margin: .5em;
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