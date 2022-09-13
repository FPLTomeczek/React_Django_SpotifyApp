import React, { Component } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";

export default class HomePage extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            roomCode: null,
        };
    }

    async componentDidMount(){
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code
                })
            })
    }

    renderHomePage(){
        if (this.state.roomCode) {
            return (
              <Navigate to={`/room/${this.state.roomCode}`} replace={true}/>
            );
          } else {
        return (
            
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography compontent = "h1" variant="h1">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup variant="contained" disableElevation>
                        <Button color="primary" to='/join' component={Link}>
                            Join a Room
                        </Button>
                        <Button color="secondary" to='/create' component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    }
}

    render(){
        return (<Router>
        <Routes>
            <Route path = "/" element = {this.renderHomePage()} />
            <Route path = "join" element={<RoomJoinPage/>}></Route>
            <Route path = "create" element={<CreateRoomPage/>}></Route>
            <Route path = "room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode}/>}></Route>
        </Routes>
    </Router>)
    }
}
