import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import emailjs from "emailjs-com"
import fond from "../../assets/img/poster1.jpg"
import Swal from 'sweetalert2';

//subi mis cambios ayer y eliminaron mi pull requets loco

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
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Tu mensaje se ha enviado correctamente.',
          });
        })
        .catch(error => {
          console.log(error.text);
          Swal.fire({
            icon: 'error',
            title: 'Error al enviar el mensaje',
            text: 'Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo nuevamente.',
          });
        });
    }
  });
  return (
<div>
    <section className="mb-32">
    <div className="relative h-[300px] overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fond})` }}></div>
    <div class="container px-6 md:px-12 m-auto">
      <div
        class="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] ">
        <div class="flex flex-wrap">
          <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
          <form
        className="w-full  m-auto grid gap-4 p-6 md:p-10 rounded-md"
        onSubmit={formik.handleSubmit}
        ref={formRef}
      >
        <input
          type="text"
          name="name"
          placeholder="enter your name"
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            formik.touched.name && formik.errors.name
              ? "border-red-500" 
              : "focus:border-blue-300"
          }`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="ingrese su email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            formik.touched.email && formik.errors.email
              ? "border-red-500" // Aplica borde rojo en caso de error
              : "focus:border-blue-300"
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
        <textarea
          name="message"
          placeholder="ingrese un mensaje"
          onBlur={formik.handleBlur}
          value={formik.values.message}
          onChange={formik.handleChange}
          rows={6}
          className={`w-full p-2 border rounded focus:outline-none focus:ring ${
            formik.touched.message && formik.errors.message
              ? "border-red-500" // Aplica borde rojo en caso de error
              : "focus:border-blue-300"
          }`}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500">{formik.errors.message}</div>
        ) : null}
        <input
          type="submit"
          value="Send"
          className="pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        />
      </form>
          </div>
          <div class="w-full shrink-0 grow-0 basis-auto lg:w-7/12 text-slate-50 p-10">
            <h2 class="text-3xl pb-5">Ponte en contacto con nosotros</h2>
              <p class=" text-lg">
En Bonita & Lovely, valoramos tu experiencia de compra y estamos aquí para responder cualquier pregunta que puedas tener. Si necesitas ayuda para elegir los productos adecuados, asesoramiento sobre nuestro cuidado de la piel o simplemente quieres compartir tus comentarios, no dudes en ponerte en contacto con nuestro amable equipo de atención al cliente.
</p>
<p class="pt-5">Equipo Bonita & Lovely</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default Contact;
