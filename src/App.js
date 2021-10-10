import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import ReposList from './components/ReposList';
import Form from './components/Form'
import { useState ,useEffect} from 'react';
function App() {
  

  return (
    <div className="App">
      <Header name="Ahmed" />
      <ReposList ></ReposList>
      
    </div>
  );
}

export default App;
