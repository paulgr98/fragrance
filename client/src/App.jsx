import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/Header/Header'
import FooterComponent from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <HeaderComponent />
        <main className="flex-grow-1">
          <div className="container">
          </div>
        </main>
        <FooterComponent />
      </div>
    </Router>
  )
}

export default App