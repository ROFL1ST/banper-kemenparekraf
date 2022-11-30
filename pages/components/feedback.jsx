import React from "react";
import Fab from '@mui/material/Fab';
import FeedbackIcon from '@mui/icons-material/Feedback';

export default function Feedback() {
    return (
        <div>
            <Fab variant="extended" size="large" color="primary" sx={{
                height: 55,
                width: 120,
                position: 'fixed',
                bottom: 16,
                right: 16,
                fontSize: 12,
                fontWeight: 600,
            }}  onClick={() => {
                window.open("mailto:banper@kemenparekraf.go.id")
            }} >
                <FeedbackIcon sx={{height:25, width:35,}}  />
                Hubungi Kami
            </Fab>
        </div>
    )
}