const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="p-4">
      <p className="text-neutral-50">{'SmartBrain will detect faces in your pictures. Paste a URL below to see what happens!'}</p>

      <div className="bg-yellow-500 flex justify-center w-full max-w-lg mx-auto mt-4 rounded shadow-lg p-3 sm:p-4 md:p-6">
        <input 
          type="text" 
          className="rounded-l w-full outline-none px-2 py-1 focus:bg-cyan-50" 
          placeholder={'Paste URL here...'}
          onChange={onInputChange}
        />
        
        <button 
          className="bg-purple-500 p-2 rounded-r font-semibold text-neutral-50 outline-none focus:bg-purple-600 hover:bg-purple-600"
          onClick={onButtonSubmit}
          >
            {'Detect'}
          </button>
      </div>
    </div>
  )
}

export default ImageLinkForm;