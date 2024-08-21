import TableHeader from "./TableHeader";
import CollegeRow from "./CollegeRow";

const CollegeTable = ({
  data,
  searchTerm,
  sortCriteria,
  sortOrder,
  handleSort,
  handleSearch,
  visibleRows,
  handleScroll,
  loadMoreRows,
  selectedBranch,
  handleBranchChange,
}) => {
  return (
    <div className="overflow-y-auto" onScroll={handleScroll}>
      <table className="min-w-full bg-white border border-gray-300">
        <TableHeader
          sortCriteria={sortCriteria}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
        <tbody>
          {data.slice(0, visibleRows).map((college) => (
            <CollegeRow
              key={college.id}
              college={college}
              selectedBranch={selectedBranch}
              handleBranchChange={handleBranchChange}
            />
          ))}
        </tbody>
      </table>
      {visibleRows < data.length && (
        <div className="text-center py-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={loadMoreRows}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CollegeTable;
