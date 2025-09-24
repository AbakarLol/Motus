export default function Auth(){
    return(
        <div>
            <div className="gradient card sm:w-110 h-110 w-80 flex flex-col justify-between items-start px-3 sm:px-5 py-20 sm:rounded-2xl rounded-xl" >
                
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Username:</label>
                    <input type="text" name="username" className="auth-input" />
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Password:</label>
                    <input type="password" name="username" className="auth-input" />
                </div>
                <button className="bg-[#bc4e9c] hover:bg-[#fd2c72] w-full h-10 text-amber-50 rounded-md border-2 border-[#bc4e9c]"  >
                Submit
                </button>
                


            </div>
           
        </div>
    )
}