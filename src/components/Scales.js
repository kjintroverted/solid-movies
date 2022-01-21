import { Slider } from '@material-ui/core';
import { CardHeader, Row, Spacer } from 'solid-core/dist/components/styled';
import styled from 'styled-components';
import { THEME } from '../util';

const Scales = ({ rating, updateValue }) => {
  return (
    <Container>
      <Section>
        <CardHeader>Story</CardHeader>
        <Row align='center'>
          <Slider
            onChange={ updateValue('story') }
            value={ rating.story ? rating.story : 5 }
            step={ 1 } marks
            min={ 1 } max={ 10 }
          />
          <Spacer width='.5em' />
          <h2>{ rating.story ? rating.story : 5 }</h2>
        </Row>
      </Section>
    </Container>
  )
}

export default Scales;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${ THEME.dark };
  width: 100%;
  align-items: center;
`

const Section = styled.div`
  width: 90%;
`