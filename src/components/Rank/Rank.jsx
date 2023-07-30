const Rank = ({ entries, name }) => {
  return (
    <div className="mt-10 mb-2">
      <p className="text-2xl text-neutral-100 font-oswald">
        {name}, your entry count is:
      </p>
      <p className="text-3xl text-neutral-50 font-mono font-bold">
        {entries}
      </p>
    </div>
  )
}

export default Rank;