import './App.css';
import User from './pages/User';
import News from './pages/News';
import Nice from './pages/Nice';
function App() {
  return (
    <div className="App">
      <Nice/>
      {/* <User/> */}
      <News/>
    </div>
  );
}

export default App;
