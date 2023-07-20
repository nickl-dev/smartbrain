import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'

class App extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <div className="App">
        <ParticlesBg type="lines" bg={true} num={30} />  
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;
