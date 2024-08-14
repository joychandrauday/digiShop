import logo from '../../../../public/favicon.png'
const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-primary-content p-10">
      <aside>
        <img src={logo} className='w-2/6 rounded-3xl' alt="" />
        <p className="font-bold my-4">
          <span className="text-xl">DigiShop</span>
          <br />
          Digitalise your shopping experience.
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
