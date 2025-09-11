import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StairsIcon from '@mui/icons-material/Stairs';
import BarChartIcon from '@mui/icons-material/BarChart';



export default function Board(props){
    

    return(
        <div className="card md:h-1/12 lg:h-1/7 h-1/5 w-full ">
            <div className='scores'>
                <div className ="scores-label" ><EmojiEventsIcon fontSize='large' className='text-amber-400 text-3xl' /> Score:</div>
                <div className='scores-value'> {props.scoreData.score} </div>                
            </div>         
            <div className='scores' >
                <div className ="scores-label"  > <StairsIcon fontSize='large' className='text-blue-400 text-3xl' /> Level: </div>
                <div className='scores-value' >{props.scoreData.niveau}</div>
            </div>
            <div className='scores' >
                <div className ="scores-label" > <BarChartIcon fontSize='large' className='text-red-400 text-3xl' /> High Score: </div>
                <div className='scores-value'>{props.scoreData.record}</div>
            </div>

        </div>
    )
}