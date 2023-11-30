
import React from 'react'


import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { AllArtWork } from '../Screens/LandingPages/AllArtWork';

import "../Styles/sidebar.css"
import InstallationArt from './InstallationArtLandingPage/InstallationArt';
import Printing from './PrintingLandingPage/Printing';
import MusicLandingPage from './Music LandingPage/Music';


export default function LandingSideBar() {

  return (
    <>


      <div >
        {/* <h2>User Dashboard</h2> */}
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className='m-0'>
          <Col sm={10} className='sidebar-screens p-0 mt-1'style={{paddingTop:'30px',background:'#F0EEED'}}>
          
              
          <Tab.Content  >


            <Tab.Pane style={{ color: "black" }} eventKey="first">
             <AllArtWork/>
            </Tab.Pane>
            
            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="second">  
              <div className='mb-5'>
                <Printing />      
              </div>
            </Tab.Pane>

            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="third">
              <div className='mb-5'>
              <InstallationArt />
              </div>
            </Tab.Pane>


            <Tab.Pane style={{ color: "black", border: "none" }} eventKey="fourth">  
            <div className='mb-5'>
              <MusicLandingPage />
            </div>
          </Tab.Pane>

        
          </Tab.Content>


        </Col>
            <Col sm={2} className='sidebar-area shadow-end p-0 pt-5' style={{paddingTop:'30px',background:'#F0EEED'}}>
             
            
              <Nav variant="pills" className="flex-column">
                {/* side menu titles */}


                <Nav.Item className='p-0'>
                  <Nav.Link className='fs-6 d-flex p-0 m-0 w-100' style={{ margin: '0.2rem',background:'transparent' }} eventKey="first">
             
                    <p className='text-middle color_change openSans-400 mt-1 ps-3 p-0' style={{color:'#709DA7' , letterSpacing:'0.7px',fontWeight:'600'}}>ALL ART WORKS</p> </Nav.Link>
                </Nav.Item>

                <Nav.Item className=''>
                  <Nav.Link className='fs-6 d-flex p-0 m-0' style={{ margin: '0.2rem',background:'transparent'  }} eventKey="second">
             
                    <p className='text-middle color_change openSans-400 mt-1 ps-3 p-0' style={{ letterSpacing:'0.7px',fontWeight:'500'}}>PRINTING</p>
                  </Nav.Link>
                </Nav.Item>


<Nav.Item>
  <Nav.Link className='fs-6 d-flex p-0 w-100' style={{ margin: '0.2rem', background: 'transparent' }} eventKey="third">
    <p className='text-middle color_change openSans-400 mt-1 ps-3 p-0' style={{  letterSpacing: '0.7px', fontWeight: '500' }}>INSTALLATION ART</p>
  </Nav.Link>
</Nav.Item>
                <Nav.Item className=''>
                  <Nav.Link className='fs-6 d-flex p-0 ' style={{ margin: '0.2rem',background:'transparent'  }} eventKey="fourth">
        
                    <p className='text-middle color_change mt-1 openSans-400 ps-3 p-0' style={{ letterSpacing:'0.7px',fontWeight:"500"}}>MUSIC</p>
                  </Nav.Link>
                </Nav.Item>

             



              </Nav>
            </Col>
           
          </Row>
        </Tab.Container>
      </div>





    </>
  )
}

























