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

export function overallScore(rating) {
  if (!rating.story
    || !rating.character
    || !rating.performance
    || !rating.visuals
    || !rating.soundtrack
  ) return null;
  let res = (
    rating.story
    + (rating.character + rating.performance) / 2
    + (rating.visuals + rating.soundtrack) / 2
  ) / 3;
  return Math.round(res * 10) / 10;
}

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
