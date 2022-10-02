import { useState } from "react";
import CrewList from "./CrewList";
import CrewListNew from "./CrewListNew";
import styled from "styled-components";

const CrewArea = () => {

const [showNewCrew, setShowNewCrew] = useState(false)    

const [choiceCrew, setChoiceCrew] = useState(true)
const [choiceNewCrew, setChoiceNewCrew] = useState(false)

return(
        <div style={{width:'100%',height:'560px', padding:'74px 0 0 0', backgroundColor:'#111', margin:'0 auto'}}>
            <div style={{width:'1220px', fontSize:'32px', margin:'0 auto', color:'white'}}>
                <ChoiceCrew status={choiceCrew} type="button"
                    onClick={()=>{setShowNewCrew(false); setChoiceCrew(true); setChoiceNewCrew(false)}}>
                        인기 크루
                </ChoiceCrew>

                <span style={{margin:'0 25px 0 25px', opacity:"0.15"}}>|</span>

                <ChoiceCrew status={choiceNewCrew} type="button"
                    onClick={()=>{setShowNewCrew(true); setChoiceNewCrew(true); setChoiceCrew(false)}}>
                        신규 크루
                </ChoiceCrew>
            </div>
            <div style={{width:'1210px', margin:'12px 360px 0 350px', display:'flex'}}>
            
            { showNewCrew ? <CrewListNew /> : <CrewList /> }

            </div>
        </div>
    )
}


const ChoiceCrew = styled.span`
font-size: 3.2rem;
font-weight: ${(props) => (props.status ? 700 : 400)};
`

export default CrewArea;