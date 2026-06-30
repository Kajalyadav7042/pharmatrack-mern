import { FaCapsules } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function PharmacistDashboard() {

  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Welcome, {user?.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <Link to="/medicines">
        <div className="bg-white rounded-xl shadow p-8" >

          <FaCapsules className="text-4xl text-blue-600 mb-4" />

          <h2 className="text-xl font-semibold">
            Medicines
          </h2>

          <p className="text-gray-500 mt-2">
            View available medicines and stock.
          </p>

        </div></Link>

       <Link to="/sales">
        <div className="bg-white rounded-xl shadow p-8">

          <FaCashRegister className="text-4xl text-green-600 mb-4" />

          <h2 className="text-xl font-semibold">
            Create Sale
          </h2>

          <p className="text-gray-500 mt-2">
            Sell medicines and update stock automatically.
          </p>

        </div>
       </Link>

      </div>

    </div>
  );
}

export default PharmacistDashboard;