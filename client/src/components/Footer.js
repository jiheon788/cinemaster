import { Link } from "react-router-dom";

const Footer = ()=>{
  return (
    <footer className="text-muted py-5 footer-container mt-5">
      <div className="container">
        <p className="float-end mb-1">
          <a href="#" className="grey-small-font"><strong>Back to top</strong></a>
        </p>
        <div className="mt-5 footerLine">
          <h1 className="mb-1">GET IN TOUCH</h1>
          <p className="mb-0">Email: jiheon788@ajou.ac.kr</p>
        </div>
        <div className="allRights mt-2">
          <p>Copyright @ jiheon788, All Rights Reserved</p>
          <p>Designed by jiheon788</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;