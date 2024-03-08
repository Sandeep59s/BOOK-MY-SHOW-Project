import React from "react";
import { Modal, message } from "antd";
import { deleteMovie } from "../../apiCalls/movies";
import { FastBackwardFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

function DeleteMovieForm({
  isDeleteModalOpen,
  selectedMovie,
  setDeleteModalOpen,
  setSelectedMovie,
  getData
}) {
    const dispatch = useDispatch();

  const handleOk = async () => {
    dispatch(showLoading())
    const movieId = selectedMovie._id;
    const response = await deleteMovie({ movieId });
    if(response.success){
        message.success(response.message);
        getData();
    }else{
        message.error(response.message)
        setSelectedMovie(null)
    }
    setDeleteModalOpen(false)
    dispatch(hideLoading())
  };

  const handleCancel = async()=>{
    setDeleteModalOpen(false)
  }

  return (
    <>
      <Modal
        title="Delete Movie?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this movie?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this movie data.
        </p>
      </Modal>
    </>
  );
}

export default DeleteMovieForm;
