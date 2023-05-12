import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Phone(props) {
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const [phone, setPhone] = useState({});
  const id = params.id;
  const navigate = useNavigate();
  const onSaveClick = () => {
    setUpdate(true);
    const formData = new FormData();
    // setUpdate(true);
    if(phone.hired)
    {
      setPhone((prevPhone) => ({
        ...prevPhone,
        hired : 1,
      }));
    }
    else{
      setPhone((prevPhone) => ({
        ...prevPhone,
        hired :  0,
      }));
    }
    console.log(phone.hired);
    formData.append("products", JSON.stringify(phone));

    if (id === "-1") {
      if (window.confirm("Xác nhận")) {
        axios
          .post(`http://localhost:8082/api/product/products`, formData, {
            headers: {
              "Content-Type": "application/json; charset=ISO-8859-1",
            },
          })
          .then((response) => {
            toast.success("Thêm nhân viên thành công!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/");
            }, 2500);
          })
          .catch((err) => {
            console.log(err);
            toast.warn(" Kiểm tra lại thông tin!", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    } else {
      if (window.confirm("Xác nhận")) {
        axios
          .put(`http://localhost:8082/api/product/getAll/${id}`, formData, {
            headers: {
              "Content-Type": "application/json; charset=ISO-8859-1",
            },
          })
          .then((response) => {
            toast.success("Cập nhập thông tin thành công!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/");
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
            toast.warn(" Kiểm tra lại thông tin!", {
              position: "top-right",
              autoClose: 3500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      }
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/product/getAll/${id}`)
      .then((response) => {
       
        setPhone(response.data);
        if (id === "-1")
        if(phone.hired)
        {
          setPhone((prevPhone) => ({
            ...prevPhone,
            hired : 1,
          }));
        }
        else{
          setPhone((prevPhone) => ({
            ...prevPhone,
            hired :  0,
          }));
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {/* {console.log(update)} */}
      {update && <ToastContainer />}
      <h1>{id < 0 ? "New Employee" : `Employee ${id}`}</h1>
      Employee:{" "}
      <input
        type="number"
        value={phone.id}
        disabled="disabled"
        onChange={(e) => setPhone({ ...phone, id: e.target.value })}
      ></input>
      <br></br>
      Name:{" "}
      <input
        required={true}
        type="text"
        value={phone.name}
        onChange={(e) => setPhone({ ...phone, name: e.target.value })}
      ></input>
      <br></br>
      DOB:{" "}
      {/* {console.log(phone.date.substr(0,10) )}
      {phone.date? phone.date.substr(0,10):phone.date} */}
      <input
        type="date"
        value={phone.date?.substr(0,10)}
        onChange={(e) => setPhone({ ...phone, date: e.target.value })}
      ></input>
      <br></br>
      Department:{" "}
      <input
        required={true}
        type="text"
        value={phone.department}
        onChange={(e) => setPhone({ ...phone, department: e.target.value })}
      ></input>
      <br></br>
      Hired:{" "}
      <input
        type="checkbox"
        defaultChecked={phone.hired}
        onInput={(e) => setPhone({ ...phone, hired: e.target.checked?1:0 })}
      ></input>
      <br></br>
      <button onClick={() => onSaveClick()}>Save</button>
    </div>
  );
}

export default Phone;
