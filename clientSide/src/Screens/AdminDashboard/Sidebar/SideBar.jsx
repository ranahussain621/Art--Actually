
import React,{useState} from 'react'

import { useNavigate } from 'react-router-dom';




import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import "../../../Styles/sidebar.css"
import Home from '../Home/Home';
import Gallery from '../Gallery/Gallery';
import Profile from '../Profile/Profile';
import TopNavbar from '../Top Navbar/TopNavbar';
import Music from '../Music/Music';



import home from '../../../assets/images/home.png'
// import message from '../../../assets/images/message.png'
import music from '../../../assets/images/music.png'
import user from '../../../assets/images/user.png'
import gallery from '../../../assets/images/gallery.png'
import mainLogo from '../../../assets/images/mainLogo.png'



export default function LandingSideBar() {

  const navigate = useNavigate()


  const [activeTab, setActiveTab] = useState('first');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query,tab) => {

    setActiveTab(tab);

    setSearchQuery(query);
  };
   
   

  return (
    <>


      <div className='rana'>
       
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >

   
          <Row className='m-0 mb-3' style={{minHeight:'750px'}}> 
       
          <Col sm={2} className={`sidebar-area shadow-end card shadow-lg pe-0 pt-4`}>
                <button type="button"  className='text-start sideBar-icon bg-transparent border-0'>
                     
                </button>
                
              <Nav variant="pills" className="flex-column">
                {/* side menu titles */} 
<div>
  <p className='text-middle  mt-2  ms-3' style={{ margin: '0.2rem',color: '#709CA6' }}>
<img src={mainLogo} className='img-fluid' alt="" onClick={()=>navigate('/dashboard/admin-dashboard')} />

<button type="button"  className='text-start sideBar-icon bg-transparent border-0'>
  <FontAwesomeIcon icon={faAngleDoubleLeft} />
</button>
 </p>
</div>

<hr className='w-100 mb-3' style={{borderBottom :'1px solid grey' , opacity:'0.1'}} />


                <Nav.Item className='pt-2'>
                  <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="first">


                   <img src={home} alt="home" className='fs-5 mt-2' style={{width:'24px',height:"24px"}} />
                 <p className='text-middle my-2 ps-2 p-0 g' style={{color:'#787486' ,fontWeight:'400',letterSpacing:'0.7px'}}>Home</p> 
                    
                     </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item className=''>
                  <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="second">
                  <img src={message} alt="home" className='fs-5 mt-2' style={{width:'24px',height:"24px"}} />
                    <p className='text-middle my-2 p-0 ps-2 g' style={{color:'#787486' ,fontWeight:'400',letterSpacing:'0.7px'}}>Messages</p>
                  </Nav.Link>
                </Nav.Item> 

               
                <Nav.Item className=''>
                  <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="third">
                  <img src={gallery} alt="home" className='fs-5 mt-2' style={{width:'24px',height:"24px"}} />
                    <p className='text-middle ps-2 my-2 p-0 g' style={{color:'#787486' ,fontWeight:'400',letterSpacing:'0.7px'}}>Gallery</p>
                  </Nav.Link>
                </Nav.Item>

             

                <Nav.Item className=''>
                  <Nav.Link className='fs-6 d-flex p-0 px-2 ' style={{ margin: '0.2rem' }} eventKey="fourth">
                  <img src={music} alt="home" className='fs-5 mt-2' style={{width:'24px',height:"24px"}} />
                    <p className='text-middle ps-2 my-2 p-0 g' style={{color:'#787486' ,fontWeight:'400',letterSpacing:'0.7px'}}>Music</p>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className=''>
                  <Nav.Link className='fs-6 d-flex p-0 px-2' style={{ margin: '0.2rem' }} eventKey="fifth">
                  <img src={user} alt="home" className='fs-5 mt-2' style={{width:'24px',height:"24px"}} />
                    <p className='text-middle ps-2 my-2 p-0 g' style={{color:'#787486' ,fontWeight:'400',letterSpacing:'0.7px'}}>Profile</p>
                  </Nav.Link>
                </Nav.Item>


              

                   


              </Nav>
            </Col>
          <Col sm={10} className='sidebar-screens card pt-4 ps-0'style={{backgroundColor:'#F8F8F8'}}>
          
              
          <Tab.Content>


             <TopNavbar onSearch={handleSearch} activeTab={activeTab} />

            <Tab.Pane style={{ color: "black" }} eventKey="first">
             
           <Home searchQuery={searchQuery} activeTab={activeTab} />
           
            </Tab.Pane>
            {/* <Tab.Pane style={{ color: "black", border: "none" }} eventKey="second">
           
              Messages
           
            </Tab.Pane> */}

            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="third">
             
             <Gallery searchQuery={searchQuery} activeTab={activeTab} />
            
            </Tab.Pane>
            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="fourth">
            <Music searchQuery={searchQuery} activeTab={activeTab} />
          </Tab.Pane>


            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="fifth">
           <Profile />
          </Tab.Pane>
        



  

          </Tab.Content>
        
        </Col>
          
           
          </Row>
        </Tab.Container>
      </div>





    </>
  )
}

























