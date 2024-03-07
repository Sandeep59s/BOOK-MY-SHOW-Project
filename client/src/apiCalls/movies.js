import axios from "axios";
import { axiosInstance } from "./index";

//get all movies

export const getAllMovies= async()=>{
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movies')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Add a movie
export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// update movie

export const updateMovie = async(payload)=>{
    try {
        const response = await axiosInstance.put("/api/movies/update-movie",payload)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}