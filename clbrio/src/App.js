import './App.css';
import Table from './Table';

function App() {
  return (
    <div className="App">
      <script src='https://cdn.plot.ly/plotly-2.4.2.min.js'></script>
      <header className="App-header">
        Exoplanets
      </header>
      <Table/>
      <div id='plotly'></div>
    </div>
  );
}

export default App;
