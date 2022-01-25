import { Chip, TextField } from "@material-ui/core";
import { useState } from "react";
import { Row } from "solid-core";
import { Spacer } from "solid-core/dist/components/styled";
import { THEME } from "../util";

function ChipField({ data, onSubmit, onDelete, showForm }) {

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
          <span key={ d }>
            <Chip
              onDelete={ () => onDelete(d) }
              color="secondary"
              label={ d }
              size="small"
              style={ { marginBottom: '.2em', color: THEME.dark } } />
            <Spacer width='.2em' />
          </span>
        ))
      }
      {
        showForm &&
        <TextField
          color="primary"
          fullWidth
          style={ { opacity: .5 } }
          placeholder="add tag..."
          value={ value }
          onChange={ e => setValue(e.target.value) }
          onClick={ e => e.stopPropagation() }
          onKeyDown={ checkReturn } />
      }
    </Row>
  )
}

export default ChipField;