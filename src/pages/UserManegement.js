import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "../styles/usemanage.css";
import image from "./image/ninjalogo2.png";
import image1 from "./image/Group.png";
import "bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { userdata } from "../services/Apis";
import { block } from "../services/Apis";
import { ToastContainer, toast } from "react-toastify";

function User() {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const response = await userdata();
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
      console.log("user valid");
    } else {
      navigate("*");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const deleteuser = async (id, fname) => {
    console.log(fname, "", id);
    const data = {
      id,
      fname,
    };
    const response = await block(data);
    if (response.status === 200) {
      fetchData();
    }
  };

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
                <h1>
                  <span className="user">User Details</span>
                </h1>
              </div>
              <div className="col-lg-3">
                <img src={image} className="img-fluid image" alt="" />
              </div>
            </div>
          </div>
          <div class="table_body">
            <MDBTable responsive style={{ marginTop: "50px" }}>
              <MDBTableHead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {user.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.fname}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      {" "}
                      {user.block ? (
                        <button
                          style={{
                            backgroundColor: " rgb(186, 12, 12)",
                            color: "white",
                          }}
                          class="bttblock"
                          onClick={() => deleteuser(user._id, user.fname)}
                        >
                          UnBlock
                        </button>
                      ) : (
                        <button
                          class="bttblock"
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => deleteuser(user._id, user.fname)}
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <img src={image1} style={{ width: "550px" }} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default User;
