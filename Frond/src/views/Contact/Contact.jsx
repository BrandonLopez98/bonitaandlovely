import { useFormik } from "formik";
const Contact = () => {
  const formik = useFormik({
    initialValues : {
      email:'',
    },
    onSubmit: values  => {}
  })
  return ( 
    <section className="grid grid-cols-2">
      <div className=" col-span-1">
        <img src="https://cdn.create.vista.com/api/media/small/530382968/stock-photo-nude-eye-shadow-palette-brush" alt="" />
      </div>
      <h2>comunicate con nosotros!</h2>
      <form className="col-span-1">
        <label htmlFor="tu nombre">tu nombre:</label>
        <input type="text" name="nombre" placeholder="ingresa tu nombre"/>
        <label htmlFor=""></label>
      </form>
    </section>
  );
};

export default Contact;