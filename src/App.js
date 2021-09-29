import './App.css';
import Header from './Components/Common/Header';
import ToDoList from './Components/ToDoList';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Users from './Components/Users';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <br />
        <div style={{ marginLeft: '2rem', marginRight: '2rem' }}>

          <Switch>
            <Route path='/' exact component={withRouter(ToDoList)} />
            <Route path='/toDoList' exact component={withRouter(ToDoList)} />
            <Route path='/users' exact component={withRouter(Users)} />



          </Switch>
        </div>

      </Router>

      {/* <ToDoList /> */}




    </div>
  );
}

export default App;
