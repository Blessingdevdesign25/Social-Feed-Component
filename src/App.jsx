import SocialFeed from './components/SocialFeed'
import './index.css'

function App() {
  return (
    <div className="App">
       <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.025em'
          }}>
            SocialConnect
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Your unified daily feed</p>
       </header>
       <main>
          <SocialFeed />
       </main>
    </div>
  )
}

export default App
