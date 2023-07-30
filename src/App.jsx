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

  getClarifaiApiOptions = (imageUrl) => {
    
    const { REACT_APP_CLARIFAI_API_PAT, REACT_APP_CLARIFAI_API_USER_ID, REACT_APP_CLARIFAI_API_APP_ID } = process.env;
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
  
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": REACT_APP_CLARIFAI_API_USER_ID,
            "app_id": REACT_APP_CLARIFAI_API_APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });
  
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + REACT_APP_CLARIFAI_API_PAT
        },
        body: raw
    };
  }

  getFaceDetectionData = async () => {
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    try {
      const response = await fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, 
      this.getClarifaiApiOptions(this.state.input)
    );

      const data = await response.json();

      if (data) {
        const entryResponse = await fetch('http://localhost:3000/image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id })
        })

        const entryData = await entryResponse.json();

        if (entryData) this.setState(Object.assign(this.state.user, { entries: entryData }))
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
