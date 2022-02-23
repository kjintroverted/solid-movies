import { Button, IconButton } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaveButton from "solid-core/dist/components/SaveButton";
import { HeaderBar, Spacer } from "solid-core/dist/components/styled";
import { addToUpdateQueue, appLogin, initThing, loadAllByName, SaveState, setAttr } from "solid-core/dist/pods";
import styled from "styled-components";
import { movieShape } from "../movieShape";
import { AppTheme, getMovieData, THEME } from "../util";
import Loading from "./Loading";
import MovieDetail from "./MovieDetail";
import MovieList from "./MovieList/MovieList";
import Search from "./Search";

const Dashboard = ({ user }) => {

  const { queue, updateQueue, saveFromQ, dataset, setDataset } = useContext(SaveState);
  const { mui } = useContext(AppTheme);

  const [loading, setLoading] = useState(false);
  const [movies, updateMovies] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!dataset) return;
    setLoading(true);
    loadAllMovieData(loadAllByName(dataset, 'movie', movieShape))
      .then(updateMovies)
  }, [dataset]);

  useEffect(() => setLoading(false), [movies])

  async function loadAllMovieData(list) {
    // GET ALL MOVIE DATA
    let res = [];
    for (let i in list) {
      let movie = list[i];
      if (movie.data) {
        res = [...res, movie]
        continue
      }
      let data = await getMovieData(movie.id);
      res = [...res, { ...movie, data }]
    }
    return res;
  }

  async function addMovie(id) {
    let data = await getMovieData(id);
    let movie = { id, data, rating: {}, tags: [] };
    { dataset, movie } = await initThing("movie", movie, movieShape)
    updateMovies([...movies, { ...movie, data }]);
    setDataset(dataset)
  }

  function updateMovie(field, then) {
    return (updatedMovie) => {
      let thing = setAttr(updatedMovie.thing, movieShape[field], updatedMovie[field]);
      updatedMovie.thing = thing;
      updateQueue(addToUpdateQueue(queue, thing))
      let i = movies.findIndex(m => m.id === updatedMovie.id);
      updateMovies([...movies.slice(0, i), updatedMovie, ...movies.slice(i + 1)])
      if (then) then(updatedMovie);
    }
  }

  return (
    <Layout>
      <HeaderBar theme={ THEME }>
        <h2>{ user && user.nickname ? `${ user.nickname }'s` : user && user.name ? `${ user.name }'s` : "My" } Movies</h2>
        <Spacer />
        {
          user ?
            <Link to="/profile">
              <IconButton color="inherit"><span className="material-icons">person</span></IconButton>
            </Link>
            :
            <Button onClick={ appLogin } color="inherit">Login</Button>
        }
      </HeaderBar>
      <Content>
        <Search idList={ movies.map(m => m.id) } add={ addMovie } />
        <MovieList movies={ movies } onSelect={ setDetail } onUpdate={ updateMovie('tags') } />
        <Loading loading={ loading } />
        <MovieDetail movie={ detail } onUpdate={ updateMovie('rating', setDetail) } handleClose={ () => setDetail(null) } />
      </Content>
      <SaveButton ui={ mui } save={ saveFromQ } queue={ queue } />
    </Layout>
  )
}

export default Dashboard;

const Layout = styled.div`
  background: ${ THEME.light };
  height: 100%;
  display: grid;
  grid-template-rows: 5.2em 1fr;
  grid-template-areas: 
  "header"
  "main";
  `

const Content = styled.div`
  background: ${ THEME.light };
  display: flex;
  flex-direction: column;
  grid-area: main;
`