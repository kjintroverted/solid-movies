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
      {
        movies.map((m, i) => (
          <>
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
          </>
        ))
      }
    </Container>
  )
}

export default Table;

const Container = styled.div`
  display: grid;
  grid-template-columns: 2em 1fr 2fr 2.5em 2.5em 4em;
  grid-template-columns: repeat(auto, 3em);
  width: 95%;
  padding: 0em 1em;
  background: ${ THEME.dark };
  border-radius: 5px;
  align-items: center;
  row-gap: .5em;
`