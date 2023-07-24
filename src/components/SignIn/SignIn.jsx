const SignIn = ({ onRouteChange }) => {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="w-full max-w-xs m-auto">
        <form 
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
          onSubmit={() => onRouteChange('home')}
        >

          <p className="font-oswald text-2xl mb-4">Sign In</p>

          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2 font-oswald text-left" 
              htmlFor="username"
            >
              Username
            </label>

            <input 
              className="shadow border w-full py-2 px-3 text-gray-700 focus:shadow-outline rounded-l  outline-none focus:bg-cyan-50 focus:border-blue-500" 
              id="username" 
              placeholder="Username" 
              required 
              type="text" 
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

export default SignIn;