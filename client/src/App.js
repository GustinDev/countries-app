import './App.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={Home} />
        <Route path='/activities' component={Form} />
        <Route path='/countries/:id' component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
