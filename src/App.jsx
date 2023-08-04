import FaceDetection from './components/FaceDetection/FaceDetection';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ParticlesBg from 'particles-bg'
import Rank from './components/Rank/Rank';
import React, { Component } from 'react';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';

class App extends Component {

  constructor () {
    super();
    this.state = {
      imageUrl: '',
      input: '',
      faceBoundsBox: {},
      isSignedIn: false,
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value.trim() })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    this.getFaceDetectionData()
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  updateEntries = (count) => {
    this.setState(Object.assign(this.state.user, { entries: count }))
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (faceBoundsBox) => {
    this.setState({ faceBoundsBox });
  }

  getFaceDetectionData = async () => {
    try {
      const response = await fetch('http://localhost:3000/imageurl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: this.state.input })
      })

      const data = await response.json();

      if (data) {
        try {
          const entryResponse = await fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id })
          })
  
          const entryCount = await entryResponse.json();
  
          if (entryCount) this.setState(Object.assign(this.state.user, { entries: entryCount }))
        } catch (error) {
          throw error;
        }
      }
      
      this.displayFaceBox(this.calculateFaceLocation(data));
    } catch (error) {
      throw error;
    }
  }

  render () {
    const { route, isSignedIn, faceBoundsBox, imageUrl, user } = this.state;
    
    return (
      <div className="App h-screen text-center">
        <ParticlesBg 
          bg={true} 
          num={30} 
          type="lines"
        />

        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange} 
        />

        { route === 'home' ?
          <>
            <Logo />
            <Rank 
              entries={user.entries}
              name={user.name}
            />

            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
            />

            <FaceDetection
              box={faceBoundsBox} 
              imageUrl={imageUrl} 
            />
          </>
        : (
          route === 'signin' 
            ? <SignIn 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} 
              />
            : <Register 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} 
              />
          )
        }
      </div>
    );
  }
}

export default App;
