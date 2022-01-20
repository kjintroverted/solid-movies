import { Card, Column, Frame } from "solid-core/dist/components/styled"
import styled from "styled-components";
import { THEME } from "../util";

const MovieList = ({ movies }) => {
  return (
    <Container wrap="wrap">
      {
        movies.map(m => (
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
          </Card>
        ))
      }
    </Container>
  )
}

export default MovieList;

const Container = styled.div`
  display: flex;
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