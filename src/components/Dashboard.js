import { Button, Dialog, DialogContent, IconButton } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaveButton from "solid-core/dist/components/SaveButton";
import { HeaderBar, Spacer } from "solid-core/dist/components/styled";
import { appLogin, initThing, loadThing, nameFilter, SaveState } from "solid-core/dist/pods";
import styled from "styled-components";
import { movieShape } from "../movieShape";
import { AppTheme, getMovieData, THEME } from "../util";
import MovieDetail from "./MovieDetail";
import MovieList from "./MovieList";
import Search from "./Search";

const Dashboard = ({ user, data }) => {

  const { queue, saveFromQ } = useContext(SaveState);
  const { mui } = useContext(AppTheme);

  const [movies, updateMovies] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!data) return
    loadWatchList(data)
      .then(loadAllMovieData)
      .then(updateMovies)

  }, [data]);

  async function loadWatchList(things) {
    // GET ALL MOVIE DATA
    return await Promise.all(
      things
        .filter(nameFilter('movie'))
        .map(t => loadThing(t.url, movieShape))
    );
  }

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
    let thing = await initThing("movie", movie, movieShape)
    updateMovies([...movies, { ...movie, thing }]);
  }

  return (
    <Layout>
      <HeaderBar theme={ THEME }>
        <h2>{ user ? `${ user.firstName }'s` : "My" } Movies</h2>
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
        <MovieList movies={ movies } onSelect={ setDetail } />
        <MovieDetail movie={ detail } handleClose={ () => setDetail(null) } />
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