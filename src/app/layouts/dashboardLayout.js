// /layouts/DashboardLayout.js
const DashboardLayout = ({ children }) => {
    return (
      <div>
        <header>Your Static Header</header>
        <main>{children}</main>
      </div>
    );
  };
  
  export default DashboardLayout;
  