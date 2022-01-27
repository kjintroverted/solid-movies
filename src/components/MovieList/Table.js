import { Button } from "@material-ui/core";
import { Row } from "solid-core/dist/components/styled";
import styled from "styled-components";
import { overallScore, THEME } from "../../util";
import ChipField from "./ChipField";


const Table = ({
  movies,
  addTag,
  removeTag,
  focus,
  toggleFocus,
  openRating
}) => {

  return (
    <Container>
      <TableRow style={ { background: 'none', height: 'default' } }>
        <p></p>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Title</Button>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Tags</Button>
        <Button color='primary'>Rating</Button>
        <Button color='primary'>imdb</Button>
        <Button color='primary'>Meta</Button>
      </TableRow>
      {
        movies.map((m, i) => (
          <TableRow className='clickable' onClick={ openRating(m) } key={ m.id }>
            <p>{ i + 1 }</p>
            <Row align='center'>
              <img src={ m.data.Poster } alt={ `${ m.data.Title } Poster` } />
              <h3>{ m.data.Title }</h3>
            </Row>
            <ChipField
              data={ m.tags }
              onSubmit={ addTag(m) }
              onDelete={ removeTag(m) }
              showForm={ focus === m.id }
              toggleEdit={ toggleFocus(m.id) }
            />
            <h2 style={ { justifySelf: 'center' } }>{ overallScore(m.rating) }</h2>
            <p style={ { justifySelf: 'center' } }>{ m.data.imdbRating }</p>
            <p style={ { justifySelf: 'center' } }>{ m.data.Metascore }</p>
          </TableRow>
        ))
      }
    </Container>
  )
}

export default Table;

const Container = styled.div`
  display: grid;
  width: 95%;
  padding: .5em 1em;
  row-gap: .5em;
  `

const TableRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2em 2fr 2fr 4em 4em 5em;
  padding: 0em .5em;
  background: ${ THEME.dark }EE;
  border-radius: 5px;
  & img {
    height: 6em;
    margin: .2em;
  }
`