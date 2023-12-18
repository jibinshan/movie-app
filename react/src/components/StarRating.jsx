import React from 'react'
import { FaStar } from "react-icons/fa";
function StarRating({rating}) {
 let star = []
 for (let i = 1; i <= 5; i++) {
    
            star.push(
            
                < FaStar  color={rating >= i ? 'yellow' : 'gray'} />
          
            )
        
    
 }
 return(
    <div style={{display:"flex"}}>

        {star}
    </div>
 ) 
}

export default StarRating
