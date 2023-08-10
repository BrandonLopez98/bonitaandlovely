import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sizes, categories, brands } from "../../redux/actions";

import style from "./Form.module.css";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("El nombre del producto es obligatorio")
    .min(5, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no debe exceder los 50 caracteres"),
  descripcion: yup
    .string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(200, "La descripción no debe exceder los 200 caracteres"),
  precio_compra: yup
    .number()
    .typeError("El precio del producto debe ser un número válido")
    .required("El precio del producto es obligatorio")
    .positive("El precio debe ser un número positivo")
    .min(1000, "El precio mínimo es 1000")
    .max(1000000, "El precio máximo es 1000000"),
  porcentaje_ganancia: yup
    .number()
    .typeError("El porcentaje de ganancia debe ser un número válido")
    .required("El porcentaje de ganancia es obligatorio")
    .min(10, "El porcentaje mínimo de ganancia es 10")
    .max(100, "El porcentaje máximo de ganancia es 100"),
  precio_venta: yup
    .number()
    .typeError("El precio de venta debe ser un número válido")
    .required("El precio de venta es obligatorio")
    .positive("El precio de venta debe ser un número positivo")
    .min(0.01, "El precio mínimo de venta es 0.01")
    .max(99999.99, "El precio máximo de venta es 99999.99"),
  referencia_proveedor: yup
    .string()
    .required("La referencia del proveedor es obligatoria"),
  marcaId: yup.number().required("Selecciona una marca"),
  categoriaId: yup.number().required("Selecciona una categoría"),
  tamañoId: yup.number().required("Selecciona un tamaño"),
  proveedorId: yup.number().required("Selecciona un proveedor"),
});

const Form = () => {
  const dispatch = useDispatch();
  const sizesOptions = useSelector((state) => state.Allsizes);
  const categoriesOptions = useSelector((state) => state.Allcategories);
  const brandsOptions = useSelector((state) => state.Allbrands);

  const [imageUrl, setImageUrl] = useState("");

  const imgbbApiKey = "cf44a253679320997c892d7e7a273f04";
  const imgbbUploadUrl = "https://api.imgbb.com/1/upload";

  useEffect(() => {
    dispatch(sizes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(brands());
  }, [dispatch]);

  //obtener proveedores
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios
      .get("/proveedor")
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los proveedores:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      descripcion: "",
      imagenPrincipal: null,
      precio_compra: "",
      porcentaje_ganancia: 10,
      precio_venta: "",
      referencia_proveedor: "",
      marcaId: "",
      categoriaId: "",
      tamañoId: "",
      proveedorId: "",
      subcategoriaId: [ 12, 9, 19, 16 ],
      imagenes: [8,38,36,14,4,27],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Valores enviados:", values);

      try {
        const imageUrl = await handleImageUpload(values.imagenPrincipal);

        console.log(imageUrl);
        // Actualiza los valores con la URL de la imagen subida
        const updatedValues = {
          ...values,
          imagenPrincipal: imageUrl,
        };

        console.log(updatedValues);
        // Realiza la solicitud al servidor para crear el producto
        const responseProducto = await axios.post("/producto", updatedValues);

        console.log("Producto creado:", responseProducto.data);
        resetForm();
      } catch (error) {
        console.error("Error al crear el producto:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleImageUpload = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("key", imgbbApiKey);
      formData.append("image", imageFile);

      const response = await axios.post(imgbbUploadUrl, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Error al subir la imagen a imgbb:", error);
      throw error;
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedProviderObj = providers.find(
      (option) => option.id === Number(selectedValue)
    );
    if (selectedProviderObj) {
      setSelectedProvider(selectedProviderObj);
      formik.setFieldValue("proveedorId", selectedProviderObj.id);
    }
  };

  const handleSelectChangeBrands = (event) => {
    const selectedValue = event.target.value;
    const splitValues = selectedValue.split("-");
    const selectedBrandId = splitValues[1];
    const selectedBrandsObj = brandsOptions.find(
      (option) => option.id === selectedValue
    );
    if (selectedBrandsObj) {
      setSelectedBrand(selectedBrandsObj);
      formik.setFieldValue("marcaId", selectedBrandId);
    }
  };

  const handleSelectChangeCategories = (event) => {
    const selectedValue = event.target.value;
    const splitValues = selectedValue.split("-");
    const selectedCategoriesId = splitValues[1];
    const selectedCategoriesObj = categoriesOptions.find(
      (option) => option.id === selectedValue
    );
    if (selectedCategoriesObj) {
      setSelectedCategories(selectedCategoriesObj);
      formik.setFieldValue("categoriaId", selectedCategoriesId);
    }
  };

  const handleSelectChangeSize = (event) => {
    const selectedValue = event.target.value;
    const splitValues = selectedValue.split("-");
    const selectedSizeId = splitValues[1];
    const selectedSizeObj = sizesOptions.find(
      (option) => option.id === selectedValue
    );
    if (selectedSizeObj) {
      setSelectedSize(selectedSizeObj);
      formik.setFieldValue("tamañoId", selectedSizeId);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.formContainer}>
          <div className={`flex justify-center ${style.leftSection}`}>
            <div className="w-2/3">
              <h1 className={style.mainContainer}>Crear Producto:</h1>

              {/* campo nombre del producto */}
              <div>
                <label htmlFor="productName">Nombre del Producto</label>
                <div>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese el nombre del producto"
                    id="productName"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={{ borderColor: "rgb(222, 190, 234)" }}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo precio Compra */}
              <div>
                <label htmlFor="productPrice">
                  Precio de compra del Producto{" "}
                </label>
                <div className="flex">
                  <span className="text-gray-600">$</span>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese el precio del producto"
                    id="productPrice"
                    name="precio_compra"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.precio_compra}
                    inputMode="numeric"
                  />
                  {formik.touched.precio_compra &&
                  formik.errors.precio_compra ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.precio_compra}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo Porcentaje De Ganancia*/}
              <div>
                <label
                  htmlFor="PercentageOfProfit"
                  className="block font-bold mb-2"
                >
                  Porcentaje De Ganancia
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    className="w-full"
                    id="PercentageOfProfit"
                    name="porcentaje_ganancia"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.porcentaje_ganancia}
                  />
                  <span className="ml-4">
                    {formik.values.porcentaje_ganancia}%
                  </span>
                </div>
                {formik.touched.porcentaje_ganancia &&
                  formik.errors.porcentaje_ganancia && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.porcentaje_ganancia}
                    </div>
                  )}
              </div>

              {/* campo precio venta  */}
              <div>
                <label htmlFor="salePrice">Precio de Venta del Producto </label>
                <div>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese el precio de Venta producto"
                    id="salePrice"
                    name="precio_venta"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.precio_venta}
                  />
                  {formik.touched.precio_venta && formik.errors.precio_venta ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.precio_venta}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo Proveedor  */}
              <div>
                <label htmlFor="productProviders">Proveedor</label>
                <div>
                  <select
                    id="productProviders"
                    value={
                      selectedProvider && selectedProvider.id
                        ? selectedProvider.id
                        : ""
                    }
                    onChange={handleSelectChange}
                    name="proveedorId"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  >
                    <option value="">Seleccionar</option>
                    {providers.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* campo referencia Proveedor */}
              <div>
                <label htmlFor="refProv">Referencia del Proveedor</label>
                <div>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese la fererencia del proveedor"
                    id="refProv"
                    name="referencia_proveedor"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referencia_proveedor}
                  />
                  {formik.touched.referencia_proveedor &&
                  formik.errors.referencia_proveedor ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.referencia_proveedor}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo Descripcion del producto  */}
              <div className="mb-4">
                <label
                  htmlFor="productDescription"
                  className="block font-medium text-gray-700"
                >
                  Descripción del Producto
                </label>
                <textarea
                  id="productDescription"
                  name="descripcion"
                  placeholder="Escriba una breve descripcion del producto"
                  rows="4"
                  className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${
                    formik.touched.descripcion && formik.errors.descripcion
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.descripcion}
                />
                {formik.touched.descripcion && formik.errors.descripcion ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.descripcion}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={`flex justify-center ${style.rightSection}`}>
            <div className="w-2/3">
              {/* campo Tamaño Producto  */}
              <div>
                <label htmlFor="productSize">Tamaño</label>
                <div>
                  <select
                    id="productSize"
                    value={
                      selectedSize && selectedSize.id ? selectedSize.id : ""
                    }
                    onChange={handleSelectChangeSize}
                    name="tamañoId"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  >
                    <option value="">Seleccionar</option>
                    {sizesOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.tamañoId && formik.errors.tamañoId ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.tamañoId}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo Marca Producto  */}
              <div>
                <label htmlFor="productMarca">Marca</label>
                <div>
                  <select
                    id="productMarca"
                    value={
                      selectedBrand && selectedBrand.id ? selectedBrand.id : ""
                    }
                    onChange={handleSelectChangeBrands}
                    name="marcaId"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  >
                    <option value="">Seleccionar</option>
                    {brandsOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.marcaId && formik.errors.marcaId ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.marcaId}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo Categorias del producto  */}
              <div>
                <label htmlFor="productCategories">Categoría</label>
                <div>
                  <select
                    id="productCategories"
                    value={
                      selectedCategories && selectedCategories.id
                        ? selectedCategories.id
                        : ""
                    }
                    onChange={handleSelectChangeCategories}
                    name="categoriaId"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  >
                    <option value="">Seleccionar</option>
                    {categoriesOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.categoriaId && formik.errors.categoriaId ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.categoriaId}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* campo imagen del producto */}
              <div className="w-full h-80 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                {/* Círculo más grande */}
                <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
                  {formik.values.imagenPrincipal ? (
                    <img
                      src={URL.createObjectURL(formik.values.imagenPrincipal)}
                      alt="Imagen seleccionada"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-600">Cargar imagen</span>
                  )}
                </div>
              </div>
              <input
                type="file"
                id="imagenPrincipal"
                name="imagenPrincipal"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue(
                    "imagenPrincipal",
                    event.currentTarget.files[0]
                  );
                }}
                className="mb-4"
              />

              {/* Botones del Form */}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300" // Llamar a la función de guardado en clic del botón
                >
                  Guardar Producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
