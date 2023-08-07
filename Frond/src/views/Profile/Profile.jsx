import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"; // Importa yup para validar
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

import style from "./Profile.module.css";

const validationSchema = yup.object({
  userName: yup.string().required("El nombre del usuario es obligatorio"),
});

const Form = () => {

  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica cuando el formulario se envía
      console.log("Valores enviados:", values);
    },
  });

  const [userName, setUserName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
  
      try {
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            key: 'cf44a253679320997c892d7e7a273f04',
          },
        });
  
        if (response.data && response.data.data && response.data.data.url) {
          setSelectedImage(response.data.data.url);
          console.log('Imagen subida exitosamente:', response.data.data.url);
        } else {
          console.error('Hubo un problema al subir la imagen.');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  const handleFormSubmit = (values) => {
    // Crear un objeto con los datos a guardar
    const dataToSave = {
      userName,
    };

    // Convertir el objeto en formato JSON
    const jsonData = JSON.stringify(dataToSave, null, 2);

    // Crear un Blob (objeto binario) con los datos JSON
    const blob = new Blob([jsonData], { type: "application/json" });

    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const a = document.createElement("a");
    a.href = url;
    a.download = "userData.json";
    a.textContent = "Descargar JSON";

    // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
    document.body.appendChild(a);
    a.click();

    // Restablecer el formulario después de guardar los datos
    formik.resetForm();
    setUserName("");
  };

  return (
    <><form onSubmit={formik.handleSubmit}>
      <div className={style.formContainer}>
        <div className={`flex justify-center ${style.leftSection}`}>
          <div className="w-2/3">
            <h1 className={style.mainContainer}>Mi Perfil:</h1>

            <div>
              <label htmlFor="productName">Nombre del Usuario</label>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingrese el nombre del usuario"
                  id="userName"
                  name="userName"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    formik.handleChange(e);
                  } }
                  onBlur={formik.handleBlur}
                  value={formik.values.userName} />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className={style.error}>{formik.errors.userName}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="productName">Nombre del Usuario</label>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingrese el nombre del usuario"
                  id="userName"
                  name="userName"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    formik.handleChange(e);
                  } }
                  onBlur={formik.handleBlur}
                  value={formik.values.userName} />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className={style.error}>{formik.errors.userName}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="productName">Nombre del Usuario</label>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingrese el nombre del usuario"
                  id="userName"
                  name="userName"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    formik.handleChange(e);
                  } }
                  onBlur={formik.handleBlur}
                  value={formik.values.userName} />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className={style.error}>{formik.errors.userName}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="productName">Nombre del Usuario</label>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingrese el nombre del usuario"
                  id="userName"
                  name="userName"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    formik.handleChange(e);
                  } }
                  onBlur={formik.handleBlur}
                  value={formik.values.userName} />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className={style.error}>{formik.errors.userName}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={`flex justify-center ${style.rightSection}`}>
          <div className="w-2/3">
            {selectedImage && (
              <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Imagen seleccionada"
                  className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4" />
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                disabled={formik.isSubmitting ||
                  !formik.isValid ||
                  Object.keys(formik.touched).length !==
                  Object.keys(formik.values).length ||
                  Object.keys(formik.errors).length !== 0}
                onClick={handleFormSubmit} // Llamar a la función de guardado en clic del botón
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form><Footer/></>
  );
};

export default Form;
