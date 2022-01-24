import { Chip, TextField } from "@material-ui/core";
import { useState } from "react";
import { Row } from "solid-core";

function ChipField({ data, onSubmit, onDelete }) {

  const [value, setValue] = useState("");

  function checkReturn(e) {
    if (e.key !== 'Enter' || !value) return;
    setValue("")
    onSubmit(value)
  }

  return (
    <Row wrap="wrap">
      {
        data.map(d => <Chip key={ d } onDelete={ () => onDelete(d) } color="secondary" label={ d } size="small" style={ { marginBottom: '.2em' } } />)
      }
      <TextField
        color="primary"
        fullWidth
        style={ { opacity: .5 } }
        placeholder="add tag..."
        value={ value }
        onChange={ e => setValue(e.target.value) }
        onKeyDown={ checkReturn } />
    </Row>
  )
}

export default ChipField;