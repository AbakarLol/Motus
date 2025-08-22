import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StairsIcon from '@mui/icons-material/Stairs';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';



export default function Board(){
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [hightScore, setHight] = useState(0)

    return(
        <div className="card md:h-1/12 lg:h-1/7 h-1/5 w-full ">
            <div className='scores'>
                <div className ="scores-label" ><EmojiEventsIcon fontSize='large' className='text-amber-400 text-3xl' /> Score:</div>
                <div className='scores-value'> {score} </div>                
            </div>         
            <div className='scores' >
                <div className ="scores-label"  > <StairsIcon fontSize='large' className='text-blue-400 text-3xl' /> Level: </div>
                <div className='scores-value' >{level}</div>
            </div>
            <div className='scores' >
                <div className ="scores-label" > <BarChartIcon fontSize='large' className='text-red-400 text-3xl' /> High Score: </div>
                <div className='scores-value'>{hightScore}</div>
            </div>

        </div>
    )
}