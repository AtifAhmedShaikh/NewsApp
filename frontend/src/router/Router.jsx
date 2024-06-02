import { Route, Routes } from "react-router-dom";
import { AuthProtectedRoute, ProtectedByUser } from "./Protected/ProtectedByUser.jsx";
import ProtectedByChannel from "./Protected/ProtectedByChannel.jsx";
import CreateArticle from "../pages/Article/CreateArticle.jsx";
import UpdateArticle from "../pages/Article/UpdateArticle.jsx";
import NotFoundPage from "../pages/Error/NotFoundPage.jsx";
import DashBoard from "../pages/Admin/DashBoard.jsx";
import ProtectedByAdmin from "./Protected/ProtectedByAdmin.jsx";
import RegisterChannel from "../pages/SignUp/ChannelRegister.jsx";
import ArticleList from "../pages/Article/ArticlesList.jsx";
import ChannelsList from "../pages/Channel/ChannelsList.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import ChannelProfile from "../pages/Channel/ChannelProfile.jsx";
import ArticleDetailsPage from "../pages/Article/ArticleDetailsPage.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import Collection from "../pages/Collection/Collection.jsx";
import LandingPage from "../pages/Home/LandingPage.jsx";
import SignUpPage from "../pages/SignUp/SignUpPage.jsx";
import useAutoLogin from "../hooks/useAutoLogin.js";
import VerifyAccountPage from "../pages/VerifyAccount/VerifyAccountPage.jsx";
import ForgotPasswordPage from "../pages/EditProfile/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/EditProfile/ResetPasswordPage.jsx";

const Router = () => {
  // useAutoLogin();
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />

      {/* public routes available only when user not authenticated */}
      <Route element={<AuthProtectedRoute />}>
        <Route exact path="/auth/login" element={<LoginPage />} />
        <Route exact path="/auth/signUp" element={<SignUpPage />} />
        <Route exact path="/auth/verify-account" element={<VerifyAccountPage />} />
        <Route exact path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/auth/channelRegister" element={<RegisterChannel />} />
      </Route>

      {/* protected routes for authenticated users */}
      <Route element={<ProtectedByUser />}>
        <Route exact path="/articles" element={<ArticleList />} />
        <Route exact path="/articles/:slug" element={<ArticleDetailsPage />} />
        <Route exact path="/channels" element={<ChannelsList />} />
        <Route exact path="/channels/:id" element={<ChannelProfile />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/saved" element={<Collection />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* protected routes for channels only channels can access */}
      <Route element={<ProtectedByChannel />}>
        <Route exact path="/articles/publish-article" element={<CreateArticle />} />
        <Route exact path="/articles/update/:id" element={<UpdateArticle />} />
      </Route>
      {/* protected routes for Admin only App admin can access */}
      <Route element={<ProtectedByAdmin />}>
        <Route exact path="/admin/dashboard" element={<DashBoard />} />
        <Route exact path="/admin/say" element={<>say hello from admin</>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
