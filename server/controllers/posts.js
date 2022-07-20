import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';


export const getPosts = async(req,res) => {
  try{
    const PostMessages =await PostMessage.find()

    console.log(PostMessages)

    res.status(200).json(PostMessages);
  }catch(error){
    res.status(404).json({message: error.message});
  }
}


export const createPosts = async(req,res) => {
   const post = req.body;

   const newPosts = PostMessage(post)

    try{
      await newPosts.save()

      res.status(201).json(newPosts);
    }catch(error){
      res.status(404).json({message: error.message});
    }
}

export const updatePost = async(req,res) => {

   const {id: _id} = req.params;
   const post = req.body;


   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

   const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, {new:true});

   res.json(updatedPost);
}

export const deletePost = async(req,res) => {
  
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({message: "post deleted succesfully"});

}

export const likePost = async(req,res) => {

  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);
  const updatepost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount + 1}, {new: true});

  res.json(updatepost);


}