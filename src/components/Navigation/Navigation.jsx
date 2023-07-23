const Navigation = ({ isSignedIn, onRouteChange }) => {
  if (isSignedIn) {
    return (
      <nav className="p-4 flex justify-end items-center">
        <span 
          className="font-semibold hover:underline text-neutral-50 hover:text-neutral-100 cursor-pointer font-oswald"
          onClick={() => onRouteChange('signout')}
        >
          Sign Out
        </span>
      </nav>
    )
  } else {
    <nav className="p-4 flex justify-end items-center">
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
    </nav>
  }
}

export default Navigation;