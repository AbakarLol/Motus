import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StairsIcon from '@mui/icons-material/Stairs';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import GridViewIcon from '@mui/icons-material/GridView';



export default function Board(props){
    

    return(
        <div className="card  md:h-[10vh] lg:h-[12vh] h-1/9 w-full gap-2  ">
            <div className='scores'>
                <div className ="scores-label" ><GridViewIcon  className='text-amber-400' /> Grille:</div>
                <div className='scores-value'> {props.scoreData.grille} x {props.scoreData.grille}  </div>                
            </div>         
            <div className='scores' >
                <div className ="scores-label"  > <StairsIcon  className='text-blue-400 ' /> Niveau: </div>
                <div className='scores-value' >{props.scoreData.niveau}</div>
            </div>
            <div className='scores' >
                <div className ="scores-label" > <DataSaverOnIcon className='text-red-400 text-sm' /> Marge: </div>
                <div className='scores-value '>{props.scoreData.marge}</div>
            </div>

        </div>
    )
}