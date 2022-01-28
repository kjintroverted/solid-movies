import { Button } from "@material-ui/core";
import { Row } from "solid-core/dist/components/styled";
import styled from "styled-components";
import { overallScore, sortExternalRating, THEME } from "../../util";
import ChipField from "./ChipField";


const Table = ({
  movies,
  addTag,
  removeTag,
  focus,
  toggleFocus,
  openRating,
  changeSort
}) => {

  function buildRows() {
    let rank = 1;
    let prevScore;
    return movies.map((m, i) => {
      let score = overallScore(m.rating);
      if (prevScore && prevScore !== score) {
        rank = i + 1;
      }
      prevScore = score;
      return (
        <TableRow className='clickable' onClick={ openRating(m) } key={ m.id }>
          <Rank>{ rank }</Rank>
          <Row align='center'>
            <img src={ m.data.Poster } alt={ `${ m.data.Title } Poster` } />
            <h2>{ m.data.Title }</h2>
          </Row>
          <ChipField
            data={ m.tags }
            onSubmit={ addTag(m) }
            onDelete={ removeTag(m) }
            showForm={ focus === m.id }
            toggleEdit={ toggleFocus(m.id) }
          />
          <Rating style={ { justifySelf: 'center' } }>{ score }</Rating>
          <p style={ { justifySelf: 'center' } }>{ m.data.imdbRating }</p>
          <p style={ { justifySelf: 'center' } }>{ m.data.Metascore }</p>
        </TableRow>
      )
    })
  }

  return (
    <Container>
      <TableRow style={ { background: 'none', height: 'default' } }>
        <p></p>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Title</Button>
        <Button style={ { justifyContent: 'flex-start' } } color='primary'>Tags</Button>
        <Button color='primary'>Rating</Button>
        <Button onClick={ () => changeSort(() => sortExternalRating('imdbRating')) } color='primary'>imdb</Button>
        <Button color='primary'>Meta</Button>
      </TableRow>
      { buildRows() }
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
  grid-template-columns: 2.5em 2fr 1.5fr 4em 4em 5em;
  padding: 0em .5em;
  background: ${ THEME.dark }EE;
  border-radius: 5px;
  & img {
    height: 6em;
    margin: .2em .5em;
    box-shadow: 2px 2px 5px ${ THEME.primary }AA;
  }
  `

const Rank = styled.h2`
  text-align: center;
  background: ${ THEME.secondary };
  color: ${ THEME.dark };
  border-radius: 5px;
  padding: .3em .1em;
  `

const Rating = styled.h2`
  text-align: center;
  color: ${ THEME.light };
  font-size: 2em;
  text-shadow: 3px 3px 10px ${ THEME.primary }DD;
`