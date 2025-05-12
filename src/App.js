import logo from './logo.svg';
import './App.css';
import PrescriptionPage  from './pages/PrescriptionPage';
import ResultsPage from './pages/ResultsPage';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrescriptionPage/>}/>
        <Route path="/results" element={<ResultsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
