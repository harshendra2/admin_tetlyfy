import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/usemanage.css";
import image from "./image/ninjalogo2.png";
import image1 from "./image/Group.png";
import "bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import { Packagelist } from "../services/Apis";
import { Link } from "react-router-dom";
import { deletePackage } from "../services/Apis";

function Packagelists() {
  const [category, setCategory] = useState([]);
  const [ninjabuffet, setNinjabuffet] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Packagelist();
      const categoryId = "649a8dbe388ed76ea11b2bcc";
      const filteredData = response.data.filter(
        (category) => category.category === categoryId
      );
      setCategory(filteredData);

      const categoryid = "649a8da2388ed76ea11b2bca";
      const filteredDatas = response.data.filter(
        (category) => category.category === categoryid
      );
      setNinjabuffet(filteredDatas);

      console.log(response.data);
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
    const response = await deletePackage(data);
    if (response.status === 200) {
      toast.success("Package deleted succefully");
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
            <Link to="/admin/addpackage">
              <button className="add-category-button">Add New Package</button>
              <div></div>
            </Link>
            <div>
              <h4 className="packagetablehedding">Ninja Box</h4>
              <MDBTable responsive style={{ marginTop: "50px" }}>
                <MDBTableHead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Dessert</th>
                    <th scope="col">Mains</th>
                    <th scope="col">Starters</th>
                    <th scope="col">Min Order</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {category.map((cate, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="circle-image" src={cate.img} />
                      </td>
                      <td>{cate.name}</td>
                      <td>{cate.price}</td>
                      <td>{cate.desserts}</td>
                      <td>{cate.mains}</td>
                      <td>{cate.starters}</td>
                      <td>{cate.minOrder}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => Delete(cate._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/EditPackage/${cate._id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <div>
              <h4 className="packagetablehedding">Ninja Buffet</h4>
              <MDBTable responsive style={{ marginTop: "20px" }}>
                <MDBTableHead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Dessert</th>
                    <th scope="col">Mains</th>
                    <th scope="col">Starters</th>
                    <th scope="col">Min Order</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {ninjabuffet.map((cate, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="circle-image" src={cate.img} />
                      </td>
                      <td>{cate.name}</td>
                      <td>{cate.price}</td>
                      <td>{cate.desserts}</td>
                      <td>{cate.mains}</td>
                      <td>{cate.starters}</td>
                      <td>{cate.minOrder}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => Delete(cate._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/EditPackage/${cate._id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>

          <img src={image1} style={{ width: "550px" }} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Packagelists;
