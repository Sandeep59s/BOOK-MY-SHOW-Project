import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import MovieForm from "./MovieForm";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../apiCalls/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieForm from "./DeleteMovieForm";

function MovieTable() {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen , setDeleteModalOpen] = useState(false);
  // console.log(selectedMovie);
  const getData = async () => {
    // This function will fetch all the movies
    dispatch(showLoading());

    const response = await getAllMovies();

    const allMovies = response.data;

    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: `movie${item._id}` };
      })
    );

    console.log(movies);

    dispatch(hideLoading());
  };

  const tableHeading = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <div
            style={{
              width: "130px",
              height: "95px",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "8px 8px 8px rgba(0, 0, 0, .7)",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "8px",
              }}
              src={data.poster}
              alt="Movie Poster"
            />
          </div>
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text, data) => {
        return `${text} Min`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("ll");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button style={{ backgroundColor: '#CC0000' }}
                onClick={()=>{
                    setDeleteModalOpen(true);
                    setSelectedMovie(data);
                }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              setModalOpen(true);
              setFormType("add");
            }}
            style ={{backgroundColor :"lightblue"}}
          >
            Add Movie
          </Button>
        </div>
      </div>
      <Table columns={tableHeading} dataSource={movies} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          setSelectedMovie={setSelectedMovie}
          selectedMovie={selectedMovie}
          formType={formType}
        />
      )}
        {isDeleteModalOpen && (
            <DeleteMovieForm
              isDeleteModalOpen={isDeleteModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              setSelectedMovie={setSelectedMovie}
              selectedMovie={selectedMovie}
              getData={getData}
            />
      )}
    </>
  );
}

export default MovieTable;
