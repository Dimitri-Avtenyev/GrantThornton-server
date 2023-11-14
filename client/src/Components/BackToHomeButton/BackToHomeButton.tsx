import { useState } from "react"
// npm package geinstalleerd materialui 
// button om terug te keren naar home pagine
import { Button } from "@mui/material"
import UploadArea from "../UploadArea/UploadArea"
const HandleBackToHome =()=>{

    return(

        <UploadArea/>
    )

}
const BackToHomeButton =()=>{

    return(

<Button onClick={HandleBackToHome}>Home</Button>)

}

export  default BackToHomeButton