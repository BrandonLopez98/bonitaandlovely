import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sizes, categories, brands } from "../../redux/actions";

import style from "./Form.module.css";

const validationSchema = yup.object({
  name: yup.string().required("El nombre del producto es obligatorio"),
  precio_compra: yup
    .number()
    .typeError("El precio del producto debe ser un número válido")
    .required("El precio del producto es obligatorio")
    .positive("El precio debe ser un número positivo")
    .min(0.01, "El precio mínimo es 0.01")
    .max(99999.99, "El precio máximo es 99999.99"),
});

const Form = () => {
  const dispatch = useDispatch();
  const sizesOptions = useSelector((state) => state.Allsizes);
  const categoriesOptions = useSelector((state) => state.Allcategories);
  const brandsOptions = useSelector((state) => state.Allbrands);

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
      .get("http://localhost:3001/proveedor")
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
      precio_compra: "",
      porcentaje_ganancia: "",
      precio_venta: "",
      referencia_proveedor: "",
      marcaId: "",
      categoriaId: "",
      tamañoId: "",
      proveedorId: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("Valores enviados:", values);

      try {
        const response = await axios.post(
          "http://localhost:3001/producto",
          values
        );
        console.log("Producto creado:", response.data);
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
    const splitValues = selectedValue.split('-');
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
    const splitValues = selectedValue.split('-');
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
    const splitValues = selectedValue.split('-');
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
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className={style.error}>{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>

              {/* campo precio Compra */}
              <div>
                <label htmlFor="productPrice">
                  Precio de compra del Producto{" "}
                </label>
                <div>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese el precio del producto"
                    id="productPrice"
                    name="precio_compra"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.precio_compra}
                  />
                  {formik.touched.precio_compra &&
                  formik.errors.precio_compra ? (
                    <div className={style.error}>
                      {formik.errors.precio_compra}
                    </div>
                  ) : null}
                </div>
              </div>


              {/* campo Porcentaje De Ganancia*/}
              <div>
                <label htmlFor="PercentageOfProfit">
                  Porcentaje De Ganancia{" "}
                </label>
                <div>
                  <input
                    type="text"
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Ingrese el Porcentaje de ganancia"
                    id="PercentageOfProfit"
                    name="porcentaje_ganancia"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.porcentaje_ganancia}
                  />
                  {formik.touched.porcentaje_ganancia &&
                  formik.errors.porcentaje_ganancia ? (
                    <div className={style.error}>
                      {formik.errors.porcentaje_ganancia}
                    </div>
                  ) : null}
                </div>
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
                    <div className={style.error}>
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
                    <div className={style.error}>
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
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
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
                </div>
              </div>

              {/* campo imagen del producto */}
              {/* {selectedImage && (
                <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Imagen seleccionada"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
              /> */}

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
