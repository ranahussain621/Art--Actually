import React, { useEffect, useState } from "react";
import cardImg1 from "../../assets/images/cardImage7.png";
import { useDispatch } from "react-redux";
import { getAllArts } from "../../redux/features/auth/authSlice";
import ArtWorkDetails from "../../Screens/LandingPages/ArtWorkDetails";

const InstallationArt = () => {
  const [Art, setArt] = useState([]);

  const [DetailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();



  const dispatch = useDispatch();

  const DetailsScreen = (item) => {
    setDetailsOpen(!DetailsOpen);
    setSelectedItem(item);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(
        getAllArts({ format: "64fb229715eef9c9877279bf" })
      );
      const artData = res?.payload?.data || [];
      setArt([...artData].reverse());
    };
    getData();
  }, [dispatch]);



  return (
    
        <div className="col-md-12">
            {DetailsOpen && (
          <div className="modal-show-uploadArt">
            <div className="modal-content-uploadArt">
              <ArtWorkDetails
                closeWindow={DetailsScreen}
                selectedItem={selectedItem}
              />
            </div>
          </div>
        )}


              <div className="row justify-content-center">
        {Art?.map((item, i) => (

          <div key={i} className="col-sm-6 p-0 art__img__wrapper pe-1" onClick={() => DetailsScreen(item)}>
            <img
              src={item?.image[0]}
              alt=""
              className="img-fluid w-100 h-100 object-cover"
              style={{ cursor: 'pointer',}}
            />
          </div>
        ))}

        {/* Fill remaining spaces with cardImg3 */}
        {Array(Math.max(0,4 - (Art?.length || 0))).fill(null).map((_, i) => (
          <div key={i} className="col-sm-6 p-0 art__img__wrapper pe-1">
            <img
              src={cardImg1}
              alt=""
              className="img-fluid w-100 h-100 object-cover"
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

        </div>
  );
};

export default InstallationArt;
