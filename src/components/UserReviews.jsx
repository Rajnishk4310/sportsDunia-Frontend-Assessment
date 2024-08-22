const UserReviews = ({ userReviews }) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <span className="text-orange-500 text-xl font-bold">●</span>
        <span className="text-lg font-semibold text-gray-400">
          {userReviews.rating} / 10
        </span>
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Based on {userReviews.numberOfReviews} users
        <div className="text-xs">Reviews</div>
      </div>
      <button className="text-xs text-orange-500 bg-amber-50">
        ✓ {userReviews.best[0]} ⋎
      </button>
    </>
  );
};
export default UserReviews;
