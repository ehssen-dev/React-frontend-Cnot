import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Navigate from react-router-dom
import Main from "./layout/Main";
import Login from "../src/pages/login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashbord";
import Tools from "../src/pages/Tools";
import AdminProfileForm from "../src/pages/profile/AdminProfileForm";

import BudgetAllocations from "../src/pages/procurement/budgetAllocation/BudgetAllocations";
import AddBudget from "../src/pages/procurement/budgetAllocation/AddBudget";
import EditBudget from "../src/pages/procurement/budgetAllocation/EditBudget";
import Invoice from "../src/pages/procurement/invoices/Invoice";
import AddInvoice from "../src/pages/procurement/invoices/AddInvoice";
import EditInvoice from "../src/pages/procurement/invoices/EditInvoice";
import InvoiceDetails from "../src/pages/procurement/invoices/InvoiceDetails";
import ProjectList from "../src/pages/procurement/projects/ProjectList";
import AddProject from "../src/pages/procurement/projects/AddProject";
import ProjectDetails from "../src/pages/procurement/projects/ProjectDetails";
import EditProject from "../src/pages/procurement/projects/EditProject";
import MailList from "../src/pages/Mail/MailList";
import MailForm from "../src/pages/Mail/MailForm";
import SendMailForm from "../src/pages/Mail/SendMailForm";

import MailDetails from "../src/pages/Mail/MailDetail";
import PurchaseOrderList from "../src/pages/procurement/purchaseOrders/PurchaseOrderList";
import AddPurchaseOrder from "../src/pages/procurement/purchaseOrders/AddPurchaseOrder";
import ProcurementRequestList from "../src/pages/procurement/ProcurementRequests/ProcurementRequestList";
import AddProcurementRequest from "../src/pages/procurement/ProcurementRequests/AddProcurementRequest";
import UserList from "../src/pages/users/UserList";
import UserDetails from "../src/pages/users/UserDetails";
import EventList from "../src/pages/events/EventList";
import AddEvent from "../src/pages/events/AddEvent";
import EventDetails from "../src/pages/events/EventDetails";
import GameList from "../src/pages/events/games/GameList";
import GameDetails from "../src/pages/events/games/GameDetails";
import AddGame from "../src/pages/events/games/AddGame";
import UpdateGame from "../src/pages/events/games/UpdateGame";
import EvaluateGames from "../src/pages/events/games/EvaluateGames";

import ResultsList from "../src/pages/events/games/result/ResultsList";
import AddResult from "../src/pages/events/games/result/AddResult";
import AthleteList from "../src/pages/athlete/AthleteList";
import AthleteDetails from "../src/pages/athlete/AthleteDetails";
import AddAthlete from "../src/pages/athlete/AddAthlete";
import DelegationList from "../src/pages/delegations/DelegationList";
import AddDelegation from "../src/pages/delegations/AddDelegation";
import SupportRequestList from "../src/pages/support/supportRequest/SupportRequestList";
import SupportRequestDetail from "../src/pages/support/supportRequest/SupportRequestDetail";
import DepartmentList from "../src/pages/department/DepartmentList";
import AddDepartment from "../src/pages/department/AddDepartment";

import FederationList from "../src/pages/federations/FederationList";
import AddFederation from "../src/pages/federations/AddFederation";
import SupportRequestForm from "../src/pages/support/supportRequest/SupportRequestForm";
import SupportResponseList from "../src/pages/support/supportResponse/SupportResponseList";
import AddSupportResponse from "../src/pages/support/supportResponse/AddSupportResponse";
import FinancialReportTable from "../src/pages/report/FinancialReportTable";

/**/
import ClientLayout from "../src/layoutClient/ClientLayout";
import Home from "../src/partiePrenantes/pages/Home";
import MainC from "./layoutClient/Main";
import EventsListC from "./clientSide/athleteSide/pages/EventsList";
import EventDetailsC from "./clientSide/athleteSide/pages/EventDetails";
import GameDetailsC from "./clientSide/athleteSide/pages/GameDetails";
import SupportRequestFormC from "./clientSide/athleteSide/pages/SupportRequestForm";
import DashboardC from "./clientSide/athleteSide/pages/dashboard/DashboardC";
import FileManager from "./clientSide/athleteSide/pages/FileManager";
import MailComponent from "./clientSide/athleteSide/pages/MailComponent";
import AthleteProfileForm from "./clientSide/athleteSide/pages/AthleteProfileForm";
import SupportResponseListAthlete from "./clientSide/athleteSide/pages/SupportResponseListAthlete";

import Competitions from "./clientSide/landingPage/components/Sections/Competitions";

import NotAuthorized from "../src/pages/NotAuthorized";
import Landing from "./clientSide/landingPage/screens/Landing";

import EventDetailsUser from "./clientSide/landingPage/pages/EventDetailsUser";
import EventsUser from "./clientSide/landingPage/pages/EventsUser";

import GameDetailsUser from "./clientSide/landingPage/pages/GameDetailsUser";

import { AuthProvider, useAuth } from "./AuthContext";
import RoleBasedRoute from "./RoleBasedRoute"; // Import RoleBasedRoute
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import { Helmet } from "react-helmet";

const HelmetWrapper = () => (
  <Helmet>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <HelmetWrapper />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<RoleRedirect />} />
          <Route path="/register" element={<Register />} />

          <Route path="/not-authorized" element={<NotAuthorized />} />

          <Route
            path="/eventUser"
            element={
              <RoleBasedRoute
                element={<EventsUser />}
                allowedRoles={["ROLE_ADMIN", "ROLE_ATHLETE", "ROLE_USER"]}
              />
            }
          />
          <Route
            path="/eventUser/:eventId"
            element={
              <RoleBasedRoute
                element={<EventDetailsUser />}
                allowedRoles={["ROLE_ADMIN", "ROLE_ATHLETE", "ROLE_USER"]}
              />
            }
          />
          <Route
            path="/gamesUser/:gameId"
            element={
              <RoleBasedRoute
                element={<GameDetailsUser />}
                allowedRoles={["ROLE_ADMIN", "ROLE_ATHLETE", "ROLE_USER"]}
              />
            }
          />

          {/* Routes with Main layout */}
          <Route path="/admin/*" element={<Main />}>
            {/* General Routes (Authenticated) */}
            <Route
              path="dashboard"
              element={
                <RoleBasedRoute
                  element={<Dashboard />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="tools"
              element={
                <RoleBasedRoute
                  element={<Tools />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="profile"
              element={
                <RoleBasedRoute
                  element={<AdminProfileForm />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />

            {/* Role-Based Routes */}
            <Route
              path="budget-tracking"
              element={
                <RoleBasedRoute
                  element={<BudgetAllocations />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="budget-tracking/add"
              element={
                <RoleBasedRoute
                  element={<AddBudget />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="budget-allocations/edit/:id"
              element={
                <RoleBasedRoute
                  element={<EditBudget />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="department-list"
              element={
                <RoleBasedRoute
                  element={<DepartmentList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="department-list/add"
              element={
                <RoleBasedRoute
                  element={<AddDepartment />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="invoice"
              element={
                <RoleBasedRoute
                  element={<Invoice />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="invoice/add"
              element={
                <RoleBasedRoute
                  element={<AddInvoice />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="invoice/edit/:invoiceId"
              element={
                <RoleBasedRoute
                  element={<EditInvoice />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="invoice/:invoiceId"
              element={
                <RoleBasedRoute
                  element={<InvoiceDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="project-list"
              element={
                <RoleBasedRoute
                  element={<ProjectList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="project-list/add"
              element={
                <RoleBasedRoute
                  element={<AddProject />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="project-details/:projectId"
              element={
                <RoleBasedRoute
                  element={<ProjectDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="edit-project/:projectId"
              element={
                <RoleBasedRoute
                  element={<EditProject />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="mail-list"
              element={
                <RoleBasedRoute
                  element={<MailList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="mail-list/:mailId"
              element={
                <RoleBasedRoute
                  element={<MailDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="send-mails"
              element={
                <RoleBasedRoute
                  element={<MailForm />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="send-mail"
              element={
                <RoleBasedRoute
                  element={<SendMailForm />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="purchase-order"
              element={
                <RoleBasedRoute
                  element={<PurchaseOrderList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="purchase-order/add"
              element={
                <RoleBasedRoute
                  element={<AddPurchaseOrder />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="procurement-request"
              element={
                <RoleBasedRoute
                  element={<ProcurementRequestList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="procurement-request/add"
              element={
                <RoleBasedRoute
                  element={<AddProcurementRequest />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="user-list"
              element={
                <RoleBasedRoute
                  element={<UserList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="user-list/:userId"
              element={
                <RoleBasedRoute
                  element={<UserDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="event-list"
              element={
                <RoleBasedRoute
                  element={<EventList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="event-list/:eventId"
              element={
                <RoleBasedRoute
                  element={<EventDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="event-list/add"
              element={
                <RoleBasedRoute
                  element={<AddEvent />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="game-list"
              element={
                <RoleBasedRoute
                  element={<GameList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="game-list/:gameId"
              element={
                <RoleBasedRoute
                  element={<GameDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="game-list/add"
              element={
                <RoleBasedRoute
                  element={<AddGame />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="game-list/edit/:gameId"
              element={
                <RoleBasedRoute
                  element={<UpdateGame />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="game-list/EvaluateGames"
              element={
                <RoleBasedRoute
                  element={<EvaluateGames />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="result-list"
              element={
                <RoleBasedRoute
                  element={<ResultsList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="result-list/add"
              element={
                <RoleBasedRoute
                  element={<AddResult />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="athlete-list"
              element={
                <RoleBasedRoute
                  element={<AthleteList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="athlete-list/:athleteId"
              element={
                <RoleBasedRoute
                  element={<AthleteDetails />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="athlete-list/add"
              element={
                <RoleBasedRoute
                  element={<AddAthlete />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="delegation-list"
              element={
                <RoleBasedRoute
                  element={<DelegationList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="delegation-list/add"
              element={
                <RoleBasedRoute
                  element={<AddDelegation />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="support-requests"
              element={
                <RoleBasedRoute
                  element={<SupportRequestList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="support-requests/:supportRequestId"
              element={
                <RoleBasedRoute
                  element={<SupportRequestDetail />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />

            <Route
              path="support-requests/add"
              element={
                <RoleBasedRoute
                  element={<SupportRequestForm />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="support-responses"
              element={
                <RoleBasedRoute
                  element={<SupportResponseList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="support-responses/add"
              element={
                <RoleBasedRoute
                  element={<AddSupportResponse />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="federation-list"
              element={
                <RoleBasedRoute
                  element={<FederationList />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="federation-list/add"
              element={
                <RoleBasedRoute
                  element={<AddFederation />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
            <Route
              path="financial-report"
              element={
                <RoleBasedRoute
                  element={<FinancialReportTable />}
                  allowedRoles={["ROLE_ADMIN"]}
                />
              }
            />
          </Route>

          <Route path="/members/*" element={<MainC />}>
            <Route
              path="home"
              element={
                <RoleBasedRoute
                  element={<Home />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="dashboard-c"
              element={
                <RoleBasedRoute
                  element={<DashboardC />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="events"
              element={
                <RoleBasedRoute
                  element={<EventsListC />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="events/:eventId"
              element={
                <RoleBasedRoute
                  element={<EventDetailsC />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="games/:gameId"
              element={
                <RoleBasedRoute
                  element={<GameDetailsC />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="support-request"
              element={
                <RoleBasedRoute
                  element={<SupportRequestFormC />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="support-response"
              element={
                <RoleBasedRoute
                  element={<SupportResponseListAthlete />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="file-manager"
              element={
                <RoleBasedRoute
                  element={<FileManager />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="mails"
              element={
                <RoleBasedRoute
                  element={<MailComponent />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
            <Route
              path="profile"
              element={
                <RoleBasedRoute
                  element={<AthleteProfileForm />}
                  allowedRoles={["ROLE_ATHLETE"]}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};
const RoleRedirect = () => {
  const { isAuthenticated, roles } = useAuth();

  console.log("Is authenticated:", isAuthenticated());
  console.log("User roles:", roles);

  if (isAuthenticated()) {
    if (roles.includes("ROLE_ADMIN")) {
      return <Navigate to="/admin/dashboard" />;
    } else if (roles.includes("ROLE_ATHLETE")) {
      return <Navigate to="/members/home" />;
    } else if (roles.includes("ROLE_USER")) {
      return <Navigate to="/eventUser" />;
    }
  }

  return <Login />;
};

export default App;
