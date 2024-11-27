import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/AdminLogin';
import RoleSelect from './components/RoleSelect';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <LoginForm />
    //   </header>
    // </div>

    //We create a main router - which  a
    <Router>
      <Routes>
        <Route path='/' element={<RoleSelect />}/>
        <Route path='/login' element={<LoginForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
