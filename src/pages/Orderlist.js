import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/usemanage.css";
import image from "./image/ninjalogo2.png";
import image1 from "./image/Group.png";
import "bootstrap";
import { Link } from "react-router-dom";
import {format} from "timeago.js"
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { orderlist } from "../services/Apis";
import { orderedviews } from "../services/Apis";
import { changeorderstatus } from "../services/Apis";
import {GetUserDetails} from "../services/Apis"

function Order() {
  const [order, setOrder] = useState([]);
  const [view, setview] = useState({});
  const [users,setUser]=useState({})
  

  const fetchData = async () => {
    try {
      const response = await orderlist();
      setOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ViewOrderDetails = async (id) => {
    const data = {
      id,
    };
    try {
      const response = await orderedviews(data);
      if (response.status === 200) {
        setview(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // convert to GMT date to normal date
  const date = new Date(view.date);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "2-digit",
    month: "long",
  });

  const changestatus = async (id) => {
    const data = {
      id,
    };
    const response = await changeorderstatus(data);
    if (response.status === 200) {
      ViewOrderDetails(id);
    }
  };

 const userDetails=async(id)=>{
  const data = {
    id,
  };
  const response= await GetUserDetails(data)
  if(response.status ===200){
    setUser(response.data)
  }

 }




  return (
    <>
      <Header />
      <div className="container-fluid">
        <div
          className="row justify-content-center"
          style={{ backgroundColor: "rgb(600, 200, 10)" }}
        >
          <div className="col-lg-6" style={{ paddingLeft: "10%" }}>
            <div className="d-flex">
              <div className="col-lg-6">
                <h1 className="header" style={{ paddingTop: "30px" }}>
                  Cater<span className="ninja">Ninja</span>
                </h1>
                <h2>
                  <span className="user"> Orders</span>
                </h2>
              </div>
              <div className="col-lg-3">
                <img src={image} className="img-fluid image" alt="" />
              </div>
            </div>
          </div>

          <div className="table_body">
            <MDBTable
              responsive
              className="tables"
              style={{ marginTop: "50px" }}
            >
              <MDBTableHead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">Price</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Views</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {order.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.orderId}</td>
                    <td>
                      <span>&#8377;</span>
                      {user.subtotal}
                    </td>
                    <td>{new Date(user.date).toLocaleDateString()}</td>
                    <td>{user.time}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                        onClick={()=>{
                          ViewOrderDetails(user._id);
                          userDetails(user.userId);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>

          <img src={image1} style={{ width: "550px" }} />
        </div>
      </div>

      {/* order view showing */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div
            className="modal-content text-white"
            style={{ backgroundColor: "#6d5b98", borderRadius: "10px" }}
          >
            <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start px-4 pt-0 pb-4">
              <div className="text-center">
                <h5 className="mb-3">Ordered Details</h5>
                <h5 className="mb-5">Order Id-{view.orderId}</h5>
              </div>
              <button
                style={{ width: "220px", borderRadius: "2rem" }}
                onClick={() => changestatus(view._id)}
              >
                {view.status}
              </button>
              <h5>
                Address :{" "}
                {view.address ? (
                  view.address
                ) : (
                  <Link
                          to={`/admin/livelocation/${view.latitude}/${view.longitude}`}
                          className="btn btn-success"
                        >
                          Root Map
                        </Link>
                )}
              </h5>
              <h5>User Name: {users.fname}</h5>
              <h5>Email: {users.email}</h5>
              <h5>Mobile Number : {users.mobile}</h5>

              
              <div className="d-flex justify-content-between mb-5">
                <MDBTable
                  responsive
                  style={{
                    marginTop: "50px",
                    width: "70rem",
                    marginLeft: "",
                  }}
                >
                  <MDBTableHead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">count</th>
                      <th scope="col">Guest</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {view.product &&
                      view.product.map((cate, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img
                              className="circle-image"
                              src={cate.img}
                              alt="Product"
                            />
                          </td>
                          <td>{cate.name}</td>
                          <td>
                            {cate.quantity} {cate.foodType}
                          </td>
                          <td>{cate.Nonveg}</td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal">Order Time</p>
                </div>
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal">Order Date</p>
                </div>
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal">Grand Total</p>
                </div>
                <div className="col-md-2 text-center">
                  <i className="fas fa-phone fa-lg"></i>
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal">{view.time}</p>
                </div>
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal">{formattedDate}</p>
                </div>
                <div className="col-md-4 text-center">
                  <p className="lead fw-normal">{view.subtotal}</p>
                </div>
                <div className="col-md-2 text-center">
                  <i className="fas fa-envelope fa-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Order;
