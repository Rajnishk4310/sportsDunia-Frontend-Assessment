import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const RankingsDropdown = ({ rankingsList }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded border-none"
      >
        {isOpen ? (
          <>
            <FaChevronUp className="mr-2" /> Show Less
          </>
        ) : (
          <>
            {rankingsList.length > 1 ? `+${rankingsList.length - 1} more` : "Show Ranking"}
            <FaChevronDown className="ml-2" />
          </>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-10">
          <ul className="p-2">
            {rankingsList.map((ranking, index) => (
              <li key={index} className="py-1 px-2 border-b last:border-b-0">
                {ranking}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RankingsDropdown;
