import image5 from "../../assets/images/cardImage5.png";
import image4 from '../../assets/images/cardImage4.png'
import image9 from '../../assets/images/cardImage9.png'
import arrowImg from '../../assets/images/arrow.png'
import choosenImg from '../../assets/images/choosen.jpg'
import { Link } from "react-router-dom";
const choosen = () => {
  const arrCard = [
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image5
    },
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image4
    },
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image9
    },
  ];
  return (
    <>
        <div style={{
  backgroundImage: `url(${choosenImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '110px'
}}>
  {/* Content */}
</div>
      <div
        className="container-fluid px-4"
        style={{ fontFamily: "sans-serif", color: "cadetblue",
      backgroundColor:'rgba(238,237,235,255)' }}
      >
        <h2 className="fw-bold">My Favourite Art Actually</h2>
        <div className="card-layer mt-4 px-3 py-3 " style={{
          border:' #C5C4C2',
          backgroundColor:'#FEFEFE',
          borderRadius:'7px',
          boxShadow:'-2px 4px 7px #BEBEBE'
        }} >
          <div className="row justify-content-center">
            <div className="col-xl-2 col-lg-2 col-md-5 col-sm-12 col-12 align-self-center">
              <h4>Choose Folder Name ABCDE</h4>
              <p>10 items</p>
            </div>
            {arrCard.map((e,i) => {
              return (
                <>
                  <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-12 py-2" key={i}>
                    <div className="card" style={{
                     boxShadow:'4px 5px 7px  #BEBEBE'
                  }}>
                      <img className="card-img-top" src={e.img} alt="no-data" />
                      <div className="card-body" style={{height:'80px',backgroundColor:'#F8F8F8'}}>
                        <h5 className="card-title" style={{color:'black'}}> {e.title}</h5>
                        <p className="fw-bold">
                          {e.by}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
              <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-3 align-self-center">
                <p className="fw-bold">View More</p>
                    <Link to={'/choosefolder'}  style={{
                      textDecoration:'none',
                      color:'cadetblue'
                    }} className="fw-bold"> <img src={arrowImg} style={{width:'3rem',position:'relative',bottom:'2px'}} alt="Arrow" /></Link>
                  </div>
          </div>
        </div>
        <div className="card-layer mt-4 px-3 py-3 " style={{
          border:' #C5C4C2',
          backgroundColor:'#FEFEFE',
          borderRadius:'7px',
          boxShadow:'-2px 4px 7px #BEBEBE'
        }} >
          <div className="row justify-content-center">
            <div className="col-xl-2 col-lg-2 col-md-5 col-sm-12 col-12 align-self-center">
              <h4>Choose Folder Name ABCDE</h4>
              <p>10 items</p>
            </div>
            {arrCard.map((e,i) => {
              return (
                <>
                  <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-12 py-2" key={i}>
                    <div className="card" style={{
                     boxShadow:'4px 5px 7px  #BEBEBE'
                  }}>
                      <img className="card-img-top" src={e.img} alt="no-data" />
                      <div className="card-body" style={{height:'80px',backgroundColor:'#F8F8F8'}}>
                        <h5 className="card-title" style={{color:'black'}}> {e.title}</h5>
                        <p className="fw-bold">
                          {e.by}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
              <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-3 align-self-center">
                <p className="fw-bold">View More</p>
                    <Link to={'/choosefolder'}  style={{
                      textDecoration:'none',
                      color:'cadetblue'
                    }} className="fw-bold"> <img src={arrowImg} style={{width:'3rem',position:'relative',bottom:'2px'}} alt="Arrow" /></Link>
                  </div>
          </div>
        </div>
        <div className="card-layer mt-4 px-3 py-3 " style={{
          border:' #C5C4C2',
          backgroundColor:'#FEFEFE',
          borderRadius:'7px',
          boxShadow:'-2px 4px 7px #BEBEBE'
        }} >
          <div className="row justify-content-center">
            <div className="col-xl-2 col-lg-2 col-md-5 col-sm-12 col-12 align-self-center">
              <h4>Choose Folder Name ABCDE</h4>
              <p>10 items</p>
            </div>
            {arrCard?.map((e,i) => {
              return (
                <>
                  <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6 col-12 py-2" key={i}> 
                    <div className="card" style={{
                     boxShadow:'4px 5px 7px  #BEBEBE'
                  }}>
                      <img className="card-img-top" src={e.img} alt="no-data" />
                      <div className="card-body" style={{height:'80px',backgroundColor:'#F8F8F8'}}>
                        <h5 className="card-title" style={{color:'black'}}> {e.title}</h5>
                        <p className="fw-bold">
                          {e.by}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
              <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 col-3 align-self-center">
                <p className="fw-bold">View More</p>
                    <Link to={'/choosefolder'}  style={{
                      textDecoration:'none',
                      color:'cadetblue'
                    }} className="fw-bold"> <img src={arrowImg} style={{width:'3rem',position:'relative',bottom:'2px'}} alt="Arrow" /></Link>
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default choosen;