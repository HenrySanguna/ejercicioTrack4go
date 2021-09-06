import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const UserForm = (props) => {

    const inicialStateValues = {
        username: '',
        cedula: '',
        telefono: '',
        email: ''
    };

    const [values, setValues] = useState(inicialStateValues);

    const handleInputChange = ev => {
        const { name, value } = ev.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = ev => {
        ev.preventDefault();
        props.addOrEditUser(values);
        setValues(inicialStateValues);
    }

    const getUserById = async (id) => {
      const doc = await db.collection('users').doc(id).get();
      setValues({...doc.data()});
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({...inicialStateValues});
        } else {
            getUserById(props.currentId);
        }
    }, [props.currentId]);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">person_add</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          name="username"
          onChange={handleInputChange}
          value={values.username}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">subtitles</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Cédula"
          name="cedula"
          size="10"
          minLength="10"
          maxLength="10"
          pattern="[0-9]+"
          onChange={handleInputChange}
          value={values.cedula}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">call</i>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Teléfono"
          name="telefono"
          onChange={handleInputChange}
          value={values.telefono}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">email</i>
        </div>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={values.email}
        />
      </div>
      <button className="btn btn-primary">
        {props.currentId === '' ? 'Guardar' : 'Actualizar'}
      </button>
    </form>
  );
};

export default UserForm;
