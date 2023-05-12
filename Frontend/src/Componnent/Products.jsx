import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

function Phones(props) {
  const [deleted, setDeleted] = useState(false);
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneToDelete, setPhoneToDelete] = useState(null);

  const onDeleteClick = (phone) => {
    setDeleted(false);
    setPhoneToDelete(phone);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (phoneToDelete) {
      const id = phoneToDelete.id;
      axios
        .delete(`http://localhost:8082/api/product/products/delete/${id}`, {
          headers: {
            "Content-Type": "application/json; charset=ISO-8859-1",
          },
        })
        .then((response) => {
          setDeleted(true);
          response.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setPhoneToDelete(null);
  };

  useEffect(() => {
    axios.get(`http://localhost:8082/api/product/getAll`).then((response) => {
      setPhones(response.data);
    });
  }, [deleted]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const onchange = (event) => {
    if (event.target.value !== "") {
      axios
        .get(
          `http://localhost:8082/api/product/search?submit=${event.target.value.trim()}`
        )
        .then((response) => {
          setPhones(response.data);
        });
    } else {
      axios.get(`http://localhost:8082/api/product/getAll`).then((response) => {
        setPhones(response.data);
      });
    }
  };

  const filterPhones = phones.filter((phone) => {
    return (
      phone.name.includes(search.toLowerCase()) ||
      phone.department.includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <form>
        <p>Tìm kiếm</p>
        <input type="text" placeholder="Search" onChange={handleSearch}></input>
      </form>
      {/* <form>
        <p>Đây là tìm kiếm back-end</p>
        <input
          type="text"
          placeholder="Search"
          onChange={onchange}
          id="1"
        ></input>
      </form> */}
      <h2 className="text-center">Employee List</h2>
      <div className="row">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/phone/" + "-1")}
        >
          Add Employee
        </button>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Department</th>
              <th disabled>Hired</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filterPhones.map((phone) => (
              <tr key={phone.id}>
                <td> {phone.id} </td>
                <td> {phone.name} </td>
                <td> {phone.date} </td>
                <td> {phone.department} </td>
                <td>
                  <input type="checkbox" defaultChecked={phone.hired}></input>
                </td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/phone/" + phone.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteClick(phone)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} className="delete-modal d-flex">
        <div className="modal-dialog position-absolute top-50 start-50 translate-middle">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Xác nhận xóa</h2>
              <button
                type="button"
                className="close"
                onClick={handleModalCancel}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 style={{color:"green"}}>Bạn chắc chắn muốn xóa không ?</h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleModalConfirm}
              >
                Có
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalCancel}
              >
                Không
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Phones;
