import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { registerfunction } from "../services/Apis";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter your Eamil !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Eamil !");
    } else if (password === "") {
      toast.error("Enter your Password !");
    } else {
      const data = {
        email: email,
        password: password,
      };

      const response = await registerfunction(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.adminToken);
        toast.success("Successfully login");
        navigate("/admin/home");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: "black" }}>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h1 class="header">
                <img
                  class="logo"
                  src="https://th.bing.com/th/id/OIP.-dMwENv0NzjkqP_TttR5hwHaF7?pid=ImgDet&rs=1"
                  alt="Logo"
                />
                Cater<span class="ninja">Ninja</span>
              </h1>
              <h2 className="fw-bold mb-2 text-center">Login</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>
              <form onSubmit={sendOtp}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBBtn size="lg" color="dark">
                  Login
                </MDBBtn>
              </form>
              <p>
                <NavLink to="/register" style={{ color: "red" }}></NavLink>{" "}
              </p>

              <hr className="my-4" />

              <MDBBtn
                className="mb-1 w-20"
                size="sm"
                style={{ backgroundColor: "#3b5998", paddingLeft: "21%" }}
              >
                <div id="signInDiv"></div>
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Login;
