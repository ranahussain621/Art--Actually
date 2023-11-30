import React, { useEffect, useState } from 'react'
import img1 from "../../../assets/images/artists/team1.png"
import MessagesDetail from './MessagesDetail';
import { ChatsList, getUserDetails } from '../../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar';

const Message = (props) => {

let userId = props?.userId

//get the id of current user
let currentUserDetail = JSON.parse(localStorage.getItem('user'));
let currentUserId = currentUserDetail?.user[0]?._id

  const [searchTitle, setsearchTitle] = useState()
  const [NewUser, setNewUser] = useState({
    person_name:'',
    img:img1,
    reciver_id:''
,  })
 
  const [artistData, setartistData] = useState({
    person_name:"",
    img:img1,
    chatId:'',
    recieverId:'',
    ToHighlight:''
    
  })

  const dispatch = useDispatch()
  const [artistList, setartistList] = useState([])
const updatedartList = useSelector((state)=>state.auth.contacts)

  //if we want to message some one, get their detail
const GetUserDetailfun = async () => {
 
    const val = await dispatch(getUserDetails({id:userId}));
    const userData = val.payload?.user;


 
if(userData?.firstName || userData?.lastName){
  setNewUser({
    person_name:userData?.firstName +' '+userData?.lastName,
    img:img1,
    reciver_id:userData?._id,
    _id:null 
 })
}
 
 
};

useEffect(() => {

  GetUserDetailfun()
 
}, [userId]);

useEffect(() => {
  if (updatedartList?.data) {

    setartistList(updatedartList?.data);

    if (NewUser?.person_name) {
      // Check if NewUser.reciver_id is already in the artistList
      const isUserInList = artistList?.some(artist => artist.reciver_id === NewUser.reciver_id);

      if (!isUserInList) {
        // If NewUser.reciver_id is not in the list, add NewUser to artistList
        setartistList(prev => [...prev, NewUser]);
        setartistData({
          person_name: NewUser?.person_name,
          img: img1,
          recieverId: NewUser?.reciver_id,
          ToHighlight:NewUser?.reciver_id
       
        });
      }
      if (isUserInList) {
      
        // Initialize a variable to store the matching record
        let matchingRecord = null;
      
        // Iterate through updatedartList?.data to find the matching record
        for (const record of updatedartList?.data) {
          if (record.reciver_id === NewUser.reciver_id) {
            matchingRecord = record;
            break; // Exit the loop once a match is found
          }
        }
      
        if (matchingRecord) {
          // If a matching record is found, set its data in artistData
          setartistData({
            person_name: matchingRecord.person_name,
            img:img1,
            chatId: matchingRecord._id, // Assuming _id is the identifier for chatId
            recieverId: matchingRecord.reciver_id,
            ToHighlight:matchingRecord.reciver_id
          });
        }
      
        // Clear NewUser state
        setNewUser({
          person_name: '',
          img: '',
          reciver_id: ''
        });
      }
      


    }
  }
}, [updatedartList?.data,NewUser?.person_name]);





//filter the user 
useEffect(() => {
  if ( searchTitle) {
    const filteredResults = artistList.filter((item) =>
      item.person_name.toLowerCase().includes(searchTitle.toLowerCase())
    );
    setartistList(filteredResults );
  } else {
    // Fetch the initial data or reset to original data when searchTitle is empty
   setartistList(updatedartList?.data)
  }
}, [searchTitle]);


useEffect(()=>{

  dispatch(ChatsList({user_id:currentUserId}))

},[])
  return (
   <>
   {/* this is top title */}
   <div className="scrollable-wrapper">

       <div className='title mx-5 my-3 p-0'>
    <p className='fw-semibold openSans-600 fs-1' style={{color:'#709AA4'}}>Chats</p>
   

   </div>

<div className="row">
  <div className="col-md-3 col-sm-5   ms-5 shadow shadow-end">

<div className='w-100 my-3 '>
   <input type="search" 
   style={{
    backgroundColor:"#e7e5e5",
    outline: "none", 
  }}
   className='border-0 form-control-lg  w-100 rounded-4 ' 
   placeholder='Search...'
   value={searchTitle}
   onChange={(e)=>{setsearchTitle(e.target.value)}}
   />
  </div>   


   <div className="Artist-list">
    {artistList?.map((item,i)=>
    {
      if (i === 0 && !artistData?.person_name && !NewUser?.person_name && !userId) {
        setartistData({
          person_name:item?.person_name,
          img:img1,
          chatId:item?._id,
           recieverId:currentUserId===item?.reciver_id ? (item?.sender_id):(item?.reciver_id),
           ToHighlight:item?.reciver_id
       })
      }
      return(
        <>
        <div type="button" onClick={
          ()=>{
            setartistData({
           person_name:item?.person_name,
           img:img1,
           chatId:item?._id,
            recieverId:currentUserId===item?.reciver_id ? (item?.sender_id):(item?.reciver_id),
            ToHighlight:item?.reciver_id
        })
      }} className="d-flex my-4 "
        style={{backgroundColor:`${item.reciver_id===artistData?.ToHighlight? "#8db2bb87":''}`}}
         key={i}>
          <div className="">
            
            <Avatar 
            color={Avatar.getRandomColor('sitebase', ['red', 'blue', 'green'])} 
            name={item.person_name}  
            size={50}  
            round={true}/>
          </div>
          <div className="mx-3">
            <p className=' fs-6 m-0 openSans-600' style={{textTransform:"capitalize"}}>{item.person_name}</p>
            <span ><small className='text-muted openSans-400'>new message</small></span>
          </div>
        </div>
        </>
      )
    })}
   </div>
   
  </div>


  <div className="col-md-8 col-sm-6 p-0">

 <div className="d-flex my-3 mx-4">

          <div className="">
          <Avatar 
          color={Avatar.getRandomColor('sitebase', ['red','blue','green'])} 
          name={artistData?.person_name}  
          size={50}  
          round={true}/>
          </div>
          <div className="mx-3 w-100">
            <p className=' fs-4 m-0 openSans-600' style={{textTransform:"capitalize"}}>{artistData?.person_name}</p>
            <span ><small className='text-muted'>Messages</small></span>
          </div>
<div className='w-100 text-end'>

</div>
          
        </div>
        <hr />
        <MessagesDetail recieverId={artistData?.recieverId} chatId={artistData?.chatId} />
  </div>
</div>


   </div>


   </>
  )
}

export default Message