import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StairsIcon from '@mui/icons-material/Stairs';
import BarChartIcon from '@mui/icons-material/BarChart';


export default function Board(){
    return(
        <div className="card h-40 w-200">
            <div>
                <div><EmojiEventsIcon fontSize='large' className='text-amber-400' /> Score:</div>
                <div></div>                
            </div>         
            <div>
                <div> <StairsIcon fontSize='large' className='text-blue-400' /> Level: </div>
                <div></div>
            </div>
            <div>
                <div> <BarChartIcon fontSize='large' className='text-red-400' /> High Score: </div>
                <div></div>
            </div>

        </div>
    )
}