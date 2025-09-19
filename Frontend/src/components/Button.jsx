export default function Button(){
    return(
        <div>
            <button onClick={()=>{
                window.location.reload()
            }} 
            className="text-amber-50 bg-blue-400 hover:bg-blue-500 shadow-xl/40 hover:shadow-2xl text-2xl font-bold py-2 px-4 rounded">
                Recommencer
            </button>
        </div>
    )
}