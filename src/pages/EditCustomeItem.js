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
import { useParams } from "react-router-dom";
import { EditcustomeItems } from "../services/Apis";
import { EditcustomeList } from "../services/Apis";

function EditcustomeItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [Nonveg, setNonveg] = useState("");
  const [count, setCount] = useState("");
  const [foodType, setFoodType] = useState("");
  const [categories, setCategories] = useState("");

  const { id } = useParams();

  const datafetch = async () => {
    const response = await EditcustomeItems({ id });
    if (response.status === 200) {
      setName(response.data.name);
      setPrice(response.data.price);
      setNonveg(response.data.Nonveg);
      setCount(response.data.count);
      setFoodType(response.data.foodType);
      setCategories(response.data.category);
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
        const response = await getcustomecategory();
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
      Nonveg,
      count,
      foodType,
      categories,
    };

    if (categories === "") {
      toast.error("Please Select Category");
    } else if (name === "") {
      toast.error("Enter Item Name");
    } else if (price === "") {
      toast.error("Enter Price");
    } else if (Nonveg === "") {
      toast.error("Please Select guest type");
    } else if (count === "") {
      toast.error("Enter Item count");
    } else {
      const response = await EditcustomeList({ image, ...inputdata });
      if (response.status === 200) {
        toast.success("Item Added Successfully");
        navigate("/admin/customlist");
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
              <h2 className="fw-bold mb-2 text-center"> Edit Custom Item</h2>

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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Item name"
                  id="formControlLg"
                  type="String"
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <select
                  name="nonveg"
                  id="nonveg"
                  value={Nonveg}
                  onChange={(e) => setNonveg(e.target.value)}
                  className="form-control form-control-lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                >
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non Veg</option>
                </select>
                <p>Guest Type</p>

                <select
                  name="itemtype"
                  id="itemtype"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
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
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  size="lg"
                  style={{ borderColor: "rgb(186, 12, 12)" }}
                />

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  name="price"
                  label="Price"
                  value={price}
                  id="formControlLg"
                  type="String"
                  onChange={(e) => setPrice(e.target.value)}
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

export default EditcustomeItem;
