import React from "react";
import { FaStar, FaDownload, FaExchangeAlt, FaArrowRight } from "react-icons/fa";

const CollegeRow = ({
  college,
  selectedBranch,
  handleBranchChange,
}) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100 transition">
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
          <select
            className="mt-2 p-2 border rounded shadow-md"
            onChange={(e) => handleBranchChange(college.id, e.target.value)}
            value={selectedBranch[college.id] || ""}
          >
            <option value="" disabled>
              Select Branch
            </option>
            {college.branches.map((branch) => (
              <option key={branch.branchName} value={branch.branchName}>
                {branch.branchName} - JEE Advanced Cutoff:{" "}
                {branch.jeeAdvancedCutoffs[2023]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center space-x-4">
        <button className="text-orange-400 font-bold py-1 px-3 flex items-center hover:text-orange-600 transition">
          <FaArrowRight className="mr-2" /> Apply Now
        </button>

        <button className="text-[#78bec3] py-1 px-3 flex items-center hover:text-blue-600 transition">
          <FaDownload className="mr-2" /> Download Brochure
        </button>

        <div className="flex items-center space-x-1">
          <input type="checkbox" className="form-checkbox" />
          <span className="text-gray-700">Add to Compare</span>
        </div>
      </div>
    </td>
    <td className="py-2 px-4 border-r text-left">
      <div className="text-[#78bec3] font-bold">
        ₹ {college.courseFees}
      </div>
      <p className="text-xs">BE/B.Tech</p>
      <div className="text-xs">-1st Year Fees</div>
      <div className="mt-2 text-left">
        <button className="text-orange-500 font-bold flex items-center hover:text-orange-700">
          ⇄ Compare Fees
        </button>
      </div>
    </td>
    <td className="py-4 px-6 border-r text-left">
      <div className="text-[#78bec3] font-bold">
        ₹{college.placement.avgPackage}
      </div>
      <div className="text-xs">Avg Package</div>
      <div className="text-[#78bec3] font-bold">
        ₹{college.placement.highestPackage}
      </div>
      <div className="text-xs">Highest Package</div>
      <div className="mt-2 text-left">
        <button className="text-orange-500 font-bold flex items-center hover:text-orange-700">
          ⇄ Compare Placement
        </button>
      </div>
    </td>
    <td className="py-4 px-6 border-r">
      <div className="text-orange-500 font-bold">
        {college.userReviews.rating} / 10
      </div>
      <div className="text-xs">
        Based on {college.userReviews.numberOfReviews} Users
        <div>Reviews</div>
      </div>
      <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs mt-2">
        Best in Social Life
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="text-[#78bec3] font-bold">
        #{college.ranking.overallRank}
      </div>
      <div>India Today 2023</div>
    </td>
  </tr>
);

export default CollegeRow;
