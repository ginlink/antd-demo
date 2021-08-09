import React from 'react'
import { createGlobalStyle, css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { Colors } from './styled'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white: darkMode ? black : white,
    black: darkMode ? black : white,

    // text
    text1: '#000000',
    text2: '#565A69',
    text3: '#6E727D',
    text4: '#C3C5CB',
    text5: '#EDEEF2',

    // backgrounds / greys
    bg0: darkMode ? black : '#FFF',
    bg1: darkMode ? black : 'rgba(245, 246, 250, 1)',
    bg2: '#fff',
    bg3: '#CED0D9',
    bg4: '#888D9B',
    bg5: '#888D9B',
    bg6: '#6C7284',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: 'rgba(0, 118, 255, 1)',
    primary2: 'rgba(0, 118, 255, 0.05)',
    primary3: 'rgba(0, 118, 255, 0.1)',
    primary4: 'rgba(0, 118, 255, 0.5)',

    primary5: '#f1ecfd',

    // color text
    primaryText1: 'rgba(0, 118, 255, 1)',
    primaryText2: darkMode ? white : 'rgba(86, 90, 105, 1)',
    primaryText3: 'rgba(18, 28, 65, 1)',
    primaryText4: 'rgba(255, 255, 255, 1)',
    primaryText5: 'rgba(122, 60, 239, 1)',
    primaryText6: 'rgba(157, 158, 175, 1)',

    // secondary colors
    secondary1: '#E8006F',
    secondary2: '#F6DDE8',
    secondary3: '#f1ecfd',

    // other
    red1: '#DA2D2B',
    red2: '#DF1F38',
    red3: '#D60000',
    green1: '#007D35',
    yellow1: '#E3A507',
    yellow2: '#FF8F00',
    yellow3: '#F3B71E',
    blue1: '#0068FC',
    blue2: '#0068FC',
    error: '#DF1F38',
    success: '#007D35',
    warning: '#FF8F00',

    // dont wanna forget these blue yet
    // blue4: '#C4D9F8',
    // blue5: '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // const themeObject = useMemo(() => theme(darkMode), [darkMode])
  const themeObject = theme(false)
  // const themeObject = theme(true)

  // return null
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
  // return <StyledComponentsThemeProvider111></StyledComponentsThemeProvider111>
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: #565A69;
  background: linear-gradient(180deg, #BFDCFA 0%, #E4F1FF 0%, #EFF2FD 100%);
  /* background-image: url();
  background-repeat: no-repeat;
  background-position: center top; */
}

body{
  color: ${(props) => props.theme.primaryText2};
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`
