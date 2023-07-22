import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import FaceDetection from './components/FaceDetection/FaceDetection';

class App extends Component {

  constructor () {
    super();
    this.state = {
      imageUrl: '',
      input: '',
      faceBoundsBox: {}
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value.trim() })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    this.getFaceDetectionData()
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
      const response = 
        await fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, 
          this.getClarifaiApiOptions(this.state.imageUrl)
        );

      const data = await response.json();
      this.displayFaceBox(this.calculateFaceLocation(data));
    } catch (error) {
      throw error;
    }
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

  displayFaceBox = (box) => {
    this.setState({ faceBoundsBox: box });
  }

  render () {
    return (
      <div className="App">
        <ParticlesBg 
          type="lines" 
          bg={true} 
          num={30} 
        />  

        <Navigation />
        <Logo />
        <Rank rank={4}/>

        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />

        <FaceDetection
          box={this.state.faceBoundsBox} 
          imageUrl={this.state.imageUrl} 
        />
      </div>
    );
  }
}

export default App;
