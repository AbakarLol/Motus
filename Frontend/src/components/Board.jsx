import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StairsIcon from '@mui/icons-material/Stairs';
import BarChartIcon from '@mui/icons-material/BarChart';



export default function Board(props){
    

    return(
        <div className="card  lg:h-1/7 h-1/8 w-full ">
            <div className='scores'>
                <div className ="scores-label" ><EmojiEventsIcon  className='text-amber-400 md:text-xl' /> Score:</div>
                <div className='scores-value'> {props.scoreData.score} </div>                
            </div>         
            <div className='scores' >
                <div className ="scores-label"  > <StairsIcon  className='text-blue-400 ' /> Niveau: </div>
                <div className='scores-value' >{props.scoreData.niveau}</div>
            </div>
            <div className='scores' >
                <div className ="scores-label" > <BarChartIcon className='text-red-400 font-' /> Marge: </div>
                <div className='scores-value'>{props.scoreData.record}</div>
            </div>

        </div>
    )
}