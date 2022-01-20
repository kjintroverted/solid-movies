import { createContext } from "react"

// https://poolors.com/1c0038-10e7ef-fefeff-c499f1
export const THEME = {
  light: '#1c0038',
  dark: '#fefeff',
  primary: '#10e7ef',
  secondary: '#c499f1'
}

export const AppTheme = createContext(THEME)

export const SEARCH_DELAY = 500;
const KEY = "9c3bca4";

export async function searchMovies(q) {
  let res = await fetch(`https://www.omdbapi.com/?apikey=${ KEY }&s=${ q }`);
  let body = await res.json()
  return body.Search ? body.Search : [];
}

export async function getMovieData(id) {
  let res = await fetch(`https://www.omdbapi.com/?apikey=${ KEY }&i=${ id }`);
  let body = await res.json()
  return body;
}
