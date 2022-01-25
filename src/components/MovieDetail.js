import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useState } from "react";
import { Frame, Spacer } from "solid-core/dist/components/styled";
import styled from "styled-components";
import { overallScore, THEME } from "../util";
import Scales from "./Scales";

const MovieDetail = ({ movie, onUpdate, handleClose }) => {

  const [show, setShow] = useState(true);

  if (!movie) return <></>

  let total = overallScore(movie.rating);
  debugger

  function updateRatingValue(field) {
    return (_, val) => {
      onUpdate({ ...movie, rating: { ...movie.rating, [field]: +val } })
    }
  }

  return (
    <Dialog open={ true } onClose={ handleClose }>
      <DialogTitle>{ movie.data.Title }</DialogTitle>
      <DialogContent>
        <Frame
          fit='cover'
          width='400px'
          style={ { maxWidth: '100%' } }
        >
          <img src={ movie.data.Poster } alt={ `${ movie.data.title } Poster` } />
        </Frame>
        <Ratings>
          { total && <Total>{ total }</Total> }
          <Spacer />
          <Scales rating={ movie.rating } updateValue={ updateRatingValue } helper={ show } />
        </Ratings>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => setShow(!show) }>{ show ? 'Hide' : 'Show' } Explanation</Button>
        <Button variant='contained' color='secondary' href={ `https://www.imdb.com/title/${ movie.id }` }>More INfo</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MovieDetail;

const Ratings = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
  `

const Total = styled.span`
  font-size: 5em;
  align-self: flex-end;
  background: ${ THEME.primary };
  color: ${ THEME.dark };
  padding: .1em;
  text-shadow: 1px 1px 5px ${ THEME.light }70;
  box-shadow: 2px 2px 10px ${ THEME.light }DD;
`