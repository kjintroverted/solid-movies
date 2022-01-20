import { Card, CardHeader, Row } from "solid-core/dist/components/styled"

const MovieList = ({ movies }) => {
  return (
    <Row wrap="wrap">
      {
        movies.map(m => (
          <Card key={ m.id }>
            <CardHeader>{ m.data.Title }</CardHeader>
          </Card>
        ))
      }
    </Row>
  )
}

export default MovieList;