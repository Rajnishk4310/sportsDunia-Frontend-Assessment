import RankingsDropdown from "./RankingsDropdown"
const RankingDetails = ({ ranking }) => {
  return (
    <>
      <div className="text-gray-400 font-bold">
        #{ranking.rank}/
        <span className="text-orange-400">{ranking.total}</span> in
        India
      </div>
      <div>{ranking.by}</div>
      <RankingsDropdown rankingsList={ranking.rankingsList} />
    </>
  );
};
export default RankingDetails;
