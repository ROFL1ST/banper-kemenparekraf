import React from "react";
import Fab from '@mui/material/Fab';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function Feedback() {
    return (
        <div>
            <Fab size="large" color="primary" sx={{
                height: 60,
                width: 60,
                position: 'fixed',
                bottom: 16,
                right: 16,
            }}  onClick={() => {
                window.open("mailto:banper@kemenparekraf.go.id")
            }} >
                <FeedbackIcon sx={{height:35, width:35,}}  />
                
            </Fab>
        </div>
    )
}