import { FaArrowRight, FaDownload } from "react-icons/fa";

const CollegeActions = () => {
  return (
    <div className="mt-2 flex justify-between items-center space-x-4">
      <button className="text-orange-400 font-bold py-1 px-3 flex items-center hover:text-orange-600 transition">
        <FaArrowRight className="mr-2" /> Apply Now
      </button>

      <button className="text-[#3e878e] py-1 px-3 flex items-center hover:text-[#2f656a] transition font-bold">
        <FaDownload className="mr-2" /> Download Brochure
      </button>

      <div className="flex items-center space-x-1 font-bold">
        <input type="checkbox" className="form-checkbox" />
        <span className="text-gray-700">Add to Compare</span>
      </div>
    </div>
  );
};
export default CollegeActions;
