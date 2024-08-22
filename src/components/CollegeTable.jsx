import CollegeRow from "./CollegeRow"
const CollegeTable = ({
  filteredData,
  visibleRows,
  sortCriteria,
  sortOrder,
  handleSort,
  toggleDropdown,
  handleBranchChange,
  selectedBranch,
  dropdownOpen,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="text-white ">
          {[
            { label: "CD Rank", criteria: "cdRank" },
            { label: "Colleges", criteria: "" },
            { label: "Course Fees", criteria: "courseFees" },
            { label: "Placement", criteria: "placement.avgPackage" },
            { label: "User Reviews", criteria: "userReviews.rating" },
            { label: "Ranking", criteria: "" },
          ].map((header) => (
            <th
              key={header.label}
              className={`py-3 px-4 border-b bg-[#78bec3] ${
                header.criteria ? "cursor-pointer" : ""
              } sticky top-0`}
              onClick={() => header.criteria && handleSort(header.criteria)}
            >
              {header.label}{" "}
              {sortCriteria === header.criteria &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.slice(0, visibleRows).map((college) => (
          <CollegeRow
            key={college.id}
            college={college}
            toggleDropdown={toggleDropdown}
            handleBranchChange={handleBranchChange}
            selectedBranch={selectedBranch}
            dropdownOpen={dropdownOpen}
          />
        ))}
      </tbody>
    </table>
  );
};


export default CollegeTable;
