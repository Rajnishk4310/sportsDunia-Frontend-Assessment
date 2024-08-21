

const SearchBar = ({ searchTerm, handleSearch }) => (
  <>
    <input
      type="text"
      placeholder="Search College"
      value={searchTerm}
      onChange={handleSearch}
      className="mb-4 p-2 w-full border rounded shadow-md"
      aria-label="Search College"
    />
  </>
);

export default SearchBar;
