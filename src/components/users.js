import React, { useEffect, useState } from "react";
import UsersForm from "./usersForm";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditUser = async (userObject) => {
    try {
      if (currentId === '') {
        await db.collection("users").doc().set(userObject);
        toast("Nuevo usuario agregado", {
          type: "success",
        });
      } else {
        await db.collection("users").doc(currentId).update(userObject);
        toast("Usuario actualizado", {
          type: "info",
        });
        setCurrentId('');
      }
    } catch (error) {
        toast(error, {
          type: "error",
        });
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Estas seguro de eliminar este usuario?")) {
      await db.collection("users").doc(id).delete();
      toast("Usuario eliminado", {
        type: "error",
      });
    }
  };

  const getUsers = async () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      const elements = [];
      querySnapshot.forEach((el) => {
        elements.push({ ...el.data(), id: el.id });
      });
      setUsers(elements);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <UsersForm {...{addOrEditUser, currentId, users}} />
      <div className="col-md-8">
        {users.map((user) => {
          return (
            <div className="card mb-1" key={user.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h3>{user.username}</h3>
                  <div>
                    <i
                      className="material-icons text-danger"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      close
                    </i>
                    <i
                      className="material-icons text-danger"
                      onClick={() => {
                        setCurrentId(user.id);
                      }}
                    >
                      create
                    </i>
                  </div>
                </div>
                <h4>{user.cedula}</h4>
                <h4>{user.telefono}</h4>
                <h4>{user.email}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
