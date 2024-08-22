const PlacementDetails = ({ placement }) => {
    return (
      <>
        <div className="text-[#78bec3] font-bold">
          ₹{placement.avgPackage}
        </div>
        <div className="text-xs">Avg Package</div>
        <div className="text-[#78bec3] font-bold">
          ₹{placement.highestPackage}
        </div>
        <div className="text-xs">Highest Package</div>
        <button className="text-orange-500 font-bold mt-2 flex items-center hover:text-orange-700 transition">
          ⇄ Compare Placement
        </button>
      </>
    );
  };
  export default PlacementDetails;