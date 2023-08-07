import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"; // Importa yup para validar
import axios from 'axios';


import style from "./Form.module.css";

const validationSchema = yup.object({
  productName: yup.string().required("El nombre del producto es obligatorio"),
  productPrice: yup
    .number()
    .typeError("El precio del producto debe ser un número válido")
    .required("El precio del producto es obligatorio")
    .positive("El precio debe ser un número positivo")
    .min(0.01, "El precio mínimo es 0.01")
    .max(9999.99, "El precio máximo es 9999.99"),
});

const Form = () => {
  const providers = [
    "GRAPHIC STUDIO",
    "S. SALVA ART DIRECTOR",
    "GOLDEN STUDIO",
    "FURNITURE DESIGN",
    "TRAVEL LOOKBOOK",
  ];

  const colors = ["BLUE", "YELLOW", "RED", "GREEN", "PURPLE", "PINK","BLACK"];

  const categories = [
    "LABIAL",
    "RUBOR",
    "PINTA UÑAS",
    "BRILLO",
    "PESTAÑINA",
    "QUITA ESMALTE",
  ];

  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica cuando el formulario se envía
      console.log("Valores enviados:", values);
    },
  });

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  const handleCheckboxChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (!selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category !== categoryToRemove
    );
    setSelectedCategories(updatedCategories);
  };

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
      productName,
      productPrice,
      productDescription,
      selectedProvider,
      selectedColors,
      selectedCategories,
      selectedImage,
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
    a.download = "productData.json";
    a.textContent = "Descargar JSON";

    // Agregar el enlace al documento y hacer clic en él para iniciar la descarga
    document.body.appendChild(a);
    a.click();

    // Restablecer el formulario después de guardar los datos
    formik.resetForm();
    setSelectedProvider("");
    setSelectedColors([]);
    setSelectedImage(null);
    setSelectedCategories([]);
  };

  return (
    <><form onSubmit={formik.handleSubmit}>
      <div className={style.formContainer}>
        <div className={`flex justify-center ${style.leftSection}`}>
          <div className="w-2/3">
            <h1 className={style.mainContainer}>Crear Producto:</h1>

            <div>
              <label htmlFor="productName">Nombre del Producto</label>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingrese el nombre del producto"
                  id="productName"
                  name="productName"
                  onChange={(e) => {
                    setProductName(e.target.value);
                    formik.handleChange(e);
                  } }
                  onBlur={formik.handleBlur}
                  value={formik.values.productName} />
                {formik.touched.productName && formik.errors.productName ? (
                  <div className={style.error}>{formik.errors.productName}</div>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="productPrice">Precio del Producto</label>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Ingrese el precio del producto"
                  id="productPrice"
                  name="productPrice"
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                    formik.handleChange(e);
                  } }
                  onBlur={formik.handleBlur}
                  value={formik.values.productPrice} />
                {formik.touched.productPrice && formik.errors.productPrice ? (
                  <div className={style.error}>
                    {formik.errors.productPrice}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="productProviders">Proveedor</label>
              <div>
                <select
                  id="productProviders"
                  value={selectedProvider}
                  onChange={handleSelectChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                >
                  <option value="">Seleccionar</option>
                  {providers.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <strong>Proveedor Seleccionado:</strong>{" "}
                {selectedProvider.length > 0 ? selectedProvider : "Ninguno"}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="productDescription"
                className="block font-medium text-gray-700"
              >
                Descripción del Producto
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                placeholder="Escriba una breve descripcion del producto"
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                onChange={(e) => {
                  setProductDescription(e.target.value);
                  formik.handleChange(e);
                } }
                onBlur={formik.handleBlur} />
            </div>
            <div>
              <label htmlFor="productCategories">Categorias</label>
              <div>
                <select
                  value=""
                  onChange={handleCategoryChange}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="mt-4">
                  <h2>Categorías seleccionadas:</h2>
                  <ul>
                    {selectedCategories.map((category, index) => (
                      <li key={index}>
                        {category}
                        <button
                          className="ml-2 text-red-500"
                          onClick={() => handleRemoveCategory(category)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex justify-center ${style.rightSection}`}>
          <div className="w-2/3">
            <div>
              <h3>Selecciona colores:</h3>
              {colors.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleCheckboxChange(color)}
                    className="mr-2" />
                  {color}
                </label>
              ))}
              <div>
                <strong>Colores seleccionados:</strong>{" "}
                {selectedColors.length > 0
                  ? selectedColors.join(", ")
                  : "Ninguno"}
              </div>
            </div>
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
                Guardar Producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </form></>
  );
};

export default Form;
