import { Form, Row, Col, Select, Input, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Modal from "antd/es/modal/Modal";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../apiCalls/movies";
import moment from "moment";

function MovieForm({ isModalOpen, setModalOpen  , selectedMovie , setSelectedMovie , formType}) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    setModalOpen(false);
  };
  if(selectedMovie){
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format('YYYY-MM-DD')
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response=null;

      if (formType === "add") {
        response = await addMovie(values);
      } else if (formType === "edit") {
        response = await updateMovie({...values , movieId : selectedMovie._id});
      }


      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        centered
        title={formType === "add" ? "Add Movie" : "Edit Movie"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
        // formType={formType}
      >
        <Form
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={formType==='edit'? selectedMovie :{}}
          onFinish={onFinish}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Form.Item
                label="Movie Name"
                htmlFor="title"
                name="title"
                className="d-block"
                rules={[{ required: true, message: "Movie name is required!" }]}
              >
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter the movie name"
                ></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Description"
                htmlFor="description"
                name="description"
                className="d-block"
                rules={[
                  { required: true, message: "Description is required!" },
                ]}
              >
                <TextArea
                  id="description"
                  rows="4"
                  placeholder="Enter the  description"
                ></TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Movie  Duration (in min)"
                    htmlFor="duration"
                    name="duration"
                    className="d-block"
                    rules={[
                      {
                        required: true,
                        message: "Movie duration  is required!",
                      },
                    ]}
                  >
                    <Input
                      id="duration"
                      type="number"
                      placeholder="Enter the movie duration"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Select Movie Lanuage"
                    htmlFor="language"
                    name="language"
                    className="d-block"
                    rules={[
                      {
                        required: true,
                        message: "Movie language  is required!",
                      },
                    ]}
                  >
                    <Select
                      id="language"
                      defaultValue="Select Language"
                      style={{ width: "100%", height: "45px" }}
                      // onChange={handleChange}
                      options={[
                        { value: "English", label: "English" },
                        { value: "Hindi", label: "Hindi" },
                        { value: "Punjabi", label: "Punjabi" },
                        { value: "Telugu", label: "Telugu" },
                        { value: "Bengali", label: "Bengali" },
                        { value: "German", label: "German" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Release Date"
                    htmlFor="releaseDate"
                    name="releaseDate"
                    className="d-block"
                    rules={[
                      {
                        required: true,
                        message: "Movie Release Date is required!",
                      },
                    ]}
                  >
                    <Input
                      id="releaseDate"
                      type="date"
                      placeholder="Choose the release date"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Select Movie Genre"
                    htmlFor="genre"
                    name="genre"
                    className="d-block"
                    rules={[
                      { required: true, message: "Movie genre  is required!" },
                    ]}
                  >
                    <Select
                      defaultValue="Select Movie"
                      style={{ width: "100%" }}
                      // onChange={handleChange}
                      options={[
                        { value: "Action", label: "Action" },
                        { value: "Comedy", label: "Comedy" },
                        { value: "Horror", label: "Horror" },
                        { value: "Love", label: "Love" },
                        { value: "Patriot", label: "Patriot" },
                        { value: "Bhakti", label: "Bhakti" },
                        { value: "Thriller", label: "Thriller" },
                        { value: "Mystery", label: "Mystery" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="Poster URL"
                    htmlFor="poster"
                    name="poster"
                    className="d-block"
                    rules={[
                      { required: true, message: "Movie Poster  is required!" },
                    ]}
                  >
                    <Input
                      id="poster"
                      type="text"
                      placeholder="Enter the poster URL"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Submit Data
            </Button>
            <Button className="mt-3" block onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MovieForm;
