import CollegeDetails from "./CollegeDetails"
import PlacementDetails from "./PlacementDetails"
import UserReviews from "./UserReviews"
import RankingDetails from "./RankingDetails"


const CollegeRow = ({
  college,
  toggleDropdown,
  handleBranchChange,
  selectedBranch,
  dropdownOpen,
}) => {
  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-100 transition"
    >
      <td className="py-4 px-6 border-r">#{college.cdRank}</td>
      <td className="py-4 px-6 border-r">
        <CollegeDetails
          college={college}
          toggleDropdown={toggleDropdown}
          handleBranchChange={handleBranchChange}
          selectedBranch={selectedBranch}
          dropdownOpen={dropdownOpen}
        />
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
        <PlacementDetails placement={college.placement} />
      </td>
      <td className="py-4 px-6 border-r">
        <UserReviews userReviews={college.userReviews} />
      </td>
      <td className="py-4 px-6">
        <RankingDetails ranking={college.ranking} />
      </td>
    </tr>
  );
};


export default CollegeRow;
