
import React,{useState} from 'react'


import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import UploadMusicTable from './UploadMusicTable';
import './compaign.css';
import SearchBar from './SearchBar';
import UserUploadedArtTable from './UserUploadArtTable';


export default function ReportTabs() {
 
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
   

  const [currentTabArt, setCurrentTabArt] = useState('Artwork');




  return (
    <>


      <div >
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className='m-0'>
        
            <Col sm={8} className='sidebar-area shadow-end w-100' style={{paddingTop:'30px' ,background:'none',borderBottom:'2px solid grey'}}>
             
            
              <Nav variant="" className="flex-row">
               
       <div className='d-flex align-items-center'>
           <Nav.Item className='added'>
                  <Nav.Link className='d-flex ' style={{ margin: '0.2rem' }} eventKey="first">
        
            <button  class="btn border-0 px-3 fw-bold" style={{color:'#709CA6',}}> Art Works</button>
                    </Nav.Link>
                </Nav.Item> 
                <Nav.Item className='added h-100'>
                  <Nav.Link className='fs-6 d-flex' style={{ margin: '0.2rem' }} eventKey="second">
          
            <button  class="btn border-0 px-3 fw-bold pb-0 mb-0 ps-0" style={{color:'#709CA6',}}> Music</button>
                  </Nav.Link>
                </Nav.Item>
       </div>

              </Nav>
            </Col>

     <div className="row ">
     <SearchBar
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
        className='border-0 py-3'
        
      />
     </div>


            <Col sm={12} className='sidebar-screens'style={{backgroundColor:'#F8F8F8'}}>
          
              
          <Tab.Content  >


            <Tab.Pane style={{ color: "black" }} eventKey="first">
         {/* <UserGallery 
        
         /> */}
         <UserUploadedArtTable  searchInput={searchInput}
         handleSearchInputChange={handleSearchInputChange} currentTab={currentTabArt} />
            </Tab.Pane>

            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="second">
           <UploadMusicTable 
           searchInput={searchInput}
           handleSearchInputChange={handleSearchInputChange}  />
              <div className='mb-5'>
              </div>
            </Tab.Pane>

           


          </Tab.Content>
        </Col>
           
          </div>
        </Tab.Container>
      </div>





    </>
  )
}

























