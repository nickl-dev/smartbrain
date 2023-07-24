const Navigation = ({ isSignedIn, onRouteChange }) => {
  return (
    <nav className="p-4 flex justify-end items-center gap-2">
      { isSignedIn 
        ? 
        <>
          <span 
            className="font-semibold hover:underline text-neutral-50 hover:text-neutral-100 cursor-pointer font-oswald"
            onClick={() => onRouteChange('signout')}
          >
            Sign Out
          </span>
        </>
        : 
        <>
          <span 
            className="font-semibold hover:underline text-neutral-50 hover:text-neutral-100 cursor-pointer font-oswald"
            onClick={() => onRouteChange('signin')}
          >
            Sign In
          </span>
          <span 
            className="font-semibold hover:underline text-neutral-50 hover:text-neutral-100 cursor-pointer font-oswald"
            onClick={() => onRouteChange('register')}
          >
            Register
          </span>
        </>
      }
    </nav>
  )
}

export default Navigation;