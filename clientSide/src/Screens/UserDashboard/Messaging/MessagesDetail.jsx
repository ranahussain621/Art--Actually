import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { ChatDetail, ChatsList, SendMessage } from '../../../redux/features/auth/authSlice';
const MessagesDetail = ({chatId,recieverId}) => {



  const MessagesDetailData = useSelector((state)=>state.auth?.contacts?.MessagesDetail )
  const [recievedMessagesList, setRecievedMessagesList] = useState()
const [sendmessage, setsendmessage] = useState('')
  
  let senderDetail = JSON.parse(localStorage.getItem('user'));
  let senderId = senderDetail?.user[0]?._id
 const dispatch = useDispatch()


  const messagesendfun=async()=>{
    if(senderDetail){
      setsendmessage('')
       await dispatch(SendMessage({
  user_id:senderId,
  reciver_id:recieverId,
  message:sendmessage
 })).then(()=>{

  dispatch(ChatDetail({chat_id:chatId}))

  dispatch(ChatsList({user_id:senderId}))
 })
    }else{
      return
    }

  }

  useEffect(()=>{

      dispatch(ChatDetail({chat_id:chatId}))

  },[chatId])

  useEffect(() => {
   
    if (MessagesDetailData?.data) {
    
      setRecievedMessagesList(MessagesDetailData?.data);
    } if(chatId===null || chatId===undefined){
      setRecievedMessagesList([])
    }
  }, [MessagesDetailData?.data,chatId]);
  
  

  return (
   <>
   <div className='messages' style={{height:'570px', flexGrow: 1, overflowY: 'auto', scrollbarWidth: 'none'  }}>

{/* we recieve the message from artist */}
{recievedMessagesList?.map((item, i) => {
  return (
    <div key={i}>
      {/* Check if the message is sent or received */}
      {item.sender_id === senderId ? (
        // Sent message
        <div className="my-3 text-end sender-messages">
          <div>
            <div
              className="my-2 rounded-4"
              style={{ backgroundColor: "#82abb5", display: "inline-block" }}
            >
              <p className=" m-0 openSans-500 p-3" style={{fontSize:'16px'}}>{item.message}</p>
            </div>
          </div>
        </div>
      ) : (
        // Received message
        <div className="mx-5 recieve-messages">
          <div>
            <div
              className="my-2 rounded-4"
              style={{ backgroundColor: "#F1F1F1", display: "inline-block" }}
            >
              <p className=" m-0 openSans-500 p-3" style={{fontSize:'16px'}}>{item.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
})}







<style>
        {`
          .messages::-webkit-scrollbar {
            width: 0em;
        
        `}
      </style>

   </div>

   


<div className='w-100 my-3' style={{position:'sticky' }}>
<TextField
     
      placeholder='Type a message'
      className='w-100 px-5'
      value={sendmessage}
      onChange={(e)=>setsendmessage(e.target.value)}
      inputProps={{
       
        style: {
            border: "1px solid #EAEAEA",
            
          borderRadius: "15"
        },
      }
    }
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton >
              <SendIcon style={{color:"#709AA4"}} onClick={messagesendfun}/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
</div>






   </>




  )
}

export default MessagesDetail