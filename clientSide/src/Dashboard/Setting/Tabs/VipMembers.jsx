import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { VipMembersList } from '../../../redux/features/auth/authSlice';



const VipMembers = () => {


    const vipMembers = useSelector((state)=>state.auth.VipMemberList)
  const dispatch = useDispatch()

  useEffect(()=>{
    const getData =async () =>{
     await dispatch(VipMembersList('?type=vip'))
    
    }
    getData()
  },[dispatch])





  return (
    <>
  <p style={{fontSize:"16px", fontWeight:"500", color:"rgb(120, 116, 134)"}}>The Billing information of VIP Members</p>
  <table class="table text-center" style={{backgroundColor:"white", border:"1px solid #B0A7A7"}}>
        <thead className=''>
          <tr className="border-bottom" style={{color:'rgb(120, 116, 134)'}}>
            <th scope="col border-end" style={{fontSize:"14px", fontWeight:"600", }}> Name</th>
            <th scope="col border-end" style={{fontSize:"14px", fontWeight:"600", }}>Email</th>
            <th scope="col" style={{fontSize:"14px", fontWeight:"600", }}>Total Amount</th>
          
          </tr>
        </thead>
        <tbody>
          {vipMembers?.data?.map((item,i) => {
            const name = `${item.firstName} ${item.lastName}`
            return (
                <tr className='text-muted' key={i}>
                <td  className='border-end ' style={{textTransform:"capitalize"}}>{name}</td>
                <td className='border-end'>{item.email}</td>
                <td className=''>$ 20</td>
          
                <td>
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
  </>
  )
}

export default VipMembers