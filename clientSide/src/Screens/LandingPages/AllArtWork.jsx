import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cardImg1 from "../../assets/images/cardImage1.png";
import cardImg3 from "../../assets/images/cardImage3.png";
import cardImg4 from "../../assets/images/cardImage4.png";
import cardImg7 from "../../assets/images/cardImage7.png";
import cardImg8 from "../../assets/images/cardImage8.png";

import { getAllArts, getAllSound } from "../../redux/features/auth/authSlice";
import ArtWorkDetails from "./ArtWorkDetails";
import "./allartwork.css";
import { ListOfBlogs } from "../../redux/features/auth/PaymentSlice";

export const AllArtWork = () => {
  const [sound, setSound] = useState([]);
  const [art, setArt] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch();

  // const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const [DetailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getAllSound());
      setSound(data?.payload.data);

      const res = await dispatch(getAllArts());
      const artData = res?.payload.data || [];
      setArt([...artData].reverse());

      const val = await dispatch(ListOfBlogs());
      setBlogs(val?.payload?.data);
    };
    getData();
  }, [dispatch]);

  const DetailsScreen = (item) => {
    setDetailsOpen(!DetailsOpen);
    setSelectedItem(item);
  };

  return (
    <>
      <div className="col-md-12">
        {DetailsOpen && (
          <div className="modal-show-landingpage">
            <div className="modal-content-landingpage">
              <ArtWorkDetails
                closeWindow={DetailsScreen}
                selectedItem={selectedItem}
              />
            </div>
          </div>
        )}

        {/* row 1 */}

        <div className="row justify-content-center">
          {art?.slice(0, 2)?.map((item, i) => {
          

            return (
              <div
                key={i}
                className="col-sm-6 p-0 art__img__wrapper pe-1"
                onClick={() => DetailsScreen(item)}
              >
                <img
                  src={item.image[0]}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            );
          })}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 2 - (art?.slice(0, 2)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div key={i} className="col-sm-4 p-0 art__img__wrapper pe-1">
                <img
                  src={cardImg1}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>

        {/* row 2 */}

        <div className="row justify-content-center mt-1">
          {art?.slice(2, 5)?.map((item, i) => (
            <div
              key={i}
              className="col-sm-4 p-0 art__img__wrapper pe-1"
              onClick={() => DetailsScreen(item)}
            >
              <img
                src={item.image[0]}
                alt=""
                className="img-fluid w-100 h-100 object-cover"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 3 - (art?.slice(2, 5)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div key={i} className="col-sm-4 p-0 art__img__wrapper pe-1">
                <img
                  src={cardImg3}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>

        <div
          className="row text-center py-md-2 pe-2"
          style={{ background: "#709DA7", marginTop: "2px" }}
        >
          {sound?.slice(0, 2)?.map((item, i) => {
           
            // const audioRef = React.createRef();
            return (
              <div className="player w-100 p-0 px-md-2" key={i}>
                <audio
                  //  ref={audioRef}
                  src={item.file ? item?.file : ""}
                  controls
                  preload="none"
                  className="w-100"
                  // onPlay={() => handlePlay(audioRef.current)}
                />
                <p></p>
              </div>
            );
          })}
        </div>

        {/* row 3 */}

        <div
          className="row justify-content-center "
          style={{ marginTop: "2px" }}
        >
          {art?.slice(6, 8)?.map((item, i) => (
            <div
              key={i}
              className="col-sm-6 p-0 art__img__wrapper pe-1"
              onClick={() => DetailsScreen(item)}
            >
              <img
                src={item.image[0]}
                alt=""
                className="img-fluid w-100 h-100 object-cover"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 2 - (art?.slice(6, 8)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div key={i} className="col-sm-6 p-0 art__img__wrapper pe-1">
                <img
                  src={cardImg4}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>

        {/* row 4 */}

        <div className="row justify-content-center mt-1">
          {art?.slice(9, 13)?.map((item, i) => (
            <div
              key={i}
              className={`col-sm-3 p-0 art__img__wrapper pe-1`}
              onClick={() => DetailsScreen(item)}
            >
              <img
                src={item.image[0]}
                alt=""
                className="img-fluid w-100 h-100 object-cover"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 4 - (art?.slice(9, 13)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div key={i} className={`col-sm-3 p-0 art__img__wrapper pe-1`}>
                <img
                  src={cardImg7}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>

        {/* row 5 */}

        <div className="row justify-content-center mt-1">
          {art?.slice(14, 17)?.map((item, i) => (
            <div
              key={i}
              className={`col-sm-${
                i === 1 ? "6" : "3"
              } p-0 art__img__wrapper pe-1`}
              onClick={() => DetailsScreen(item)}
            >
              <img
                src={item.image[0]}
                alt=""
                className="img-fluid w-100 h-100 object-cover"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 3 - (art?.slice(14, 18)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`col-sm-${
                  i === 1 ? "6" : "3"
                } p-0 art__img__wrapper pe-1`}
              >
                <img
                  src={cardImg8}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>

        <div
          className="row text-center pe-2 mt-3"
          style={{ background: "#709DA7", marginTop: "2px" }}
        >
          {sound?.slice(2, 4)?.map((item, i) => {
            // const audioRef = React.createRef();
            return (
              <div className="player w-100 p-0 px-md-2" key={i}>
                <audio
                  //  ref={audioRef}
                  src={item.file ? item?.file : ""}
                  controls
                  preload="none"
                  className="w-100"
                  // onPlay={() => handlePlay(audioRef.current)}
                />
                <p></p>
              </div>
            );
          })}
        </div>

        {/* Cards */}
        <div
          className="row blog__section p-0 mt-3"
          style={{ marginTop: "2px" }}
        >
          {blogs?.map((data, i) => {
            return (
              <div
                key={i}
                className="col-xl-4 col-md-4  col-sm-6 p-0"
                style={{ textTransform: "capitalize" }}
              >
                <div className="content shadow-sm w-100 ">
                  <div className="card-body art__img__wrapper">
                    <h6 className="">
                      {data?.categories.map((category, j) => {
                        return (
                          <span key={j} className="category px-2 ps-0">
                            {category}
                          </span>
                        );
                      })}
                    </h6>
                    <h5 className="" style={{ color: "#709da7" }}>
                      {data.title}
                    </h5>
                    <p
                      className=""
                      style={{ color: "#709da7", textAlign: "justify" }}
                    >
                      {data.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-3">
          {art?.slice(18, 22)?.map((item, i) => (
            <div
              key={i}
              className="col-sm-3 p-0"
              onClick={() => DetailsScreen(item)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image[0]}
                alt=""
                className="img-fluid w-100 h-100 object-cover"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 4 - (art?.slice(18, 22)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div key={i} className="col-sm-3 p-0 art__img__wrapper pe-1">
                <img
                  src={cardImg8}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>

        <div className="row my-1 mb-3">
          {art?.slice(23, 26)?.map((item, i) => (
            <div
              key={i}
              className="col-sm-3 p-0"
              onClick={() => DetailsScreen(item)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image[0]}
                alt=""
                className="img-fluid w-100 h-100 object-cover"
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Fill remaining spaces with cardImg3 */}
          {Array(Math.max(0, 4 - (art?.slice(23, 26)?.length || 0)))
            .fill(null)
            .map((_, i) => (
              <div key={i} className="col-sm-3 p-0 art__img__wrapper pe-1">
                <img
                  src={cardImg3}
                  alt=""
                  className="img-fluid w-100 h-100 object-cover"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
