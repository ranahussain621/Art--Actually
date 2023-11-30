import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import "./sidebar.css";
import Setting from '../Setting/Setting';
import UserList from '../Userlist/UserList';
import Navbar from '../Navbar/TopNavbar';

import { faList } from "@fortawesome/free-solid-svg-icons";


import mainLogo from '../../assets/images/mainLogo.png'
import Query from '../Queries/Query';
import DonationScreenForAdmin from '../../Screens/AdminDashboard/DonationManagment/DonationScreenForAdmin';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import PaymentOutRequest from '../../Screens/AdminDashboard/PaymentOut/PaymentOutRequest';
import BlogScreen from '../../Screens/AdminDashboard/Blogs/BlogScreen';
import VirtualEventList from '../../Screens/AdminDashboard/VirtualEvents/VirtualEventList';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';






export default function SideBar() {

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('first');
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarVisible, setSidebarVisible] = useState(false);
   
    function handleSidebarClick() {
      setSidebarVisible(!sidebarVisible);
    }
    const handleSearch = (tab,query) => {
        setActiveTab(tab);
        setSearchQuery(query);
    };



    return (
        <>

            <div className='rana'>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                    <Row className='m-0 mb-3' style={{ minHeight: '750px' }}>

                        <Col sm={1} md={2} className={`sidebar-area shadow-end card shadow-lg pe-0 pt-4`}>
                        <button
                type="button"
                onClick={handleSidebarClick}
                className="text-start sideBar-icon bg-transparent border-0"
              >
                <FontAwesomeIcon icon={faList} />
              </button>

                            <Nav variant="pills" className="flex-column">
                                {/* side menu titles */}
                                <div>
                                    <p className='text-middle  mt-2  ms-3' style={{ margin: '0.2rem', color: '#709CA6' }}>
                                        <img src={mainLogo} className='img-fluid' alt="" onClick={() => navigate('/dashboard/admin-dashboard ')} />
                                        <button type="button" className='text-start sideBar-icon bg-transparent border-0'>
                                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                        </button>
                                    </p>
                                </div>

                                <hr className='w-100 mb-3' style={{ borderBottom: '1px solid grey', opacity: '0.1' }} />


                                <Nav.Item className='pt-2'>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="first">

                                    <div className=" d-flex align-items-center">
                                    <BackupTableOutlinedIcon className='adminIcon' style={{ fontSize: '30px', color:'#709CA6' }}/>
                                        </div>
                                       
                                        <p className='adminTitle title text-middle my-2 ps-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>User List</p>

                                    </Nav.Link>
                                </Nav.Item>



                                <Nav.Item className=''>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="fourth">
                                        <div className="d-flex align-items-center">
                                              <HelpCenterOutlinedIcon style={{ fontSize: '30px', color:'#709CA6' }}/>
                                        </div>
                                  
                                        <p className='adminTitle title text-middle ps-2 my-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>Queries </p>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item className=''>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="fifth">
                                    <div className="d-flex align-items-center">
                                        <PaymentsOutlinedIcon style={{ fontSize: '30px', color:'#709CA6' }}/>
                                    </div>
                                        
                                        <p className='adminTitle title text-middle ps-2 my-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>Payments </p>
                                    </Nav.Link>
                                </Nav.Item>

                                <Nav.Item className=''>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="sixth">
                                    <div className="d-flex align-items-center">
                                        <RequestPageOutlinedIcon style={{ fontSize: '30px', color:'#709CA6' }}/>
                                    </div>
                                        
                                        <p className='adminTitle title text-middle ps-2 my-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>Pay Outs </p>
                                    </Nav.Link>
                                </Nav.Item>


                                
                                <Nav.Item className=''>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="seventh">
                                    <div className="d-flex align-items-center">
                                        <BookOutlinedIcon style={{ fontSize: '30px', color:'#709CA6' }}/>
                                    </div>
                                        
                                        <p className='adminTitle title text-middle ps-2 my-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>Blog</p>
                                    </Nav.Link>
                                </Nav.Item>


                                <Nav.Item className=''>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="eighth">
                                    <div className="d-flex align-items-center">
                                        <SettingsOutlinedIcon style={{ fontSize: '30px', color:'#709CA6' }}/>
                                    </div>
                                        
                                        <p className='adminTitle title text-middle ps-2 my-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>Setting</p>
                                    </Nav.Link>
                                </Nav.Item>



                                 
                                <Nav.Item className=''>
                                    <Nav.Link className='fs-6 d-flex  p-0 px-2' style={{ margin: '0.2rem' }} eventKey="ninth">
                                    <div className="d-flex align-items-center">
                                        <EmojiEventsOutlinedIcon style={{ fontSize: '30px', color:'#709CA6' }}/>

                                    </div>
                                        
                                        <p className='adminTitle title text-middle ps-2 my-2 p-0 g' style={{ color: '#709CA6', fontWeight: '400', letterSpacing: '0.7px' }}>Virtual Events</p>
                                    </Nav.Link>
                                </Nav.Item>


                            </Nav>
                        </Col>
                        <Col sm={11} md={10} className='sidebar-screens card pt-4 ps-0' style={{ backgroundColor: '#F8F8F8',borderBottom:"none" }}>
                            <Tab.Content>
                                <Navbar onSearch={handleSearch} activeTab={activeTab} />

                                <Tab.Pane style={{ color: "black" }} eventKey="first">
                                    <UserList activeTab={activeTab} searchQuery={searchQuery} />
                                </Tab.Pane>

                                 <Tab.Pane style={{ color: "black", border: "none" }} eventKey="third">
                                    <Setting activeTab={activeTab} />
                                </Tab.Pane> 

                                <Tab.Pane style={{ color: "black", border: "none" }} eventKey="fourth">
                                   <Query activeTab={activeTab}/>
                                </Tab.Pane>


                                <Tab.Pane style={{ color: "black", border: "none" }} eventKey="fifth">
                                 <DonationScreenForAdmin/>
                                </Tab.Pane>

                                <Tab.Pane style={{ color: "black", border: "none" }} eventKey="sixth">
                                 <PaymentOutRequest/>
                                </Tab.Pane>

                                <Tab.Pane style={{ color: "black", border: "none" }} eventKey="seventh">
                                 <BlogScreen/>
                                </Tab.Pane>


                                <Tab.Pane style={{ color: "black", border: "none" }} eventKey="eighth">
                                 <Setting />
                                </Tab.Pane>

                                <Tab.Pane style={{ color: "black", border: "none" }} eventKey="ninth">
                                 <VirtualEventList/>
                                </Tab.Pane>

                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>





        </>
    )
}

























