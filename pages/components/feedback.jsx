import React from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Feedback() {
    return (
        <div>
            <Fab color="primary" sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
            }} >
                <AddIcon />
                
            </Fab>
        </div>
    )
}