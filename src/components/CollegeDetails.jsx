import BranchDropdown from "./BranchDropdown";
import CollegeActions from "./CollegeActions";
import "../index.css";

const CollegeDetails = ({
  college,
  toggleDropdown,
  handleBranchChange,
  selectedBranch,
  dropdownOpen,
}) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <img
          src={college.collegeLogo}
          alt={college.collegeName}
          className="w-12 h-12 rounded-full border-2 border-gray-200"
        />
        <div>
          {college.featured && (
            <div className="featured-ribbon-wrapper">
              <div className="featured-ribbon">
                <span>Featured</span>
              </div>
            </div>
          )}

          <div className="font-bold text-[#78bec3] text-lg">
            {college.collegeName}
          </div>
          <div className="text-sm text-gray-600">{college.address}</div>
          <BranchDropdown
            college={college}
            toggleDropdown={toggleDropdown}
            handleBranchChange={handleBranchChange}
            selectedBranch={selectedBranch}
            dropdownOpen={dropdownOpen}
          />
        </div>
      </div>
      <CollegeActions />
    </div>
  );
};
export default CollegeDetails;
