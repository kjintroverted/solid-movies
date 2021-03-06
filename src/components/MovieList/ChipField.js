import { Chip, TextField } from "@material-ui/core";
import { useState } from "react";
import { Row } from "solid-core";
import styled from "styled-components";
import { THEME } from "../../util";

function ChipField({ data, onSubmit, onDelete, showForm, toggleEdit }) {

  const [value, setValue] = useState("");

  function checkReturn(e) {
    if (e.key !== 'Enter' || !value) return;
    setValue("")
    onSubmit(value)
  }

  return (
    <Row wrap="wrap">
      {
        data.map(d => (
          <Chip
            key={ d }
            onDelete={ () => onDelete(d) }
            color="primary"
            label={ d }
            size="small"
            style={ { marginBottom: '.2em', marginLeft: '.2em' } } />
        ))
      }
      {
        !showForm ?
          <Chip
            className='clickable'
            onClick={ toggleEdit }
            label='add tag...'
            color='secondary'
            size='small'
            style={ { marginBottom: '.2em', marginLeft: '.2em', color: THEME.dark } } />
          : <Background>
            <TextField
              autoFocus
              color="primary"
              fullWidth
              style={ { opacity: .5 } }
              placeholder="add tag..."
              value={ value }
              onBlur={ toggleEdit }
              onChange={ e => setValue(e.target.value) }
              onClick={ e => e.stopPropagation() }
              onKeyDown={ checkReturn } />
          </Background>
      }
    </Row>
  )
}

export default ChipField;

const Background = styled.div`
  background: ${ THEME.dark }EE;
  border-radius: .3em;
  width: 90%;
  padding: .2em;
`