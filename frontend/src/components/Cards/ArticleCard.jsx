import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { timeAgo } from "../../utils/timeStamp";

const ArticleCard = ({ _id, title, urlToImage, description, createdAt }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[25rem] rounded overflow-hidden shadow-lg py-2 hover:scale-95">
      <img
        className="w-full h-[9rem] rounded-md"
        src={urlToImage}
        alt="Sunset in the mountains"
      />
      <span className="text-[12px] mx-5">{timeAgo(createdAt)}</span>
      <div className="px-6 py-1">
        <div className="px-2 py-1 rounded-2xl font-normal text-xl mb-2">
          {title}
        </div>
        <p className="text-gray-700 text-base line-clamp-2">{description}</p>
      </div>

      <div className="flex justify-center">
        <Button
          className="px-2 py-2 w-fit"
          variant={"primary"}
          onClick={() => navigate(`/articles/${_id}`)}
        >
          Read Complete
        </Button>
      </div>
    </div>
  );
};
ArticleCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  urlToImage: PropTypes.string,
  author: PropTypes.object,
  description: PropTypes.string,
};
export default ArticleCard;
