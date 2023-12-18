const movie = require("../models/movieModel")
const genre = require("../models/genreModel")
const cloudinary = require("cloudinary").v2

const getmovie = async(req,res)=>{
    try {
        const MovieList = await movie.find()
        return res.status(200).json(MovieList)
        
    } catch (error) {
          console.log(error,"====movie/get");
          res.status(400).json(error.message)
    }
}
const getgenre = async(req,res)=>{
try {
    const moviefiles = await movie.findById(req.params.movieid)
    .populate("genre")
    res.status(200).json(moviefiles)
} catch (error) {
    res.status(400).json(error)
}
}
const getpagination = async(req,res)=>{
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 4;
    const skip = (page-1)*limit
    const query = {}
    const movies = await movie.find(query)
    .skip(skip)
    .limit(limit)
    .populate("genre")
    .exec();
    
    
    const totalmovies = await movie.countDocuments(query)
    const totalpages = await Math.ceil(totalmovies/limit)

    res.status(200).json({
      result:movies.length,
      total:totalmovies,
      currentpage:page,
      totalpages,
      data:movies,
  })

  } catch (error) {
    res.status(400).json("internal error")
  }
}
const getsearch = async(req,res)=>{
  try {
    const {title} = req.body
    let filteredmovie = []
    if (title) {
      filteredmovie = await movie.filter((movies)=>
      movies.title.toLowerCase().includes(title.toLowerCase())
      )   
    }else{
      filteredmovie = movie
    }
   return res.status(200).json(filteredmovie)
  } catch (error) {
    res.status(400).json(error)
    console.log(error.message);
  }
}
const getfilter = async(req,res)=>{
  try {
    const {genretitle} = req.query
    console.log(req.query);
    console.log(genre,"====");
    const findgenre = await genre.findOne({title:genretitle})
    console.log(findgenre,"===findgenre");
    if (!findgenre) {
       return res.status(400).json("genre not found")
    }
    const filteredmovies = await movie.find({ genre: findgenre._id }).populate("genre")
    console.log(filteredmovies);
    return res.status(200).json(filteredmovies)
  } catch (error) {
    res.status(400).json(error.message)
  }
}
const postmovie = async(req,res)=>{
    try {
        const {description,genre,rating,title,_id} = req.body
        let response 
        const isexist = await movie.findOne({title:req.body.title})
        let idexist 
        if(_id !== ''){
          idexist=await movie.findById(_id)
        }else{
          idexist=null
        }
        console.log(_id,"===id");
        console.log(genre,"===parse");
        console.log(idexist,"===idexist");
        console.log(req.files,"==img");
        console.log(title);
       if(title === ""){
          return res.status(400).json("title is required")
        }else if(description?.length > 120 || description?.length === 0) {
          return res.status(400).json("description is required less than 120 letters")
        }else if(rating < 1){
          return res.status(400).json("rating is required")
        }else if(JSON.parse(genre).length > 3){
          return res.status(400).json("more than 3 genre or didn't selected")
        }else if(!isexist && !idexist){
           if( req.files === null){
          return res.status(400).json("image is required")
        }else if(req.files) {
            if (!req.files || typeof req.files !== "object") {
                return res.status(400).json("Invalid file upload");
              }
                const file = req.files.photo
                response =  await cloudinary.uploader.upload(file.tempFilePath,{folder:"tmp"})
                      let genres = await JSON.parse(genre)
                       await movie.create({
                         imagepath:response.url,
                         title:req.body.title,
                         rating:req.body.rating,
                         description:req.body.description,
                         genre:genres,
                      },
                      )   
                     console.log("1");
                      return res.status(200).json("movie uploaded")  
                    }
        }else if(idexist){
           if( req.files){
            const file = req.files.photo
            response =  await cloudinary.uploader.upload(file.tempFilePath,{folder:"image"})
                  // console.log(response,"====response");
                  let genres = await JSON.parse(genre)
                   await movie.findByIdAndUpdate(_id,{
                     imagepath:response.url,
                     title:req.body.title,
                     rating:req.body.rating,
                     description:req.body.description,
                     genre:genres,
                  },
                  )   
                  return res.status(200).json("movie updated")  
        }
          let genres = await JSON.parse(genre)
            await movie.findByIdAndUpdate(_id,{title:title,description:description,genre:genres,rating:rating})
            console.log("2");
            return res.status(200).json("movie updated")
        }else{
          return res.status(400).json("title is already exist")
        } 
       
            
    } catch (error) {
        res.status(400).json(error.message) 
        console.log(error)
    }
}
const putgenre = async(req,res)=>{
  try {
    const updategenre = await movie.findByIdAndUpdate(req.params.movieid,{
        $push:{
            genre:req.body.genreid
        }
    },
    {new:true})
    res.status(200).json(updategenre)
  } catch (error) {
    res.status(400).json(error)
  }
}
const deletegenre = async(req,res)=>{
    try {
      const updategenre = await movie.findByIdAndUpdate(req.params.movieid,{
          $pull:{
              genre:req.body.genreid
          }
      },
      {new:true})
      res.status(200).json(updategenre)
    } catch (error) {
      res.status(400).json(error)
    }
  }
 const deletemovie = async(req,res)=>{
    try {
       await movie.findByIdAndDelete(req.params.movieid)
       const page = req.query.page || 1;
       const limit = req.query.limit || 4;
       const skip = (page-1)*limit
       const query = {}
       const movies = await movie.find(query)
       .skip(skip)
       .limit(limit)
       .populate("genre")
       .exec();
       const totalmovies = await movie.countDocuments(query)
    const totalpages = await Math.ceil(totalmovies/limit)

    res.status(200).json({
      result:movies.length,
      total:totalmovies,
      currentpage:page,
      totalpages,
      data:movies,
  })
       
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  module.exports = {getmovie,getgenre,getpagination,getsearch,getfilter,postmovie,putgenre,deletegenre,deletemovie}