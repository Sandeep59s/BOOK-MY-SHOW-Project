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

//delete movie

export const deleteMovie = async(payload)=>{
    try {
        const response = await axiosInstance.delete("/api/movies/delete-movie" ,{data:payload} )
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}