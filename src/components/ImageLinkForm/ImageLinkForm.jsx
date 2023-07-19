const ImageLinkForm = () => {
  return (
    <div className="p-4 mt-10">
      <p>{'SmartBrain will detect faces in your pictures. Paste a URL below to see what happens!'}</p>

      <div className="bg-neutral-900 flex justify-center w-full max-w-lg mx-auto mt-4 rounded shadow-lg p-4">
        <input 
          type="text" 
          className="rounded-l w-full outline-none px-2 py-1 focus:bg-cyan-100" 
          placeholder={'Paste URL here...'} 
        />
        
        <button className="bg-purple-500 p-2 rounded-r font-semibold text-neutral-50">{'Detect'}</button>
      </div>
    </div>
  )
}

export default ImageLinkForm;