import React from "react";

export default function Dice(props){
    const style ={
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
           <div className="dice" onClick={props.holdFunction} style={style}>{props.value}</div>
    )
}