import{Typography} from "@mui/material";
import React from 'react'

export const Text =({children, variant="bodyl"})=>{
    return<Typography variant={variant}>{children}</Typography>
};