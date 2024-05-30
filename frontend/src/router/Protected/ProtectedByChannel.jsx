import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NotFoundPage from "../../pages/Error/NotFoundPage";
const ProtectedByChannel = () => {
  const user = useSelector((state) => state.auth.user);
  // return user.role === "NEWS_CHANNEL" ? <Outlet /> : <NotFoundPage />;
  return user.role === "NEWS_CHANNEL" ? <Outlet /> : <Outlet />;
};

export default ProtectedByChannel;
