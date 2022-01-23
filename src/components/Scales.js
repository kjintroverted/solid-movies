import { Slider } from '@material-ui/core';
import { CardHeader, Row, Spacer } from 'solid-core/dist/components/styled';
import styled from 'styled-components';
import { RATINGS, THEME } from '../util';

const Scales = ({ rating, updateValue, helper }) => {
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
        { helper && <HelperText>{ rating.story ? RATINGS.story[rating.story - 1] : '' }</HelperText> }
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
        { helper && <HelperText>{ rating.character ? RATINGS.character[rating.character - 1] : '' }</HelperText> }
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
        { helper && <HelperText>{ rating.performance ? RATINGS.performance[rating.performance - 1] : '' }</HelperText> }
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
        { helper && <HelperText>{ rating.visuals ? RATINGS.visuals[rating.visuals - 1] : '' }</HelperText> }
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
        { helper && <HelperText>{ rating.soundtrack ? RATINGS.soundtrack[rating.soundtrack - 1] : '' }</HelperText> }
      </Section>
    </Container>
  )
}

export default Scales;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${ THEME.dark }EE;
  width: 100%;
  align-items: center;
  box-shadow: 2px 2px 10px ${ THEME.primary }EE;
`

const Section = styled.div`
  width: 90%;
`

const Value = styled.h2`
  width: 1em;
`

const HelperText = styled.p`
  margin-top: 0;
  font-size: small;
  padding-left: 1em;
  opacity: .7;
`