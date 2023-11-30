import React, { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import SelectedBoxOptions from "./SelectedBoxOptions";
import { useDispatch,useSelector } from "react-redux";
import { getUserArts } from "../../redux/features/auth/authSlice";
import TablePagination from'../Pagination/TablePagination'
import uploadimg from '../../assets/icons/uploadblog.png'
import './uploadart.css'

const UserUploadedArtTable = ({ searchInput , currentTab}) => {
  
  const user = JSON.parse(localStorage.getItem("user"));

  const user_id = user?.user[0]._id;


 
         const ArtData = useSelector((state)=>state?.auth?.userArt?.userGallery)


  const pageSize = 5;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setpaginatedData] = useState()
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectAllCheckboxes, setSelectAllCheckboxes] = useState(false);

  const dispatch = useDispatch();


    
  useEffect(() => {
    const getData = async () => {
     await dispatch(
        getUserArts({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          user_id,
        })
      );
     
    };
    getData();
  }, [user_id,dispatch]);





  useEffect(() => {
    if (searchInput) {
      const filter = ArtData?.data?.filter((item) =>
        item.title.toLowerCase().includes(searchInput?.toLowerCase())
      );

      setFilteredData(filter);
      setCurrentPage(1);
    }
    else if(ArtData){
      setFilteredData(ArtData?.data);
    }
  }, [ArtData, searchInput]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData?.length / pageSize);
     setTotalPage(totalPages);
  }, [filteredData, pageSize]);

 

  useEffect(() => {
    if (filteredData?.length > 0) {
      const totalPages = Math.ceil(filteredData?.length / pageSize);
      setTotalPage(totalPages);
    } else {
      setTotalPage(0);
    }
  }, [filteredData, totalPage]);


  // Pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);



  // Handle checkbox selection
  const handleCheckboxSelect = (id) => {
    let updatedSelectedCheckboxes = [];

    if (selectedCheckboxes.includes(id)) {
      //  If checkbox is already selected, remove it from the selectedCheckboxes array
      updatedSelectedCheckboxes = selectedCheckboxes.filter(
        (checkboxId) => checkboxId !== id
      );
    } else {
      // If checkbox is not selected, add it to the selectedCheckboxes array
      updatedSelectedCheckboxes = [...selectedCheckboxes, id];
    }

    setSelectedCheckboxes(updatedSelectedCheckboxes);

    // Check if all the bottom checkboxes are selected to update the selectAllCheckboxes state
    const allSelected = paginatedData.every((row) =>
      updatedSelectedCheckboxes.includes(row._id)
    );
    setSelectAllCheckboxes(allSelected);
  };

  const handleTableHeadCheckboxSelect = () => {
    const updatedSelectAllCheckboxes = !selectAllCheckboxes;
    const updatedSelectedCheckboxes = updatedSelectAllCheckboxes
      ? paginatedData.map((row) => row._id)
      : [];

    setSelectAllCheckboxes(updatedSelectAllCheckboxes);
    setSelectedCheckboxes(updatedSelectedCheckboxes);
  };

  useEffect(() => {
    setSelectAllCheckboxes(
      currentItems?.length > 0 &&
        selectedCheckboxes?.length === currentItems?.length
    );
  }, [selectedCheckboxes, currentItems, selectAllCheckboxes]);



  const paginatedlist=(val) => {
    setpaginatedData(val)
    }


  return (
    <div>
      {selectedCheckboxes?.length > 0 && (
        <SelectedBoxOptions selectedCheckboxes={selectedCheckboxes} currentTab={currentTab} />
      )}

      <Table hover className="table-responsive">
        <thead>
          <tr className="">
            <td>
              <Form.Check
                type="checkbox"
                checked={selectAllCheckboxes}
                onChange={handleTableHeadCheckboxSelect}
                name="allSelect"
              />
            </td>

            <td className="text-muted">
              Art Work
            </td>
            <td className="text-muted ps-0">Visibility</td>
            <td className="text-muted">Date </td>
            <td className="text-muted">Views</td>
      
            <td className="text-muted">Donation(Art-Act-Point)</td>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.length > 0 ? (

            paginatedData?.map((row,i) => {

              const timestamp = Number(row?.created_at); // Your timestamp here
              const date = new Date(timestamp);
              const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];   
              const month = monthNames[date.getMonth()]; // Get the month name
              const year = date.getFullYear();
              const day = String(date.getDate()).padStart(2, '0');
             
          
              return (
                <tr key={i} className="">
                  <td>
                    <Form.Check
                      type="checkbox"
                      className="pt-4"
                      checked={selectedCheckboxes.includes(row._id)}
                      onChange={() => handleCheckboxSelect(row._id)}
                      name="check"
                    />
                  </td>

                  <td className="d-flex align-items-center">
                        <img className="responsive-image" src={row.image? row.image[0]:uploadimg} alt="" style={{height:"90px", width:'90px'}}/>
                      <div className="ps-3">
                        <p className="fw-bold fs-6 h5 m-0 pt-1" style={{textTransform:"capitalize"}}>{row.title}</p>
                        <p
                          className=" pt-1"
                          style={{ fontSize: "14px", fontWeight: "700",textTransform:"capitalize",color:'#709AA4' }}
                         
                        >
                          

                          {row.description?.split(' ').slice(0, 3).join(' ')}
                         {row.description?.split(' ').length > 3 ? '...' : ''}
                        </p>
                      </div>
                 
                  </td>
 
              
                  <td className=" pt-5" style={{ fontWeight: "600" ,textTransform:"capitalize",color:'#709AA4'}}>
                   {row.visibility ? row.visibility : 'Public'}
                  </td>
                  
              
                  <td
                    className="  pt-4"
                    style={{ fontWeight: "700",textTransform:'capitalize' }}
                  >
                   <div className="p-0 m-0">
                        {/* <p className="fw-bold fs-6 h5 m-0 pt-1" >23 May 2023</p> */}
                        <div className="date-detail" style={{textTransform:"capitalize",color:'#709AA4'}}>
              <p className="m-0"><span>{day}</span>- <span>{month}</span>- <span>{year}</span></p>
            </div>
                        <p
                          className=" pt-1"
                          style={{ fontSize: "14px", fontWeight: "700",textTransform:"capitalize",color:'#709AA4' }} > Uploaded  </p>
                      </div>
                  </td>

                  <td className=" pt-5 ps-4" style={{ fontWeight: "600" ,textTransform:"capitalize",color:'#709AA4'}}>
                  { Math.floor(Math.random() * 90) + 10 }
                  </td>
                  
                  <td className=" pt-5 " style={{ fontWeight: "600" ,textTransform:"capitalize",color:'#709AA4'}}>
                   {row.donation}
                  </td>
                </tr>
              );
            })
          ) : (
            <div className="ps-5 pt-5 fs-6 openSans-300 text-muted">No Data Found</div>
          )}
        </tbody>
      </Table>

     
  
     <TablePagination list={filteredData} paginatedList={paginatedlist}/>
    
     
    </div>
  );
};

export default UserUploadedArtTable;
