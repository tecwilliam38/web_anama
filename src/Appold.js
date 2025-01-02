import logo from './logo.svg';
import './App.css';
import Menu from './components/navbar';

function App() {
  return (
    <>
      <div id="bg">

        <div className="App">
          <Menu/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            Anama
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </div>
    </>
  );
}

export default App;
