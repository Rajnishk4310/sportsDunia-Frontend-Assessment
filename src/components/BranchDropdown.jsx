const BranchDropdown = ({
    college,
    toggleDropdown,
    handleBranchChange,
    selectedBranch,
    dropdownOpen,
  }) => {
    return (
      <div className="relative mt-2">
        <button
          className="p-2 border rounded border-0 w-full text-left flex justify-between items-center bg-amber-50"
          onClick={() => toggleDropdown(college.id)}
        >
          <div>
            <div className="font-bold text-orange-400">
              {selectedBranch[college.id]?.branchName || "Select Branch"}
            </div>
            <div className="text-sm">
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
                  handleBranchChange(college.id, branch.branchName)
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
    );
  };
  export default BranchDropdown;  