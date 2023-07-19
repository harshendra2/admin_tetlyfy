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
import { categorylist } from "../services/Apis";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPackagesItems } from "../services/Apis";
import { EditPackage } from "../services/Apis";

function EditPackages() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [starters, setStarters] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [mains, setMains] = useState("");
  const [dessert, setDessert] = useState("");
  const [categories, setCategories] = useState("");

  const { id } = useParams();

  const datafetch = async () => {
    const response = await getPackagesItems({ id });

    if (response.status === 200) {
      setName(response.data.name);
      setPrice(response.data.price);
      setCategories(response.data.category);
      setStarters(response.data.starters);
      setMinOrder(response.data.minOrder);
      setMains(response.data.mains);
      setDessert(response.data.desserts);
    }
  };

  useEffect(() => {
    datafetch();
  }, []);

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categorylist();
        setCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [image, setImage] = useState("");

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };
  }

  const change = (e) => {
    const { files } = e.target;
    const file = files[0];
    previewFile(file);
  };

  const submite = async (e) => {
    e.preventDefault();
    const inputdata = {
      id,
      name,
      price,
      starters,
      minOrder,
      mains,
      dessert,
      categories,
    };

    if (categories === "") {
      toast.error("Please Select Category");
    } else if (name === "") {
      toast.error("Enter Item Name");
    } else if (starters === "") {
      toast.error("Enter Starters Count");
    } else if (mains === "") {
      toast.error("Enter Mains Count");
    } else if (dessert === "") {
      toast.error("Enter Dessert Count");
    } else if (price === "") {
      toast.error("Enter Price");
    } else if (minOrder === "") {
      toast.error("Enter Minimum order count");
    } else {
      const response = await EditPackage({ image, ...inputdata });
      if (response.status === 200) {
        toast.success("Item Edited Successfully");
        navigate("/admin/packagelist");
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
              <h2 className="fw-bold mb-2 text-center">Edit Packages</h2>

              <form onSubmit={submite}>
                <select
                  name="category"
                  id="category"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="form-control form-control-lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                >
                  {category.map((list, index) => (
                    <option value={list._id}>{list.category}</option>
                  ))}
                </select>

                <p>Category</p>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="name"
                  label="Item name"
                  id="formControlLg"
                  type="String"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="starters"
                  label="Starters"
                  id="formControlLg"
                  type="String"
                  value={starters}
                  onChange={(e) => setStarters(e.target.value)}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="mains"
                  label="Mains"
                  id="formControlLg"
                  type="String"
                  value={mains}
                  onChange={(e) => setMains(e.target.value)}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="dessert"
                  label="Dessert"
                  id="formControlLg"
                  type="String"
                  value={dessert}
                  onChange={(e) => setDessert(e.target.value)}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="price"
                  label="Price"
                  id="formControlLg"
                  type="String"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="ordercount"
                  label="Min Order"
                  id="formControlLg"
                  type="Number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
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

export default EditPackages;
