import React, {useState, useEffect} from "react";
import { useNavigate, useParams} from "react-router-dom";
import {Grid, Button, Typography} from "@material-ui/core"
import { Link } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

export default function Room(props) {
    
    const[votesToSkip,setVotesToSkip] = useState(2);
    const[guestCanPause,setGuestCanPause] = useState(false);
    const[isHost,setIsHost] = useState(false);
    const { roomCode } = useParams();
    const[showSettings, setShowSettings] = useState(false);
    let navigate = useNavigate();

    useEffect(()=>{
        fetch('/api/get-room?code=' + roomCode)
        .then((response) => {
            if(!response.ok)
            {
                props.leaveRoomCallback();
                navigate("/");
            }
            return response.json();
        })
        .then((data)=>
        {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
            console.log({showSettings})

        })
    })

    const renderSettings = () => {
         return( <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <CreateRoomPage
                update={true}
                votesToSkip={votesToSkip}
                guestCanPause={guestCanPause}
                roomCode={roomCode}
                //updateCallback={null}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={updateSetiingsToFalse}
              >
                Close
              </Button>
            </Grid>
          </Grid>
         );
      }

    const updateSetiingsToTrue = () =>
    {
        setShowSettings(true)
    }

    const updateSetiingsToFalse = () =>
    {
        setShowSettings(false)
    }


    // const renderSettingsButton = () =>
    // {
    //     return(
    //     <Grid item xs={12} align="center">
    //             <Button color="primary" variant="contained">
    //                 Settings
    //             </Button>
    //     </Grid>
    //     )
    // }

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
    
    if(showSettings)
    {
        return( <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <CreateRoomPage
                update={true}
                votesToSkip={votesToSkip}
                guestCanPause={guestCanPause}
                roomCode={roomCode}
                updateCallback={null}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={updateSetiingsToFalse}
              >
                Close
              </Button>
            </Grid>
          </Grid>
         );
        
    }
    else{
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
                {isHost ? <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={updateSetiingsToTrue}>
                        Settings
                    </Button>
                    </Grid> 
                    : null}
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={leaveButtonPressed}>
                        Leaved
                    </Button>
                </Grid>             
            </Grid>
        )
    }
    
    
}

/*
<div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {String(guestCanPause)}</p>
            <p>Host: {String(isHost)}</p>
        </div>
*/