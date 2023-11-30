import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch,useSelector } from "react-redux";
import { getAllFvrtCollection,addNewCollection, musicFvrtCollections } from "../../redux/features/auth/authSlice";

const MyFavouriteDropDown = ({ selectedCheckboxes }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user[0]._id;

   const { userList } = useSelector((state) => state.auth);
   



   const collections = userList?.FvrtCollections?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  // const [collections, setCollections] = useState([]);

  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);

  const [newCollectionTitle,setNewCollectionTitle] = useState({
    title:'',
    user_id:user_id,
    sound_id:selectedCheckboxes,
  })

  const [addFvrtCollections,setAddFvrtCollections] = useState({
    collection_ids:[],
    user_id:user_id,
    sound_ids:selectedCheckboxes
  })

 

  const dispatch = useDispatch()
     

  const getData = async () =>{
    await dispatch(getAllFvrtCollection())
   }
       useEffect(()=>{
         getData()
       },[])



      //  useEffect(()=>{
      //   setCollections(userList?.FvrtCollections?.data)

      //    if(!collections){
      //     return <p><b>Collection</b> is loading...</p>
      //    }
      //  },[])


       

       
      const filteredCollections = collections?.length > 0
      ? collections.filter((item) =>
          item?.title.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      : [];

  


  const handleNewCollectionChange = (e) => {
    const { name, value } = e.target;
    setNewCollectionTitle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewCollectionClick = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    setShowNewCollectionInput(true);
  };

 
  const handleCheckboxChange = (id) => {
    setAddFvrtCollections((prevState) => {
      const updatedCollectionIds = [...prevState.collection_ids];
      const index = updatedCollectionIds.indexOf(id);
      if (index === -1) {
        // ID is not present in the array, so add it
        updatedCollectionIds.push(id);
      } else {
        // ID is already present in the array, so remove it
        updatedCollectionIds.splice(index, 1);
      }
      return {
        ...prevState,
        collection_ids: updatedCollectionIds,
      };
    });
  };
  


  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
  };


  const handleNewCollectionSave = (e) => {
  e.stopPropagation(); // Prevent dropdown from closing
  dispatch(addNewCollection(newCollectionTitle))
    .then(() => {
      setNewCollectionTitle({
        title: '',
      });
      dispatch(getAllFvrtCollection());
    });
};




  const saveMusic = () =>{
    dispatch(musicFvrtCollections(addFvrtCollections))
    .then(()=>{
      dispatch(getAllFvrtCollection())
    })
  }

  return (
    <>
      <div className="dropdown" onClick={handleDropdownClick}>
        <button
          className="btn btn-transparent text-white dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add To My Favorite
        </button>
        <ul className="dropdown-menu" style={{ minWidth: "350px" }}>
          <li className="p-2 w-100">
            <div className="d-flex border  w-100">
              <div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="compaignSearch form-control w-100 border-0 rounded-0 bg-transparent text-dark"
                  placeholder="Search"
                  onClick={handleDropdownClick}
                />
              </div>
              <div class="p-2 text-end ps-5">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
          </li>
          {filteredCollections?.map((item, i) => {
            return (
              <li className="px-2" key={i}>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item._id)}
                    id={`checkbox${i}`}
                  />
                  <label class="form-check-label" for={`checkbox${i}`}>
                    {item.title}
                  </label>
                </div>
              </li>
            );
          })}
          <li className="p-1" onClick={handleNewCollectionClick}>
            <div className="row border-top mt-1 pt-2">
              <div className="col-8 p-0  text-center d-flex align-items-center justify-content-start ps-4">
                {showNewCollectionInput ? (
                  <input
                    type="text"
                    name="title"
                    value={newCollectionTitle.title}
                    onChange={handleNewCollectionChange}
                    placeholder="New Collection"
                    onClick={handleDropdownClick}
                  />
                ) : (
                  <small>+New Collection</small>
                )}
              </div>
              <div
                className="col-4  mt-1  text-center"
                
              >
                <button className="btn btn-dark btn-sm rounded-pill px-3"onClick={handleNewCollectionSave}>{showNewCollectionInput ? "Save" : "Add"}</button>
              </div>

            </div>
          </li>
<div className=" pt-2 text-center">
<button className="btn btn-dark btn-sm  text-center  rounded-pill px-3" onClick={saveMusic}>Save Music</button>

</div>
        </ul>
      </div>
    </>
  );
};

export default MyFavouriteDropDown;
