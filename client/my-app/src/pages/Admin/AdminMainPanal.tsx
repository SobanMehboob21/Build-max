// pages/Admin/AdminMainPanal.jsx

import { NavLink } from "react-router-dom";

const AdminMainPanal = () => {
  return (
    <section className="main-padding">
      <NavLink to="/admin/request">Requests</NavLink>
    </section>
  );
};

export default AdminMainPanal;
