import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Home from './pages/Home.tsx'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
`

function App() {
  return (
    <Router>
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  )
}

export default App
