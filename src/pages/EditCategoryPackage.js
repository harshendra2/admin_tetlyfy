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
import { Editcategory } from "../services/Apis";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {getpackagecategory} from "../services/Apis"

function EditCategories() {
    const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategory] = useState("");
  
  const fetchdata=async()=>{
    const response=await getpackagecategory({id})
    if(response.status===200){
        setCategory(response.data.category)
    }
  }

  useEffect(()=>{
    fetchdata();
  },[])

  const submit = async (e) => {
    e.preventDefault();
    if (categories === "") {
      toast.error("Please Enter Category");
    } else {
      const data = {
        category: categories,
        id
      };
      const response = await Editcategory(data);
      if (response.status === 200) {
        toast.success("Category added successfully");
        navigate("/admin/categorylist");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: "black", height: "750px" }}>
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
              <h2 className="fw-bold mb-2 text-center">Edit Category</h2>

              <form onSubmit={submit}>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  id="formControlLg"
                  value={categories}
                  type="text"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBBtn size="lg" color="dark">
                  Submit
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default EditCategories;