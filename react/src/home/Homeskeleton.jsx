import Skeleton from 'react-loading-skeleton'

function Homeskeleton({card}) {
  return (
    
   
  card.map((i)=>{
    return(

    <div  className="flex w-full bg-slate-600 rounded-md overflow-hidden h-60" key={i}>
                <div className='w-1/2'> <Skeleton height={"100%"}/> </div>
                <div className="w-1/2 p-2 flex flex-col justify-between">
                  <Skeleton count={4} style={{display:"flex", flexDirection:"column" , justifyContent:"space-around"}}/>
                </div>
            </div>
    )
   })
  )
}

export default Homeskeleton
