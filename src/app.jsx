import React from "react"
import { nanoid } from 'nanoid';
import Dice from "./dice";
import Confetti from "react-confetti"

export default function App(){
    const [diceValue,setdiceValue] = React.useState(allnewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{
        const allHeld = diceValue.every(die => die.isHeld)
        const firstValue = diceValue[0].value
        const sameValue = diceValue.every(die => die.value === firstValue)
        if (allHeld && sameValue){
            setTenzies(true)
        }
    },[diceValue])

    function allnewDice(){
        const newArray = []
        for (let i=0; i<10;i++){
            newArray.push(generateObject())
        }
        return newArray
    }

    function generateObject(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld: false,
            id: nanoid()
        }
    }

    function rollFunction(){
        if (!tenzies){
            setdiceValue(obj => obj.map((data)=>{
                return data.isHeld ? data : generateObject()
            }))
        }
        else{
            setTenzies(false)
            setdiceValue(allnewDice())
        }
    }

    function holdFunction(id){
        setdiceValue(obj => obj.map((data)=>{
            return data.id === id ? {...data, isHeld: !data.isHeld} : data
        }))
    }

    const diceArray = diceValue.map(data => {
        return (
            <Dice key={data.id} value={data.value} isHeld={data.isHeld} holdFunction={()=>holdFunction(data.id)}/>
        )
    })

    return (
        <div className="sub-container">
            {tenzies && <Confetti/>}
            <div className="new-div">
                <h1>{tenzies ? "You win" : "Tenzies"}</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceArray}
                </div>
                <button className="roll-btn" onClick={rollFunction}>{tenzies ? "NEW GAME" : "ROLL"}</button>
            </div>
        </div>
    )
}