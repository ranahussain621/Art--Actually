import React, { useEffect, useState } from 'react';
import './stepper.css';
import { ArtStyleCard } from './ArtStyleCard';
import { MusicStyleCard } from './MusicStyleCard';
import "../../Styles/SignupModal.css"
import font from "../../assets/images/font.PNG"
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
export const Stepper = ({closeModal}) => {
    // const { showinterest, handleClose, loginClose } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [isArtStyleCardClicked, setIsArtStyleCardClicked] = useState(false);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    }

  };
 

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleArtStyleCardClick = () => {
    setIsArtStyleCardClicked(true);
  };


  return (
    <>
    <div className="d-flex justify-content-center">
 <div className="d-flex justify-content-center rounded-3"  
      style={{width:'888px'}}
      >
  <div className=""
    
      >
        <div className="accordion w-100" id="accordionExample">
          <div className="steps p-0 my-2">
            <progress id="progress" value={(activeStep / 2) * 100} max={100}></progress>
            <div className="step-item m">
              <button
                className={` step-button px-4 me-3 border-0 rounded  text-center ${activeStep >= 0 ? 'done' : ''}`}
                type="button"
                
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded={activeStep === 0 ? 'true' : 'false'}
                aria-controls="collapseOne"
                onClick={() => handleStepClick(0)}
              >
                
              </button>
             
            </div>
            <div className="step-item ms-2 me-2">
              <button
                className={`step-button px-4 ms-3 border-0 rounded text-center ${activeStep >= 1 ? 'done' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded={activeStep === 1 ? 'true' : 'false'}
                aria-controls="collapseTwo"
                onClick={() => handleStepClick(1)}
              >
                
              </button>
             
            </div>
            <div className="step-item ms-2 me-2">
              <button
                className={`step-button px-4 ms-4 border-0 rounded text-center ${activeStep >= 2 ? 'done' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded={activeStep === 2 ? 'true' : 'false'}
                aria-controls="collapseThree"
                onClick={() => handleStepClick(2)}
              >
                
              </button>
             
            </div>
          </div>

            <div id="collapseOne" className={`collapse  ${activeStep === 0 ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
             
                <div className='text-center mt-4'>
                    <h3 style={{color:"#709BA5", fontWeight:"600"}}>What Art Style are you interested in?</h3>
                    <p style={{color:"#709BA5", fontWeight:"400"}}>This will customize your home feed</p>
                    
                </div>
          <div className="my-4">
               <div style={{paddingLeft:"28px", paddingRight:"28px"}}  onClick={handleArtStyleCardClick} type='button'>
               <ArtStyleCard    />
              </div>
          </div>
            
             
              
            </div>
        
      
            <div id="collapseTwo" className={`collapse ${activeStep === 1 ? 'show' : ''}`} aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className='text-center mt-4'>
                    <h3 style={{color:"#709BA5", fontWeight:"600"}}>What Music Style are you interested in?</h3>
                    <p style={{color:"#709BA5", fontWeight:"400"}}>This will customize your home feed</p>
                    
                </div>
               <div className="my-4">
                   <div style={{paddingLeft:"28px", paddingRight:"28px"}}  onClick={handleArtStyleCardClick} type='button'>
                <MusicStyleCard/>
                </div>
               </div>
             
               
              </div>
         
        <div className="d-flex justify-content-center w-100 my-2">
             {activeStep >= 1 &&  activeStep < 2 && ( 
                <>
                <button className='btn px-4' style={{background:'#709BA5' , color:'white'}} onClick={handlePrevious} disabled={activeStep === 0}>Previous</button>
                </> 
                        
               )}

              {activeStep < 2 && ( 
                <>
                       <button className='btn  ms-3 px-5' style={{background:'#709BA5' , color:'white'}} onClick={handleNext} disabled={!isArtStyleCardClicked} >Next</button>
                </> 
                        
               )}
                 
        </div>
       

          

       
            <div id="collapseThree" className={`collapse w-100  ${activeStep === 2 ? 'show' : ''}`} aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            
                <h3 className='text-center mt-4' style={{color:"#709BA5", fontWeight:"600"}}>Welcome to ArtActually</h3>
                <div className='mt-3 justify-content-center rounded'>
                  <img src={font} alt="" style={{width:'882px'}} className='img-fluid rounded-4 ' />
    {/* <div style={{ position: 'relative', width: '100%', height: '355px' }}>
        <img className='w-100' src={cardImage8} alt="" height={355} style={{ objectFit: 'cover' }} />
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '34px', }}>
           " Unleash your Creativity  <br/>  promote your Art <br/> Inspire the World "
        </p>
    </div> */}
<br/>
                <div className='col-md-12 mt-3 d-flex justify-content-center'>
                  <div className='container'>
   <button className='btn btn-info border-0 text-center col-md-9 rounded-pill w-100 my-2' 

                      onClick={()=>{
                       closeModal()
                        toast.success('verification e-mail sent to your account',{autoClose:1000})
                      }}
                      style={{background:'#709BA5' , color:'white',}}
                      >Done</button>
                </div>
                  </div>
                   
              
           
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
 
{/* <div className={showinterest ? "modal-show-compare display-block" : "modal-show-compare display-none"} style={{marginTop:'30px'}}>
    
      </div> */}

    
    </>
  );
};
