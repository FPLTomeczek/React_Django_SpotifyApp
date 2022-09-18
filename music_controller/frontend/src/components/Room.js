import React, {useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {Grid, Button, Typography} from "@material-ui/core"
import { Link } from "react-router-dom";

export default function Room(props) {
    
    const[votesToSkip,setVotesToSkip] = useState(2);
    const[guestCanPause,setGuestCanPause] = useState(false);
    const[isHost,setIsHost] = useState(false);
    const { roomCode } = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        fetch('/api/get-room?code=' + roomCode)
        .then((response) => {
            if(!response.ok)
            {
                props.leaveRoomCallback();
                navigate("/");
            }
            else{
                return response.json();
            }
        })
        .then((data)=>
        {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);  
        })
    })

    const leaveButtonPressed = () => {
        const requestOptions = {
            method : "POST",
            headers : {"Content-Type": "application/json"}
        };
        fetch('/api/leave-room', requestOptions)
            .then(_response => {
                props.leaveRoomCallback();
                navigate("/");
            })
    }
    
    

    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes to skip: {votesToSkip}
                </Typography>
            </Grid>    
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>    
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>
                    Leave
                </Button>
            </Grid>             
        </Grid>
    )
}

/*
<div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {String(guestCanPause)}</p>
            <p>Host: {String(isHost)}</p>
        </div>
*/