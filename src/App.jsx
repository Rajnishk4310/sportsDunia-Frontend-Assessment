import { useState, useEffect, useMemo } from "react";
import { cdRank } from "./utils/constant"; // Ensure cdRank is correctly imported
import { FaArrowRight, FaDownload } from "react-icons/fa";
import RankingsDropdown from "./components/RankingsDropdown";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("cdRank");
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleRows, setVisibleRows] = useState(10);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});

  useEffect(() => {
    const initialData = cdRank;
    setData(initialData);

    // Initialize selectedBranch with the top branch and its JEE Advanced cutoff for each college
    const initialSelectedBranch = initialData.reduce((acc, college) => {
      if (college.branches.length > 0) {
        const topBranch = college.branches[0];
        acc[college.id] = {
          branchName: topBranch.branchName,
          cutoff: topBranch.jeeAdvancedCutoffs[2023] || "N/A", // Provide default value if cutoff is not available
        };
      }
      return acc;
    }, {});
    setSelectedBranch(initialSelectedBranch);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setVisibleRows(10); // Reset visible rows on search
  };

  const handleSort = (criteria) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortCriteria(criteria);
    setSortOrder(order);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let result = 0;
      switch (sortCriteria) {
        case "cdRank":
          result = a.cdRank - b.cdRank;
          break;
        case "courseFees":
          result = a.courseFees - b.courseFees;
          break;
        case "placement.avgPackage":
          result = a.placement.avgPackage - b.placement.avgPackage;
          break;
        case "userReviews.rating":
          result = a.userReviews.rating - b.userReviews.rating;
          break;
        default:
          break;
      }
      return sortOrder === "asc" ? result : -result;
    });
  }, [data, sortCriteria, sortOrder]);

  const filteredData = useMemo(() => {
    return sortedData.filter((college) =>
      college.collegeName.toLowerCase().includes(searchTerm)
    );
  }, [sortedData, searchTerm]);

  const loadMoreRows = () => {
    setVisibleRows((prev) => prev + 10);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      loadMoreRows();
    }
  };

  const handleBranchChange = (collegeId, branchName) => {
    const selectedBranchData = data
      .find((college) => college.id === collegeId)
      .branches.find((branch) => branch.branchName === branchName);

    setSelectedBranch((prev) => ({
      ...prev,
      [collegeId]: {
        branchName: selectedBranchData.branchName,
        cutoff: selectedBranchData.jeeAdvancedCutoffs[2023] || "N/A",
      },
    }));
    setDropdownOpen((prev) => ({ ...prev, [collegeId]: false }));
  };

  const toggleDropdown = (collegeId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [collegeId]: !prev[collegeId],
    }));
  };

  return (
    <div className="mx-auto p-4">
      <input
        type="text"
        placeholder="Search College"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 w-full border rounded shadow-md"
        aria-label="Search College"
      />

      <div className="overflow-y-auto" onScroll={handleScroll}>
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
              <tr
                key={college.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-6 border-r">#{college.cdRank}</td>
                <td className="py-4 px-6 border-r">
                  <div className="flex items-center space-x-4">
                    <img
                      src={college.collegeLogo}
                      alt={college.collegeName}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-bold text-[#78bec3] text-lg">
                        {college.collegeName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {college.address}
                      </div>
                      <div className="relative mt-2">
                        <button
                          className="p-2 border rounded border-0 w-full text-left flex justify-between items-center bg-amber-50"
                          onClick={() => toggleDropdown(college.id)}
                        >
                          <div>
                            <div className="font-bold text-orange-400">
                              {selectedBranch[college.id]?.branchName ||
                                "Select Branch"}
                            </div>
                            <div className="text-sm ">
                              JEE-Advanced 2023 Cutoff:{" "}
                              {selectedBranch[college.id]?.cutoff || "N/A"}
                            </div>
                          </div>
                          <span className="text-gray-500">
                            {dropdownOpen[college.id] ? "^" : "v"}
                          </span>
                        </button>
                        {dropdownOpen[college.id] && (
                          <div className="absolute left-0 w-full bg-white border rounded shadow-md mt-1">
                            {college.branches.map((branch) => (
                              <div
                                key={branch.branchName}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                  handleBranchChange(
                                    college.id,
                                    branch.branchName
                                  )
                                }
                              >
                                <div className="font-bold text-orange-400">
                                  {branch.branchName}
                                </div>
                                <div className="text-sm">
                                  JEE-Advanced 2023 Cutoff:{" "}
                                  {branch.jeeAdvancedCutoffs[2023] || "N/A"}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center space-x-4">
                    <button className="text-orange-400 font-bold py-1 px-3 flex items-center hover:text-orange-600 transition">
                      <FaArrowRight className="mr-2" /> Apply Now
                    </button>

                    <button className="text-[#3e878e] py-1 px-3 flex items-center hover:text-[#2f656a] transition">
                      <FaDownload className="mr-2" /> Download Brochure
                    </button>

                    <div className="flex items-center space-x-1">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-700">Add to Compare</span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-r">
                  <div className="text-[#78bec3] font-bold">
                    ₹ {college.courseFees}
                  </div>
                  <p className="text-xs">BE/B.Tech</p>
                  <div className="text-xs">-1st Year Fees</div>
                  <div className="mt-2 text-left">
                    <button className="text-orange-500 font-bold hover:text-orange-700 transition">
                      ⇄ Compare Fees
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6 border-r">
                  <div className="text-[#78bec3] font-bold">
                    ₹{college.placement.avgPackage}
                  </div>
                  <div className="text-xs">Avg Package</div>
                  <div className="text-[#78bec3] font-bold">
                    ₹{college.placement.highestPackage}
                  </div>
                  <div className="text-xs">Highest Package</div>
                  <button className="text-orange-500 font-bold mt-2 flex items-center hover:text-orange-700 transition">
                    ⇄ Compare Placement
                  </button>
                </td>
                <td className="py-4 px-6 border-r">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-500 text-xl font-bold">●</span>
                    <span className="text-lg font-semibold text-gray-400">
                      {college.userReviews.rating} / 10
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Based on {college.userReviews.numberOfReviews} users
                    <div className="text-xs">Reviews</div>
                  </div>
                        <button className="text-xs text-orange-500 bg-amber-50">✓ {college.userReviews.best[0]} ⋎</button>
                </td>

                <td className="py-4 px-6">
                  <div className="text-gray-400 font-bold">
                    #{college.ranking.rank}/
                    <span className="text-orange-400">
                      {college.ranking.total}
                    </span>{" "}
                    in India
                  </div>
                  <div>{college.ranking.by}</div>
                  <RankingsDropdown
                    rankingsList={college.ranking.rankingsList}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
