import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Frame } from "solid-core/dist/components/styled";
import styled from "styled-components";

const MovieDetail = ({ movie, onUpdate, handleClose }) => {
  if (!movie) return <></>
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
      </DialogContent>
    </Dialog>
  )
}

export default MovieDetail;

const Page = styled.div`
  width: 90%;
  max-width: 650px;
`