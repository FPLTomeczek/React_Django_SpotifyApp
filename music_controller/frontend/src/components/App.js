import React, { Component } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";

export default class App extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (<Router>
            <Routes>
                <Route path = "/" element = {<h1>This is home page</h1>} />
                <Route path = "join" element={<RoomJoinPage/>}></Route>
                <Route path = "create" element={<CreateRoomPage/>}></Route>
            </Routes>
        </Router>);
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);