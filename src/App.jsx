import { useState, useEffect, useMemo } from "react";
import { cdRank } from "./utils/constant"; 
import SearchBar from "./components/SearchBar";
import CollegeTable from "./components/CollegeTable";

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


    const initialSelectedBranch = initialData.reduce((acc, college) => {
      if (college.branches.length > 0) {
        const topBranch = college.branches[0];
        acc[college.id] = {
          branchName: topBranch.branchName,
          cutoff: topBranch.jeeAdvancedCutoffs[2023] || "N/A", 
        };
      }
      return acc;
    }, {});
    setSelectedBranch(initialSelectedBranch);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setVisibleRows(10); 
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
          result = parseFloat(a.courseFees) - parseFloat(b.courseFees);
          break;
        case "placement.avgPackage":
          result = parseFloat(a.placement.avgPackage) - parseFloat(b.placement.avgPackage);
          break;
        case "userReviews.rating":
          result = parseFloat(a.userReviews.rating) - parseFloat(b.userReviews.rating);
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
    <div className="p-4" onScroll={handleScroll}>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <CollegeTable
        filteredData={filteredData}
        visibleRows={visibleRows}
        sortCriteria={sortCriteria}
        sortOrder={sortOrder}
        handleSort={handleSort}
        toggleDropdown={toggleDropdown}
        handleBranchChange={handleBranchChange}
        selectedBranch={selectedBranch}
        dropdownOpen={dropdownOpen}
      />
      {filteredData.length > visibleRows && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={loadMoreRows} 
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
