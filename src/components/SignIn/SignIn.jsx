import React, { Component } from 'react';

class SignIn extends Component {
  constructor (props) {
    super(props);

    this.state = {
      signInEmail : '',
      signInPassword: ''
    }
  }

  onSignInEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value })
  }

  onSignInPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value })
  }
  
  onSubmitSignin = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })

    const data = await response.json();

    if (data === 'success') this.props.onRouteChange('home');
  }

  render () {
    return (
      <div className="flex justify-center items-center h-[calc(100%-56px)]">
        <div className="w-full max-w-xs m-auto">
          <form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
            onSubmit={this.onSubmitSignin}
          >
  
            <p className="font-oswald text-2xl mb-4">Sign In</p>
  
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2 font-oswald text-left" 
                htmlFor="email"
              >
                Email
              </label>
  
              <input 
                className="shadow border w-full py-2 px-3 text-gray-700 focus:shadow-outline rounded-l  outline-none focus:bg-cyan-50 focus:border-blue-500" 
                id="email" 
                onChange={this.onSignInEmailChange}
                placeholder="Email" 
                required 
                type="email" 
              />
            </div>
          
            <div className="mb-6">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2 font-oswald text-left" 
                htmlFor="password"
              >
                Password
              </label>
  
              <input 
                className="shadow border w-full py-2 px-3 text-gray-700 focus:shadow-outline rounded-l  outline-none focus:bg-cyan-50 focus:border-blue-500" 
                id="password" 
                onChange={this.onSignInPasswordChange}
                placeholder="******************" 
                required 
                type="password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-oswald focus:bg-blue-600" 
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignIn;