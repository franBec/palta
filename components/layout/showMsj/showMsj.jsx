const ShowMsj = ({ children, isHidden, setisHidden, isError}) => {
    if(!isHidden){
        setTimeout(function(){
            setisHidden(true)
        }, 4000);
    }

    return(
        <div className={`${isHidden ? 'hidden' : ""}  ${isError ? 'bg-red-600 text-white' : 'bg-green-400 text-black'}  p-4 fixed right-0 top-2 mr-4`} >
            { children }
        </div>
    )
}

export default ShowMsj;
