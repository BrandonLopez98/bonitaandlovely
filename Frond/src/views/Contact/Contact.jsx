import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import emailjs from "emailjs-com"

const Contact = () => {
  const formRef = useRef();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email address").required("requered"),
      name: yup
        .string()
        .max(15, "Must be 20 characters or less")
        .required("required"),
      message: yup.string().max(500, "maximum characters").required("required")
    }),
    onSubmit: (values, { resetForm }) => {
      emailjs
        .sendForm("service_fipmedw", "template_kqv6i3m", formRef.current, "oVw-6VKFTmTY9hBaV")
        .then(result => {
          console.log(result.text);
          resetForm();
        })
        .catch(error => {
          console.log(error.text);
        });
    }
  });
  return (
  <section className="w-full bg-white mt-8 h-[100vh]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center w-80% m-auto">
    <div className="w-full md:w-[50%] h-max">
      <img
        className="w-full"
        src="https://cdn.create.vista.com/api/media/small/530382968/stock-photo-nude-eye-shadow-palette-brush"
        alt="logo"
      />
    </div>
    <div className="w-full md:w-[80%]">
      <form
        className="w-full bg-slate-400 m-auto gap-4 p-6 md:p-10"
        onSubmit={formik.handleSubmit}
        ref={formRef}
      >
        <label htmlFor="your name">tu nombre:</label>
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <label htmlFor="tu email">tu email:</label>
        <input
          type="email"
          name="email"
          placeholder="ingrese su email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="message">message</label>
        <textarea
          name="message"
          placeholder="ingrese un mensaje"
          onBlur={formik.handleBlur}
          value={formik.values.message}
          onChange={formik.handleChange}
          rows={6}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {formik.touched.message && formik.errors.message ? (
          <div>{formik.errors.message}</div>
        ) : null}
        <input
          type="submit"
          value="Send"
          className="pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        />
      </form>
    </div>
  </div>
</section>
  );
};

export default Contact;
