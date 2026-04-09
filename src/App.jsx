import SocialFeed from './components/SocialFeed'
import './index.css'

function App() {
  return (
    <div className="App">
       <header className="app-header">
          <h1 className="brand-name">SocialConnect</h1>
          <p className="app-tagline">Your unified daily feed</p>
       </header>
       <main>
          <SocialFeed />
       </main>
    </div>
  )
}

export default App
