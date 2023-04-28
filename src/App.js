import React from 'react';
import './App.css';
import {
  Main,
  appLogin,
  getDomain,
  loadDataset,
  loadThing,
  save,
  SaveState,
  Profile,
  profileStruct,
  newTheme
} from 'solid-core';
import { useEffect, useState } from 'react';
import { handleIncomingRedirect, getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import * as mui from '@material-ui/core';
import Dashboard from './components/Dashboard';
import { AppTheme, THEME } from './util';

const muiTheme = newTheme(THEME)

function App() {

  const [user, setUser] = useState();
  const [queue, updateQueue] = useState([]);
  const [dataset, setDataset] = useState(null);
  // PROFILE STATE
  const [profile, setProfile] = useState();
  const [edit, toggleEdit] = useState(false);

  async function saveFromQ() {
    let dataset = await save(queue);
    updateQueue([])
    setDataset(dataset)
  }

  useEffect(() => {
    const getUser = async function () {
      await handleIncomingRedirect()
      let { info } = getDefaultSession()
      if (info.isLoggedIn) setUser(info.webId)
      // else await appLogin()
    }
    getUser()
  }, [])

  // USER LOADED => GET SESSION
  useEffect(() => {
    if (user) {
      // LOAD PROFILE
      loadThing(user, profileStruct)
        .then(res => {
          if (res instanceof Error) {
            console.error(res)
          }
          else setProfile(res)
        })
    }
  }, [user])

  // SESSION CONFIRMED => GET DATA
  useEffect(() => {
    if (profile) {
      // LOAD MOVIE DATASET
      loadDataset(getDomain(user) + "/movies")
        .then(setDataset)
    }
  }, [profile, user])

  return (
    <SaveState.Provider value={ { queue, updateQueue, saveFromQ, dataset, setDataset } }>
      <AppTheme.Provider value={ { ...THEME, mui } }>
        <mui.ThemeProvider theme={ muiTheme }>
          <Main>
            <Router>
              <Routes>
                <Route path="/" element={ <Dashboard login={async () => await appLogin()} user={ profile } /> } />
                <Route path="/profile"
                  element={
                    <SaveState.Consumer>
                      {
                        saveState => (
                          <Profile
                            profile={ profile }
                            edit={ edit }
                            toggleEdit={ toggleEdit }
                            ui={ mui }
                            theme={ THEME }
                            saveState={ saveState }
                            onChange={ setProfile }
                          />
                        )
                      }
                    </SaveState.Consumer>
                  } />
              </Routes>
            </Router>
          </Main>
        </mui.ThemeProvider>
      </AppTheme.Provider>
    </SaveState.Provider>
  );
}

export default App;