import Carousel from 'react-bootstrap/Carousel';
import carosal1 from "../assets/images/main111.jpg"
import carosal2 from "../assets/images/main222.jpg"
import carosal3 from "../assets/images/main333.jpg"
import carosal4 from "../assets/images/main444.jpg"
import carosal5 from "../assets/images/main555.jpg"
import carosal7 from "../assets/images/main777.jpg"
import './contact-us.css'
function carousel1() {
  return (
    <Carousel 
  
    >
      <Carousel.Item interval={3000}>


      <div style={{
  backgroundImage: `url(${carosal1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '870px' 
}}>

</div>

      
       
      </Carousel.Item>

      <Carousel.Item  interval={3000}>


      <div style={{
  backgroundImage: `url(${carosal4})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '870px' 
}}>

</div>
      
      </Carousel.Item>


      <Carousel.Item interval={3000}>

      <div style={{
  backgroundImage: `url(${carosal2})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '870px' 
}}>

</div>
 
      </Carousel.Item>

      <Carousel.Item interval={3000}>


<div style={{
backgroundImage: `url(${carosal3})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
height: '870px' 
}}>

</div>


 
</Carousel.Item>

<Carousel.Item  interval={3000}>


<div style={{
backgroundImage: `url(${carosal5})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
height: '870px' 
}}>

</div>

</Carousel.Item>



<Carousel.Item interval={3000}>

<div style={{
backgroundImage: `url(${carosal7})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
height: '870px' 
}}>

</div>

</Carousel.Item>
    
    
 
    </Carousel>
  );
}

export default carousel1;