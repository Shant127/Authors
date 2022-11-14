import './App.css';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <fieldset>
      <legend>App.jsx</legend>
      <Routes>
        <Route path="/" element = {<Create />} />
        <Route path="/authors" element = {<Dashboard />} />
        <Route path="/authors/edit/:author_id" element = {<Edit />} />
      </Routes>
    </fieldset>

  );
}

export default App;
