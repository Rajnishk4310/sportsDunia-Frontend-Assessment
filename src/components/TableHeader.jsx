

const TableHeader = ({ sortCriteria, sortOrder, handleSort }) => {
  const headers = [
    { label: "CD Rank", criteria: "cdRank" },
    { label: "Colleges", criteria: "" },
    { label: "Course Fees", criteria: "courseFees" },
    { label: "Placement", criteria: "placement.avgPackage" },
    { label: "User Reviews", criteria: "userReviews.rating" },
    { label: "Ranking", criteria: "" },
  ];

  return (
    <thead>
      <tr>
        {headers.map((header) => (
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
  );
};

export default TableHeader;
