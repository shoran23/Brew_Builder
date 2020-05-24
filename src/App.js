import React, { Component } from 'react';
import './App.css';
import Welcome from './components/Welcome.js'
import Header from './components/Header.js'
import ReferenceDashboard from './components/ReferenceDashboard.js'
import RecipeDb from './components/RecipeDb.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

class App extends React.Component {
  state = {
    showHomeBtn: true,
    loggedIn: false,
    showWelcome: true,
    showDash: true,
    srmColors: [
      '#F8F4B4','#F9E06C','#F4CE51','#F2BE37','#EDAC1D','#E59C1A','#DF8F17','#D6801A','#CF731C','#BD591B',
      '#C3621A','#C86B1A','#B7521A','#AD4418','#AE4817','#AD4418','#A73D16','#A23A15','#9D3414','#983015',
      '#932A14','#8D2615','#892516','#832311','#7D200E','#771D0D','#731C0A','#70180D','#6A150C','#67110A',
      '#63100B','#5F0F0A','#5B0A0A','#58080B','#53080D','#4B090C','#450B0A','#400B0E','#3C0B0E','#240A0B'
    ]
  }
  handleWelcome = state => {
    this.setState({showWelcome: state})
  }
  handleDash = state => {
    this.setState({showDash: state})
    if(this.state.showWelcome === true){
      this.setState({showWelcome: false})
    }
  }
  render() {
    return (
      <div className='App'>
        <Header 
          handleWelcome={this.handleWelcome}
          handleDash={this.handleDash}

        />
        { this.state.showWelcome ?
          <Welcome />
        :
          <div>
            { this.state.showDash ?
              <ReferenceDashboard 
                srmColors={this.state.srmColors}
              />
            :
              <RecipeDb
                srmColors={this.state.srmColors}
              />
            }
          </div>
        }
      </div>
    )
  }
}
export default App;
