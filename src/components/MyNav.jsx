import logo from "../assets/img/logo.png";

const MyNav = () => {
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <img style={{ width: "100px" }} src={logo} alt="" />
      <h1>Epi - Weather </h1>
    </div>
  );
};

export default MyNav;
