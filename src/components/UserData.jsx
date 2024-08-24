import React, { useEffect, useState } from "react";
import axios from "axios";

import "./UserData.css";
import Modal from "./Modal";

const UserData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getData = async () => {
    const URL = `https://jsonplaceholder.typicode.com/users?_limit=10&_page=${page}`;
    let res = await axios.get(URL);
    return res.data;
  };

  useEffect(() => {
    getData()
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const handleView = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
    console.log("calling...,", selectedUser);
  };
  const closeModal = () => setModalIsOpen(false);
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page <= 1) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  return (
    <div>
      <div className="table">
        <h3>Total Records: {data.length}</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele) => {
              const { id, name, email, username, address } = ele;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                  <td>
                    <button onClick={() => handleView(ele)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pageButtons">
        <b>Page : {page}</b>
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
      {
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <h2>{selectedUser.name}</h2>
          <p>Username: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <p>City: {selectedUser.address.city}</p>
        </Modal>
      }
    </div>
  );
};

export default UserData;
