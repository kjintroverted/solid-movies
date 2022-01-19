import { Button, IconButton } from "@material-ui/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SaveButton from "solid-core/dist/components/SaveButton";
import { HeaderBar, Spacer } from "solid-core/dist/components/styled";
import { appLogin, SaveState } from "solid-core/dist/pods";
import styled from "styled-components";
import { AppTheme, THEME } from "../util";
import Search from "./Search";

const Dashboard = ({ user, data }) => {

  const { queue, saveFromQ } = useContext(SaveState);
  const { mui } = useContext(AppTheme);

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
        <Search />
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
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  grid-area: main;
`