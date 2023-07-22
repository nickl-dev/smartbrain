const Rank = ({ rank }) => {
  return (
    <div className="mt-10 mb-2">
      <p className="text-2xl text-neutral-100 font-oswald">
        {'User, your rank is:'}
      </p>
      <p className="text-3xl text-neutral-50 font-mono font-bold">
        {rank}
      </p>
    </div>
  )
}

export default Rank;