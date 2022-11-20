import "reflect-metadata"

import { GlobalStyle } from './styles/GlobalStyle'

import { SignInPage } from './pages/SignIn'
import AppProvider from './hooks'

export function App() {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <SignInPage />
      </AppProvider>
    </>
  )
}