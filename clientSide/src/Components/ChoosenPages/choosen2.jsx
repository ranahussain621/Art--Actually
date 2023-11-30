import image5 from "../../assets/images/cardImage5.png";
import image4 from '../../assets/images/cardImage4.png'
import image9 from '../../assets/images/cardImage9.png'
import choosenImg from '../../assets/images/choosen.jpg'
const choosen2 = () => {
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
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image9
    },
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image9
    },
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image9
    },
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image9
    },
    {
      title: "Golden Egg",
      by: "by BobySosen",
      img:image9
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
}}></div>
      <div
        className="container-fluid px-4 "
        style={{ fontFamily: "sans-serif", color: "cadetblue",
      backgroundColor:'rgba(238,237,235,255)'  }}
      >
        <h2 className="fw-bold">My Favourite Art Actually</h2>
        <div className="card-layer mt-4 px-3 py-3 " style={{
          border:' #C5C4C2',
          backgroundColor:'#FEFEFE',
          borderRadius:'7px',
          boxShadow:'-2px 4px 7px #BEBEBE'
        }} >
          <div className="row justify-content-center text-center">
            {arrCard.map((e,i) => {
              return (
                <>
                  <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 py-2 " key={i}>
                    <div className="card" style={{
                     boxShadow:'4px 5px 7px  #BEBEBE'
                  }}>
                      <img className="card-img-top" src={e.img} alt="no-immage" />
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
          </div>
        </div>
      </div>
    </>
  );
};
export default choosen2;