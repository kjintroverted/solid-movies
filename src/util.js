import { createContext } from "react"

const KEY = "9c3bca4";

// https://poolors.com/1c0038-10e7ef-fefeff-c499f1
export const THEME = {
  light: '#1c0038',
  dark: '#fefeff',
  primary: '#10e7ef',
  secondary: '#c499f1'
}

export const AppTheme = createContext(THEME)

export const SEARCH_DELAY = 500;

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

export const RATINGS = {
  story: [
    `I'm staring at a blank screen`,
    `The story is nonsense`,
    `The story is not very relatable or meaningful`,
    `The story is confusing and I'm not sure what the point is`,
    `The story isn't important`,
    `The story is basic and serves as a setting for the characters`,
    `The story is interesting and challenges my expectations`,
    `The story is interesting and challenges the norm in meaningful ways`,
    `The story is interesting and full of meaningful exploration`,
    `The perfect story. Meaningful. Powerful, Timeless.`
  ],
  character: [
    `I saw a dead bird in the parking lot and went home`,
    `The characters make no sense and served no purpose`,
    `The characters are not very relatable`,
    `The characters are inconsistent and their motives are confusing`,
    `The characters are somewhat predictable and bland`,
    `The characters are interesting and relatable`,
    `The characters are relatable and experience meaningful growth`,
    `The characters are well-realized, nuanced, and experience meaningful growth`,
    `The characters are enthralling. I want to know more about them.`,
    `I would watch a movie of these characters just talking to one another`
  ],
  performance: [
    `They just cast that dead bird from the parking lot`,
    `The performers clearly don't want to be in this movie`,
    `The performers don't portray the characters well`,
    `The performers are distracting`,
    `The performers are fine, I don't notice them much`,
    `Some/most of the performances are good`,
    `The performers have good chemistry and really bring the characters to life`,
    `Excellent performance, I have a hard time imagining a different cast`,
    `Perfectly cast with stand-out performances`,
    `Perfectly cast, delivering the performance of a lifetime`
  ],
  visuals: [
    `I think it's a radio drama actually...`,
    `The visuals make it hard to watch/follow`,
    `The visuals are constantly distracting`,
    `The visuals are fine, but some of the choices are distracting`,
    `There is nothing notable about the visuals`,
    `There are a couple scenes with striking visuals`,
    `The visuals are good and really enhance the story-telling`,
    `There are a lot of effective visuals with a lot of imagery`,
    `There are constantly powerful visuals with striking imagery`,
    `The visuals tell a story on their own`
  ],
  soundtrack: [
    `Oh, this is a talkie?`,
    `The soundtrack is apparently just the director's garbage playlist`,
    `The soundtrack is distracting and doesn't fit the scenes well`,
    `The soundtrack is mostly fine, but a little distracting`,
    `There is nothing notable about the soundtrack`,
    `The music/sounds in a couple scenes really enhance the impact`,
    `The soundtrack is good and enhance the story-telling`,
    `A lot of the songs are clearly intentionally chose to fit the scenes`,
    `Every song and sound is intentional and impactful`,
    `The soundtrack is used to tell a story of its own`
  ]
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
