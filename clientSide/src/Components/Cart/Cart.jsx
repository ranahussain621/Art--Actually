import React from 'react'
// import "./style.css"
// import img1 from "."
const Cart = () => {
  return (
    <>
    <div className="container">
        <h2 className='cart_font'>My Cart</h2>
    </div>
      <div className="section">
<div className="container">
    <div className="row">
        {/* ===========table============= */}
        <div className="col-md-8">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity </th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
<div className="row">
    <div className="product_image">
<img src="" alt="" />

    </div>
    <div className="product_Text">

    </div>
</div>

      </th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

        </div>
        {/* =======cart totals========= */}
        <div className="col-md-4">



        </div>
    </div>
</div>

      </div>
    </>
  )
}

export default Cart
