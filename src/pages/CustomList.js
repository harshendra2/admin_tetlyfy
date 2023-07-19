import React, { useEffect, useState } from "react";
import Header from "../components/header";
import "../styles/usemanage.css";
import image from "./image/ninjalogo2.png";
import image1 from "./image/Group.png";
import "bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import { getCustomData } from "../services/Apis";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteCustomeitem } from "../services/Apis";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomeList() {
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [ninjamains, setNinjamains] = useState([]);
  const [breads, setBreads] = useState([]);
  const [dessert, setDessert] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getCustomData();
      const categoryId = "649d5ee2b9a5c828696ddbf5";
      const filteredData = response.data.filter(
        (category) => category.category === categoryId
      );
      setCategory(filteredData);

      const categoryid = "649d5ef2b9a5c828696ddbf7";
      const filteredDatas = response.data.filter(
        (category) => category.category === categoryid
      );
      setNinjamains(filteredDatas);

      const Categoryids = "649d5f02b9a5c828696ddbf9";
      const filteredDatass = response.data.filter(
        (category) => category.category === Categoryids
      );
      setBreads(filteredDatass);

      const Categoryidss = "649d5f10b9a5c828696ddbfb";
      const filteredDatasss = response.data.filter(
        (category) => category.category === Categoryidss
      );
      setDessert(filteredDatasss);
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
    const response = await deleteCustomeitem(data);
    if (response.status === 200) {
      toast.success("Custom Item Deleted succefully Done");
      fetchData();
    }
  };

  //this code for dessert
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = dessert.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //this code for starters
  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1, setItemsPerPage1] = useState(5);
  const [searchTerm1, setSearchTerm1] = useState("");

  const filteredItems1 = category.filter((item) =>
    item.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = filteredItems1.slice(
    indexOfFirstItem1,
    indexOfLastItem1
  );

  const handleSearch1 = (e) => {
    setSearchTerm1(e.target.value);
    setCurrentPage1(1); // Reset to the first page when searching
  };

  const handlePageChange1 = (pageNumber) => {
    setCurrentPage1(pageNumber);
  };

  //this code for mains
  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage2, setItemsPerPage2] = useState(5);
  const [searchTerm2, setSearchTerm2] = useState("");

  const filteredItems2 = ninjamains.filter((item) =>
    item.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
  const currentItems2 = filteredItems2.slice(
    indexOfFirstItem2,
    indexOfLastItem2
  );

  const handleSearch2 = (e) => {
    setSearchTerm2(e.target.value);
    setCurrentPage2(1); // Reset to the first page when searching
  };

  const handlePageChange2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
  };

  //this code for bread rice
  const [currentPage3, setCurrentPage3] = useState(1);
  const [itemsPerPage3, setItemsPerPage3] = useState(5);
  const [searchTerm3, setSearchTerm3] = useState("");

  const filteredItems3 = breads.filter((item) =>
    item.name.toLowerCase().includes(searchTerm3.toLowerCase())
  );

  const indexOfLastItem3 = currentPage3 * itemsPerPage3;
  const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3;
  const currentItems3 = filteredItems3.slice(
    indexOfFirstItem3,
    indexOfLastItem3
  );

  const handleSearch3 = (e) => {
    setSearchTerm3(e.target.value);
    setCurrentPage3(1); // Reset to the first page when searching
  };

  const handlePageChange3 = (pageNumber) => {
    setCurrentPage3(pageNumber);
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
                  <span className="user">Custom Items</span>
                </h2>
              </div>
              <div className="col-lg-3">
                <img src={image} className="img-fluid image" alt="" />
              </div>
            </div>
          </div>

          <div class="table_body">
            <Link to="/admin/addcustomeitem">
              <button className="add-category-button">Add New Items</button>
              <div></div>
            </Link>
            <div>
              <h4 className="packagetablehedding">Starters</h4>
              <input
                type="text"
                className="searchtage"
                value={searchTerm1}
                onChange={handleSearch1}
                placeholder="Search"
              />

              <MDBTable
                responsive
                style={{
                  marginTop: "50px",
                  width: "70rem",
                  marginLeft: "10rem",
                }}
              >
                <MDBTableHead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Guest Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {currentItems1.map((cate, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="circle-image" src={cate.img} />
                      </td>
                      <td>{cate.name}</td>
                      <td>{cate.price}</td>
                      <td>{cate.Nonveg}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => Delete(cate._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/editcustomeitem/${cate._id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <nav className="paginations">
                <ul className="pagination">
                  {Array.from(
                    Array(Math.ceil(filteredItems1.length / itemsPerPage1)),
                    (item, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage1 === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange1(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="packagetablehedding">Mains</h4>
              <input
                type="text"
                className="searchtage"
                value={searchTerm2}
                onChange={handleSearch2}
                placeholder="Search"
              />

              <MDBTable
                responsive
                style={{
                  marginTop: "20px",
                  width: "70rem",
                  marginLeft: "10rem",
                }}
              >
                <MDBTableHead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Guest Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {currentItems2.map((cate, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="circle-image" src={cate.img} />
                      </td>
                      <td>{cate.name}</td>
                      <td>{cate.price}</td>
                      <td>{cate.Nonveg}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => Delete(cate._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/editcustomeitem/${cate._id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <nav className="paginations">
                <ul className="pagination">
                  {Array.from(
                    Array(Math.ceil(filteredItems2.length / itemsPerPage2)),
                    (item, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage2 === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange2(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>

            <div>
              <h4 className="packagetablehedding">Bread Rice And Noodles</h4>
              <input
                type="text"
                className="searchtage"
                value={searchTerm3}
                onChange={handleSearch3}
                placeholder="Search"
              />

              <MDBTable
                responsive
                style={{
                  marginTop: "20px",
                  width: "70rem",
                  marginLeft: "10rem",
                }}
              >
                <MDBTableHead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Guest Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {currentItems3.map((cate, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="circle-image" src={cate.img} />
                      </td>
                      <td>{cate.name}</td>
                      <td>{cate.price}</td>
                      <td>{cate.Nonveg}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => Delete(cate._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/editcustomeitem/${cate._id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <nav className="paginations">
                <ul className="pagination">
                  {Array.from(
                    Array(Math.ceil(filteredItems3.length / itemsPerPage3)),
                    (item, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage3 === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange3(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>

            <div>
              <h4 className="packagetablehedding">Dessert</h4>

              <input
                type="text"
                className="searchtage"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
              />

              <MDBTable
                responsive
                style={{
                  marginTop: "20px",
                  width: "70rem",
                  marginLeft: "10rem",
                }}
              >
                <MDBTableHead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Guest Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {currentItems.map((cate, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img className="circle-image" src={cate.img} />
                      </td>
                      <td>{cate.name}</td>
                      <td>{cate.price}</td>
                      <td>{cate.Nonveg}</td>
                      <td>
                        <button
                          style={{ backgroundColor: "rgb(600,200,10)" }}
                          onClick={() => Delete(cate._id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/admin/editcustomeitem/${cate._id}`}
                          className="btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>

              <nav className="paginations">
                <ul className="pagination">
                  {Array.from(
                    Array(Math.ceil(filteredItems.length / itemsPerPage)),
                    (item, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>

          <img src={image1} style={{ width: "550px" }} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CustomeList;
