import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import { getcustomecategory } from "../services/Apis";
import { addCustomeItem } from "../services/Apis";
import { useNavigate } from "react-router-dom";

function AddcustomeItem() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getcustomecategory();
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [image, setImage] = useState("");
  const [inputdata, setInputdata] = useState({
    category: "",
    name: "",
    price: "",
    nonveg: "",
    totalcount: "",
    itemtype: "",
  });

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputdata({ ...inputdata, [name]: value });
  };

  const change = (e) => {
    const { files } = e.target;
    const file = files[0];
    previewFile(file);
  };

  const submite = async (e) => {
    e.preventDefault();
    const { category, name, price, nonveg, totalcount, itemtype } = inputdata;

    if (category === "") {
      toast.error("Please Select Category");
    } else if (name === "") {
      toast.error("Enter Item Name");
    } else if (price === "") {
      toast.error("Enter Price");
    } else if (nonveg === "") {
      toast.error("Please Select guest type");
    } else if (image === "") {
      toast.error("Please Select File");
    } else if (totalcount === "") {
      toast.error("Enter Count");
    } else if (itemtype === "") {
      toast.error("Please Select foodType");
    } else {
      const response = await addCustomeItem({ image, ...inputdata });
      if (response.status === 200) {
        toast.success("Item Added Successfully");
        navigate("/admin/customlist");

        setInputdata({
          ...inputdata,
          category: "",
          name: "",
          price: "",
          nonveg: "",
          totalcount: "",
          itemtype: "",
        });
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
              <h2 className="fw-bold mb-2 text-center">Custom Item</h2>

              <form onSubmit={submite}>
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                >
                  {category.map((list, index) => (
                    <option value={list._id}>{list.category}</option>
                  ))}
                </select>

                <p>Category</p>

                <select
                  name="nonveg"
                  id="nonveg"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non Veg</option>
                </select>
                <p>Guest Type</p>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="name"
                  label="Item name"
                  id="formControlLg"
                  type="String"
                  onChange={handleChange}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <select
                  name="itemtype"
                  id="itemtype"
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                >
                  <option value="Kg">Kg</option>
                  <option value="pieces">pieces</option>
                </select>
                <p>Item type </p>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="totalcount"
                  label="total count"
                  id="formControlLg"
                  type="String"
                  onChange={handleChange}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="price"
                  label="Price"
                  id="formControlLg"
                  type="String"
                  onChange={handleChange}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <input
                  type="file"
                  name="image"
                  onChange={change}
                  accept="image/png , image/jpeg, image/jpg, image/jfif"
                />

                <button>Submit</button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default AddcustomeItem;
