const FaceDetection = ({ imageUrl, box }) => {
  return (
    <div className="p-4 shadow-lg relative">
        <img 
          className="max-w-xs mx-auto rounded w-full"
          id="input-image"
          alt={imageUrl} 
          src={imageUrl}
        />
        <div className="absolute flex flex-wrap cursor-pointer justify-center"
          style={{
            boxShadow: '0 0 0 3px #149DF2 inset',
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        ></div>
    </div>
  )
}

export default FaceDetection;