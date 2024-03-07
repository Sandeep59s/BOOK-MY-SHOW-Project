import React from "react";
import { Tabs } from "antd";
import MovieForm from "./MovieForm";
import TheatreTable from "./TheatreTable";
import MovieTable from "./MovieTable";


function Admin() {

    const tabItems =[
        {
            key :'1',
            label : "Movies",
            children : <MovieTable/>
        },
        {
            key : '2',
            label : "Theatres",
            children : <TheatreTable/>
        }

    ]


  return (
    <div>
      <h1> Admin Page</h1>

      <Tabs items={tabItems}/>
      

    </div>
  );
}

export default Admin;
