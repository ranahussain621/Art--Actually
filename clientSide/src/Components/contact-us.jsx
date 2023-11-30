import React, { useState } from 'react'
import './contact-us.css'
import blogbar from "../assets/images/blogbar.jpg"
import Logo from '../assets/images/loginLogo.png'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {contactUs} from '../redux/features/auth/authSlice'


const Contact = ()=> {


     const dispatch = useDispatch()

   const [contact,setContact] = useState({
    name:'',
    email:'',
    query:''
   })

   

   const [errors, setErrors] = useState({});


   

   const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when input changes

  };

  const validateInputs = () => {
  
    let isValid = true;
    const updatedErrors = {};

    if (!contact.name) {
      updatedErrors.name = "Name is required";
      isValid = false;
    }

    if (!contact.email && !validateEmail(contact.email)) {
      updatedErrors.email = contact.email ? 'Please enter a valid email address'
      : 'Email is required';
      isValid = false;
    }

    if (!contact.query) {
      updatedErrors.query = "Query is required";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };


  const validateEmail = (email) => {
     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return false;
    }

  };


  const submit = async(e)=>{
    e.preventDefault()
    if (!validateInputs()) {
      return;
    }
   
  
      await dispatch(contactUs(contact))
    .then(()=>{
      toast('Thank you for contacting us',{
        autoClose:1000
      })
    })
   setContact({
    name:"",
    email:'',
    query:""
   })
   
  }

  return (
    < >
       <div style={{
  backgroundImage: `url(${blogbar})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '110px' 
}}>
  {/* Content */}
</div>

         <div className='my-3 ms-4'>
          <h1 className='contact-text fs-1 openSans-600 p-3 pb-0' style={{color: "cadetblue"}}>Contact us</h1>
        </div>
        <div className="container-flud my-4 mx-5 rounded-5" style={{ backgroundColor:'#fefefe',color: "cadetblue" }}>
          <div className='row m-4 py-5'>
        <div className="form col-md-4 col-sm-6  ms-5">
       <div className="logo mb-4">
        <img src={Logo} style={{width:'250px'}} className='img-fluid' alt=""  />
       </div>
       <div className="para">
       <p className='openSans-700' style={{letterSpacing:'0.5px'}}>Art Actually CO company</p>
       <p className='openSans-600'>Address: <br />asddd,scssdw,wdw,xsx,sq <br />sxsx,sxs,sx,</p>
       <p className='openSans-600'>Phone: <br />+000 1234 123 4563 </p>
       <p className='openSans-600'>Email: <br />ifo@artactually.com</p>
       </div>
       <form onSubmit={submit}>
       <div className="input">
        <input type="text" className='form-control my-3 openSans-400' placeholder='Your name' name='name' value={contact.name} onChange={handleChange} />
        {errors.name && <span className="error text-danger">{errors.name}</span>}


        {/* <label htmlFor="" className='fs-3 mb-2 p-0'>Email</label> */}
        <input type='email' required className='form-control my-3 openSans-400' placeholder='Your email' name='email' value={contact.email} onChange={handleChange} />
        {errors.email && <span className="error text-danger">{errors.email}</span>}

        {/* <label htmlFor="" className='fs-3'>Queries</label> */}

        <textarea className="form-control my-3 th openSans-400" rows={6} id="" placeholder='Any questions' name='query' value={contact.query} onChange={handleChange}></textarea>
        {errors.query && <span className="error text-danger">{errors.query}</span>}

        <div className="pt-2">
               <button className='btn rounded-pill openSans-400 px-4' style={{background:'#709BA5',color:'white'}} type='submit'>Send</button>
   
       </div>
                            

       </div>
       </form>
        </div>
       
        <div className="col-md-7 col-sm-6">
       
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6806.578318942623!2d74.4279776129582!3d31.461230946534414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391908ea43d537e3%3A0x8ae3657d8794abf7!2sAskari%20XI%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1694093819521!5m2!1sen!2s"  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='contact-map w-100'/>
        </div>
       
        </div>
   
    </div>

    </>
  )
}

export default Contact
