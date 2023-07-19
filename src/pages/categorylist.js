import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/usemanage.css";
import image from "./image/ninjalogo2.png";
import image1 from "./image/Group.png";
import "bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import { categorylist } from "../services/Apis";
import { deletecategory } from "../services/Apis";
import { Link } from "react-router-dom";

function Categorylist() {
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const response = await categorylist();
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Delete = async (id) => {
    const data = {
      id,
    };
    const response = await deletecategory(data);
    if (response.status === 200) {
      toast.success("Category deleted succefully");
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
                <h2>
                  <span className="user">Category List</span>
                </h2>
              </div>
              <div className="col-lg-3">
                <img src={image} className="img-fluid image" alt="" />
              </div>
            </div>
          </div>

          <div class="table_body">
            <Link to="/admin/categoryadd">
              <button className="add-category-button">Add New Category</button>
            </Link>
            <MDBTable
              responsive
              className="tabless"
              style={{ marginTop: "50px", width: "400px" }}
            >
              <MDBTableHead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {category.map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.category}</td>
                    <td>
                      <button
                       className="btn btn-danger"
                        onClick={() => Delete(user._id)}
                      >
                        Delete
                      </button>
                      <Link
                          to={`/admin/editcategory/${user._id}`}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>
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

export default Categorylist;
