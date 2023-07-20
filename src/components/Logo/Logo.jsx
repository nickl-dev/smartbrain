import Tilt from 'react-parallax-tilt';
import Brain from '../../assets/images/icons8-brain-100.png';

const Logo = () => {
  return (
    <div className='mx-auto sm:ml-10 md:ml-20 lg:ml-32 w-32 shadow-lg p-4 rounded-lg mt-10 bg-neutral-200'>
        <Tilt style={{ backgroundColor: 'linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)' }} >
          <img src={Brain} alt="Brain emoji" className='w-full' />
        </Tilt>
    </div>
  )
}

export default Logo;