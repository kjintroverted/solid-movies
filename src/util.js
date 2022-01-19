import { createContext } from "react"

// https://poolors.com/1c0038-10e7ef-fefeff-c499f1
export const THEME = {
  light: '#1c0038',
  dark: '#fefeff',
  primary: '#10e7ef',
  secondary: '#c499f1'
}

export const AppTheme = createContext(THEME)

export const SEARCH_DELAY = 1000;
