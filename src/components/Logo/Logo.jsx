import Tilt from 'react-parallax-tilt';
import Brain from '../../assets/images/icons8-brain-100.png';


const Logo = () => {
  return (
    <div className='mt-10 mx-auto sm:ml-10 md:ml-20 lg:ml-32 w-32 shadow-lg p-4 rounded-lg'>
      <Tilt>
        <img src={Brain} alt="Brain emoji" className='w-full' />
      </Tilt>
    </div>
  )
}

export default Logo;