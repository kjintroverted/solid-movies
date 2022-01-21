import { Slider } from '@material-ui/core';
import { CardHeader, Row, Spacer } from 'solid-core/dist/components/styled';
import styled from 'styled-components';
import { THEME } from '../util';

const Scales = ({ rating, updateValue }) => {
  return (
    <Container>
      {/* STORY */ }
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
          <Value>{ rating.story ? rating.story : '-' }</Value>
        </Row>
      </Section>
      {/* CHARACTER */ }
      <Section>
        <CardHeader>Character</CardHeader>
        <Row align='center'>
          <Slider
            onChange={ updateValue('character') }
            value={ rating.character ? rating.character : 5 }
            step={ 1 } marks
            min={ 1 } max={ 10 }
          />
          <Spacer width='.5em' />
          <Value>{ rating.character ? rating.character : '-' }</Value>
        </Row>
      </Section>
      {/* PERFORMANCE */ }
      <Section>
        <CardHeader>Performance</CardHeader>
        <Row align='center'>
          <Slider
            onChange={ updateValue('performance') }
            value={ rating.performance ? rating.performance : 5 }
            step={ 1 } marks
            min={ 1 } max={ 10 }
          />
          <Spacer width='.5em' />
          <Value>{ rating.performance ? rating.performance : '-' }</Value>
        </Row>
      </Section>
      {/* VISUALS */ }
      <Section>
        <CardHeader>Visuals</CardHeader>
        <Row align='center'>
          <Slider
            onChange={ updateValue('visuals') }
            value={ rating.visuals ? rating.visuals : 5 }
            step={ 1 } marks
            min={ 1 } max={ 10 }
          />
          <Spacer width='.5em' />
          <Value>{ rating.visuals ? rating.visuals : '-' }</Value>
        </Row>
      </Section>
      {/* SOUNDTRACK */ }
      <Section>
        <CardHeader>Soundtrack</CardHeader>
        <Row align='center'>
          <Slider
            onChange={ updateValue('soundtrack') }
            value={ rating.soundtrack ? rating.soundtrack : 5 }
            step={ 1 } marks
            min={ 1 } max={ 10 }
          />
          <Spacer width='.5em' />
          <Value>{ rating.soundtrack ? rating.soundtrack : '-' }</Value>
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

const Value = styled.h2`
  width: 1em;
`