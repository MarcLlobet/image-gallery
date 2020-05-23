import 'lato-font'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../theme'
import Wrapper from './wrapper'
import Grid from './grid'
import Clipboard from './clipboard'
import Header from './header'

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header />
        <Grid />
        <Clipboard />
      </Wrapper>
    </ThemeProvider>
  </>
)

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    color: #333;
    margin: 0;
    font-family: 'Lato', Calibri, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`

export default App
