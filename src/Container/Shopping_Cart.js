import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { decrementCounter, handledelete, incrementCounter } from '../Redux/Action/Shopping_Cart_Action';

function Shopping_Cart(props) {

  const c = useSelector((state) => state.cart);
  console.log(c);


  const products = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const handleincrement = (id) => {
    dispatch(incrementCounter(id));
};

const handledecrement = (id) => {
  dispatch(decrementCounter(id));
};

const filterdata = [];
let Total;

c.cart.map((c) => {
  products.product.map((p) => {
      if (c.id === p.id) {
          const data = {
              ...p,
              qty: c.qty,
          };
          console.log(  data);
          filterdata.push(data);
      }
  });
});

let TotalAmount = 0;
    filterdata.map((c) => {
        Total = c.price * c.qty;
        TotalAmount = TotalAmount + Total;
    })


    const Discount = Math.round(TotalAmount * 0.05);
    const shipping = (15);
    const subtotal = TotalAmount;
    const FinalAmount = TotalAmount + shipping;




    const handleclickdelete = (id) => {
        dispatch(handledelete(id))
        console.log(id);
    }




    return (
        <div>
            <div>
  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
      <div className="d-inline-flex">
        <p className="m-0"><a href>Home</a></p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Shopping Cart</p>
      </div>
    </div>
  </div>
  <div className="container-fluid pt-5">
    <div className="row px-xl-5">
      <div className="col-lg-8 table-responsive mb-5">
        <table className="table table-bordered text-center mb-0">
          <thead className="bg-secondary text-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {
              filterdata.map((d) => {
                return (
                  <>
                     <tr>
              <td className="align-middle">
                <img src={d.url} alt style={{width: 50}} /> 
                
              </td>
              <td className="align-middle">{d.name}</td>
              <td className="align-middle">${d.price}</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width: 100}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus" disabled={d.qty === 1 && true} onClick={() => handledecrement(d.id)}>
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  {/* <input type="text" className="form-control form-control-sm bg-secondary text-center" defaultValue={d.qty} /> */}
                  <p type="text" className="form-control form-control-sm bg-secondary text-center">{d.qty}</p>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleincrement(d.id)}>
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">${d.price * d.qty}</td>
              <td className="align-middle"><button className="btn btn-sm btn-primary" onClick={() => handleclickdelete(d.id)} ><i className="fa fa-times" /></button></td>
            </tr>
                  </>
                )
              })
            }
           
          </tbody>
        </table>
      </div>
      <div className="col-lg-4">
        <form className="mb-5" action>
          <div className="input-group">
            <input type="text" className="form-control p-4" placeholder="Coupon Code" />
            <div className="input-group-append">
              <button className="btn btn-primary">Apply Coupon</button>
            </div>
          </div>
        </form>
        <div className="card border-secondary mb-5">
          <div className="card-header bg-secondary border-0">
            <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3 pt-1">
              <h6 className="font-weight-medium">Subtotal</h6>
              <h6 className="font-weight-medium">$<b><samp>{subtotal}</samp></b></h6>
            </div>
            <div className="d-flex justify-content-between mb-3 pt-1">
              <h6 className="font-weight-medium">Shipping Charges</h6>
              <h6 className="font-weight-medium">$15</h6>
            </div>
            <div className="d-flex justify-content-between mb-3 pt-1">
              <h6 className="font-weight-medium">Item</h6>
              <h6 className="font-weight-medium">{filterdata.length}</h6>
            </div>
          </div>
          <div className="card-footer border-secondary bg-transparent">
            <div className="d-flex justify-content-between mt-2">
              <h5 className="font-weight-bold">Total</h5>
              <h5 className="font-weight-bold">$<b><samp>{TotalAmount + shipping}</samp></b></h5>
            </div>
            <NavLink to={{pathname: "/checkout", state: { cart: filterdata }}}>
            <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    );
}

export default Shopping_Cart;