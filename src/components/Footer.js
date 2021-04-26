const Footer = () => {
  return (
<footer className="navbar navbar-expand-lg navbar-dark bg-dark">
  {/* <!-- Grid container --> */}
  <div className="container p-4 pb-0">
    {/* <!-- Section: Social media --> */}
    <section className="mb-4">
      {/* <!-- Facebook --> */}
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-facebook-f"></i
      ></a>

      {/* <!-- Twitter --> */}
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-twitter"></i
      ></a>

      {/* <!-- Google --> */}
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-google"></i
      ></a>

      {/* <!-- Instagram --> */}
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-instagram"></i
      ></a>

      {/* <!-- Linkedin --> */}
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-linkedin-in"></i
      ></a>

    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

 {/*  <!-- Copyright --> */}
  <div className="text-center p-3" containerStyle={"background-color: rgba(0, 0, 0, 0.2)"}>
    © 2021 Copyright:
    <a className="text-white" href="https://tremo.com/">TreMo.com</a>
  </div>
  {/* <!-- Copyright --> */}
</footer>
  )
};


export default Footer;
