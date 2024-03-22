import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import CustomizedButton from './StyledMUI/CustomizedButton.tsx'
import CustomizedTextField from'./StyledMUI/CustomizedTextField.tsx'
import { ThemeContext } from './Themes/ThemeProvider.tsx';

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
  const {theme} = useContext(ThemeContext)
  return(
    <div className='commented'
      style={{borderColor:theme.color,}}
    >
      <div className='buttonrepandcacel' style={{display:'flex'}}>
      <span>{comment.body}</span>
      {isReplying?(
         <CustomizedButton 
         variant="contained"
         size="small"
         onClick={()=> setIsReplying(false)}>
          Cancel
         </CustomizedButton>
         ):(
         <CustomizedButton 
           variant="contained"
           size="small"
           onClick={()=> setIsReplying(true)}
           endIcon={<SendIcon />}>
            Reply
           </CustomizedButton>
           )}
        </div>
        <div >
          {isReplying && <CommentInput onComment={onComment}/>  }
          {comments.map(comment =>(
       
       <CommentItem comment={comment}/>
   ))}
        </div>
    
    </div>
  )
};

const CommentInput = ({onComment}) =>{
  const[commnetBody,setCommentBody]=useState("");
  
  return(
    <div style={{
      display:'flex',
      flexDirection:'column',
      width:'70%',
      
    }}>
    <CustomizedTextField
    id="comment"
    style={{width:'100%',}}
    value={commnetBody}
    onChange={(event)=> setCommentBody(event.target.value)}
    placeholder="Share your thoughts..."
    />
    <div style={{
    display: 'flex', // Set this div as a flex container
    justifyContent: 'flex-end', // Align its children (the button) to the end of the flex container (right side)
    marginTop:"1%",
  }}>
          <CustomizedButton 
          sx={{}}
           variant="contained"
           onClick={() => {
            onComment({ body: commnetBody,comments:[]});
            setCommentBody("");
          }}
           endIcon={<SendIcon />}>
            Send
           </CustomizedButton></div>
    </div>
  )
}

