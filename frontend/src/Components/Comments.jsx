import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';


// interface Comment{
//   id:String;
//   body: String;

// }
// const dummyComments: Array<Comment> = [
  const dummyComments = [
    {
    // id:"1",
    body:"This is commnet 1",
    comments:[],
},
    {
        // id:"2",
        body:"This is commnent 2",
        comments:[],
    },
    {
        // id:"3",
        body:"This is commnent 3",
        comments:[],
    }


];
export default function Comments() {
  const[comments,setComments]=useState(dummyComments);
  // const[commnetBody,setCommentBody]=useState("");
  const onComment = (newComment) =>{
    
      setComments((prev) =>[newComment,...prev]);
      
  };

  return (
    <div>
      <h2>Comments</h2>
      <div className='inputcomment' >
          <CommentInput onComment={onComment}/>
          
      </div>
      <div>
        {comments.map(comment =>(
       
            <CommentItem comment={comment}/>
        ))}

      </div>

    </div>
  )
};





const CommentItem =({comment})=>{
  const [isReplying,setIsReplying]=useState(false);
  const [comments,setComments]=useState(comment.comments);


  const onComment =(newComment) =>{
    setComments((prev) =>[newComment,...prev]);
  };
  return(
    <div className='commented'>
      <div>
      <span>{comment.body}</span>
      {isReplying?(
         <Button 
         variant="contained"
         size="small"
         onClick={()=> setIsReplying(false)}>
          Cancel
         </Button>
         ):(
         <Button 
           variant="contained"
           size="small"
           onClick={()=> setIsReplying(true)}
           endIcon={<SendIcon />}>
            Reply
           </Button>
           )}
        </div>
        <div>
          {isReplying && <CommentInput onComment={onComment}/>  }
          {comments.map(comment =>(
       
       <CommentItem comment={comment}/>
   ))}
        </div>
    
    </div>
  )
};


// interface CommentInputProps{
//   onComment:(newComment) =>void;
// }



const CommentInput = ({onComment}) =>{
  const[commnetBody,setCommentBody]=useState("");
  return(
    <div>
    <input
    value={commnetBody}
    onChange={(event)=> setCommentBody(event.target.value)}
    placeholder="What are your thoughts?"/>
    <div>
          <Button 
           variant="contained"
           onClick={() => {
            onComment({ body: commnetBody,comments:[]});
            setCommentBody("");
          }}
           endIcon={<SendIcon />}>
            Send
           </Button></div>
    
    
    
    
    </div>
  )
}

