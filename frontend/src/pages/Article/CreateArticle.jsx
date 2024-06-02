import React, { useState } from "react";
import BackBar from "../../components/Navbar/BackBar";
import BottomBar from "../../components/Navbar/BottomBar";
import Container from "../../containers/Container";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import PublishArticleForm from "../../components/Forms/PublishArticleForm";

const CreateArticlePage = () => {
  // const adminApproval = useSelector((state) => state.auth.user.channelApprovalStatus);
  const adminApproval = "ACCEPTED";

  return (
    <React.Fragment>
      <Navbar />
      <BackBar />
      <Container className="flex flex-col justify-center items-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3">Publish your Article</h3>
        <div className="text-center">
          {adminApproval === "REJECTED" && (
            <p className="text-xl text-red-700">your channel has rejected by admin, you not be able to write article</p>
          )}
          {adminApproval === "PENDING" && (
            <p className="text-xl text-red-700">
              {" "}
              your channel request has pending, Please wait for admin approval, you not be able to write article
            </p>
          )}
        </div>
        {adminApproval === "ACCEPTED" && <PublishArticleForm />}
      </Container>
      <BottomBar />
    </React.Fragment>
  );
};

export default CreateArticlePage;
