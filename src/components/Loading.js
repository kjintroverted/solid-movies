import { Box, CircularProgress } from "@material-ui/core"
import { Column, Spacer } from "solid-core/dist/components/styled"

const Loading = ({ loading }) => {
  return !loading ? null
    : (
      <Column>
        <Spacer height='1em' />
        <Box sx={ { display: 'flex', justifyContent: 'center' } }>
          <CircularProgress color='secondary' size='5em' />
        </Box>
      </Column>
    )
}

export default Loading;