import { Button } from "@material-ui/core";
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
      <TableRow style={ { background: 'none' } }>
        <p></p>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Title</Button>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Tags</Button>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Meta</Button>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>imdb</Button>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Rating</Button>
      </TableRow>
      {
        movies.map((m, i) => (
          <TableRow>
            <p>{ i + 1 }</p>
            <h3>{ m.data.Title }</h3>
            <ChipField
              data={ m.tags }
              onSubmit={ addTag(m) }
              onDelete={ removeTag(m) }
              showForm={ focus === m.id }
              toggleEdit={ toggleFocus(m.id) }
            />
            <p>{ m.data.Metascore }</p>
            <p>{ m.data.imdbRating }</p>
            <h2>{ overallScore(m.rating) }</h2>
          </TableRow>
        ))
      }
    </Container>
  )
}

export default Table;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto, 3em);
  width: 95%;
  padding: .5em 1em;
  row-gap: .5em;
  `

const TableRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2em 1fr 2fr 4em 4em 5em;
  padding: 0em .5em;
  background: ${ THEME.dark }EE;
  border-radius: 5px;
`