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
    this.state = {
      imageURL: '',
      input: ''
    };
  }

  getClarifieApiOptions = (imageUrl = this.state.imageURL) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '3a35e230522c486f9dfe7403802cb0fc';

    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'working-latin-anywise';       
    const APP_ID = 'smartbrain';

    // Change these to whatever model and image URL you want to use
    const DEFAULT_IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
  
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl || DEFAULT_IMAGE_URL
                    }
                }
            }
        ]
    });
  
    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  }

  onSubmit = async () => {

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    try {
      const response = await fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, this.getClarifieApiOptions())
      const data = await response.json();

      if (data) {}
    } catch (error) {
      throw error;
    }

    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, this.getClarifieOptions())
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
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
