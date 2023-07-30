import { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmitRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
  
      const user = await response.json();  
      if (user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home');
      }
    } catch (error) {
      throw error;
    }
  }

  render () {
    return (
      <div className="flex justify-center items-center  h-[calc(100%-56px)]">
        <div className="w-full max-w-xs">
          <form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
            onSubmit={this.onSubmitRegister}
          >
  
          <p className="font-oswald text-2xl mb-4">Register</p>
  
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2 font-oswald text-left" 
                htmlFor="name"
              >
                Name
              </label>
  
              <input 
                className="shadow border w-full py-2 px-3 text-gray-700 focus:shadow-outline rounded-l outline-none focus:bg-cyan-50 focus:border-blue-500" 
                id="name" 
                placeholder="Name" 
                required 
                type="text" 
                onChange={this.onNameChange}
              />
            </div>
  
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2 font-oswald text-left" 
                htmlFor="username"
              >
                Email
              </label>
  
              <input 
                className="shadow border w-full py-2 px-3 text-gray-700 focus:shadow-outline rounded-l outline-none focus:bg-cyan-50 focus:border-blue-500" 
                id="username" 
                placeholder="Username" 
                required 
                type="email" 
                onChange={this.onEmailChange}
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
                placeholder="******************" 
                required 
                type="password" 
                onChange={this.onPasswordChange}
              />
            </div>
  
            <div className="flex items-center justify-between">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-oswald focus:bg-blue-600" 
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Register;