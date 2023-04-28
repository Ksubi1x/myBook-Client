import './App.css';
import Login from './components/LoginPage/Login'
import Register from './components/RegisterPage/Register'
import Home from './components/HomePage/Home'
import Create from './components/makePost/Create';
import Navbar from './components/Navbar/Navbar'
import PostPage from './components/postPage/postPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthContext } from './helpers/AuthContext'
import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({username: "", id: 0, status: false})

  useEffect( () => {
    
    axios.get('https://mybook12.herokuapp.com/auth/auth', { headers: {accessToken: sessionStorage.getItem('accessToken') } } ).then((response) => {
      if (response.data.error){
        setAuthState({...authState, status: false})

      }
      else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        })
        
      }
    })
  }, [])

  // blank


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='wrapper'>
            
            <Switch>

              {/* DEFAULT PAGE WHICH IS LOGIN */}

              <Route exact path='/'>
                <div className='container'>
                  <div className='loginPage'>
                    <Login />
                  </div>
                </div>
              </Route>
              

              {/* LOGIN PAGE */}
              
                <Route path='/login'>
                  <div className='container'>
                    <div className='loginPage'>
                      <Login />
                    </div>
                  </div>
                </Route>
            

              {/* REGISTER PAGE */}
                <Route path='/register'>
                  <div className='container'>
                    <div className='registerPage'>
                      <Register />
                    </div>
                  </div>
                </Route>
            

              {/* HOME PAGE */}
              <Route path='/home'>
                <Navbar />
                <div className='homeContainer'>
                  <Home />
                </div>
              </Route>

              {/* Create Post */}
              <Route path='/create'>
                <div className='createContainer'>
                  <Create />
                </div>
              </Route>

              {/* Specific post */}
              <Route path='/post/:id' exact component={PostPage}>
              </Route>

            </Switch>
        
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
      
    
  );
}

export default App;
