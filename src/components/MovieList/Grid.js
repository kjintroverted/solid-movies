import { Card, Column, Frame, Spacer } from "solid-core/dist/components/styled";
import styled from "styled-components";
import { overallScore, THEME } from "../../util";
import ChipField from "./ChipField";


const Grid = ({
  movies,
  addTag,
  removeTag,
  focus,
  toggleFocus,
  openRating
}) => {

  return (
    <Container>
      {
        movies.map(m => (
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
  )
}

export default Grid;

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