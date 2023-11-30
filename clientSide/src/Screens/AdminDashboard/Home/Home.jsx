import React,{useEffect,useState} from 'react'
//import { Table, Form } from "react-bootstrap";

//import img1 from '../../../assets/images/cardImage1.png'
import GalleryDetails from '../Gallery/GalleryDetails';

import '../../../Styles/uploadart.css'
import {useSelector,useDispatch} from 'react-redux'
import { getAllArts } from '../../../redux/features/auth/authSlice'
import UploadArtFile from '../UploadArt/UploadArtFile';


import Note from './Note'
import { baseURL } from '../../../redux/axios/axios';


const Home = ({searchQuery}) => {

  //const message = [{name:'Roger'},{name:'Eric'}]


  const [ArtDetailsOpen, setArtDetailsOpen] = useState(false)
  const [selectedArtItem, setSelectedArtItem] = useState(null);


  const [fileUploadOpen, setfileUploadOpen] = useState(false)

  const [open,setOpen] = useState(false)

  const openNote = () =>{
    setOpen(!open)
  }


  const ArtDetailsScreen = (item) => {
    setArtDetailsOpen(!ArtDetailsOpen)
    setSelectedArtItem(item);
  
  }

  
const fileuploadScreen = () => {
  setfileUploadOpen(!fileUploadOpen)

}
  
     

  const {userList} = useSelector((state)=>state.auth)


   const dispatch = useDispatch()



   useEffect(()=>{
      const getData = async () =>{
          await dispatch(getAllArts())
      }
      getData()
   },[dispatch])


   const filteredItems =  userList?.arts?.data?.filter((item) => {
    return (
      item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery?.toLowerCase())
    ) 
  })



  return (
    <div className="container-fluid ps-4" style={{backgroundColor:"white !important"}} >
        <div className="row">
            <div className="row">
          
             
                <div className="col-md-8">
                    <h3 className='' style={{color :'#709AA4',}}>
                        Your Latest Art
                    </h3>
                </div>

                <div className="col-md-2 text-end p-0">
                     <button className='btn rounded-3' style={{background:'#709BA5' , color:'white'}} onClick={openNote}>
                        Set ThankYou Note
                    </button> 
                </div>
                
                
                <div className="col-md-2 text-end p-0" type='button'  onClick={fileuploadScreen}>
                    <button className='btn rounded-3' style={{background:'#709BA5' , color:'white', borderRadius:"50px"}}>
                        Upload Art
                    </button>
                </div>
              
            </div>
        </div>

   



        {/* cards */}
        <div className="row m-0">
        {

filteredItems?.length > 0 ?

filteredItems?.reverse()?.map((item,i)=>{
 
  const descriptionWords = item.description.split(' ');
  const Description = descriptionWords.slice(0, 2).join(' ');


return (
<div className="col-md-3 col-sm-6 pe-0 m-0 rana pt-3" style={{borderRadius:'15px'}} key={i}>
<div className="card shadow rounded-3" style={{background:'#f7eeee4a'}}>

 <img className='rounded-top' src={item.image[0]} alt="Not Data" style={{height:'255px'}} />

<div className="d-flex align-items-center card-body" style={{padding:"0.5rem"}}>
  <div className="col-md-7 col-sm-6">
  <div className="row pt-2">
            <h6 style={{fontWeight:'600'}}>
                {item.title}
            </h6>
        </div>
        <div className="row text-muted">
            <h6 style={{fontWeight:'500',color:'#709AA4'}}>
                {Description}
            </h6>
        </div> 
      
         </div>
  <div className="col-md-5 col-sm-6 text-end pe-2" onClick={()=>ArtDetailsScreen(item)}>
    <p className='pt-2' style={{display: 'inline-block', borderBottom:'2px solid #709AA4',color:"#709AA4"}}>View Details</p>
  </div></div>
  
</div>

{
  ArtDetailsOpen && selectedArtItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <GalleryDetails
          closeWindow={() => setArtDetailsOpen(false)}
          title={selectedArtItem.title}
          description={selectedArtItem.description}
          image={selectedArtItem.image[0]}
        />
      </div>
    </div>
  )
}







        </div>

        
)
})

:
(
<div className='fs-2 ps-5  ms-5' style={{color:"rgb(112, 154, 164)"}}> No Data Found</div>
)


}

        </div>



    {
      open && (
        <div className="modal-show-uploadArt  rounded-3">
    <div className="modal-content-uploadArt w-25 rounded-3">
        <Note  close = {openNote} />
        </div>
        </div>
      )
    }
       
           



      

        {fileUploadOpen && (
    <div className="modal-show-uploadArt">
    <div className="modal-content-uploadArt" style={{width:'600px'}}>
   
   <UploadArtFile closeWindow={fileuploadScreen}/>

    </div>
  </div>


   
    )}
    </div>






  )
}

export default Home