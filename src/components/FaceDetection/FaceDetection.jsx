const FaceDetection = ({ imageUrl, box }) => {
  return (
    <div className="p-4 shadow-lg">
      <div className="relative mt-2 inline-block">
        <img 
          className="w-full rounded max-w-sm h-auto"
          id="input-image"
          alt={imageUrl} 
          src={imageUrl}
          // width="500px"
          // height="auto"
        />
          <div 
          className='absolute flex flex-wrap cursor-pointer justify-center' 
          style={{
            boxShadow: '0 0 0 3px #149DF2 inset',
            top: box.topRow,
            right: box.rightCol, 
            bottom: box.bottomRow, 
            left: box.leftCol
          }}>
        </div>
        
      </div>
    </div>
  )
}

export default FaceDetection;