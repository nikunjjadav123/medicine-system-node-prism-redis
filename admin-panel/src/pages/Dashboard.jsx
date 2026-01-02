import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/expiry-alerts">View Expiry Alerts</Link>
    </div>
  );
}
