import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-purple-400">404</h1>
            <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <Button
              variant={"primary"}
              className="px-2 py-2 mr-2"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant={"success"}
              className="px-2 py-2 w-fit"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
