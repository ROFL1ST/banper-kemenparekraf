import React from "react";
import Fab from '@mui/material/Fab';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function Feedback() {
    return (
        <div>
            <Fab color="primary" sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }} onClick={() => {
                window.open("mailto:banper@kemenparekraf.go.id")
            }}>
                <FeedbackIcon />
                
            </Fab>
        </div>
    )
}