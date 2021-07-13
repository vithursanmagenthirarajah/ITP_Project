import React, { Component } from "react";
import Axios from "axios";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Login from "./account management/pages/Login";
import TcDashboard from "./opd ticket clerk/pages/TcDashboard";
import TcRecords from "./opd ticket clerk/pages/TcRecords";
import CdDashboard from "./opd consultation doctor/pages/CdDashboard";
import CdRecords from "./opd consultation doctor/pages/CdRecords";
import DisDashboard from "./opd dispenser/pages/DisDashboard";
import OpdDrugStore from "./opd dispenser/pages/OpdDrugStore";
import AdDashboard from "./opd admission doctor/pages/AdDashboard";
import AdRecords from "./opd admission doctor/pages/AdRecords";
import IcDashboard from "./opd in charge/pages/IcDashboard";
import IcRecords from "./opd in charge/pages/IcRecords";
import IcReports from "./opd in charge/pages/IcReports";
import NotAuthorized from "./shared/pages/NotAuthorized";

import AddEmp from "./shift management/addEmployee";
import AddEmpDuty from "./shift management/addEmployeesDuty";
import AddMonSche from "./shift management/addMonthlySchedule";
import ManageAssLand from "./shift management/managementAssLanding";
import searchDuty from "./shift management/searchDuty";
import searchEmp from "./shift management/searchEmployee";
import ViewEmp from "./shift management/viewEmployee";
import ViewEmpDuty from "./shift management/viewEmployeeDuty";
import ViewMonSche from "./shift management/viewMonthlySchedule";
import UpdateMonthly from "./shift management/updateMonthlySchedule";
import UpdateEmployee from "./shift management/updateEmployee";
import UpdateEmployeeDuty from "./shift management/updateEmployeeDuty";

import AddGenInventory from "./Inventory management/AddGenInventory";
import AddSurInventory from "./Inventory management/AddSurInventory";
import ViewGeneralInventory from "./Inventory management/ViewGeneralInventory";
import ViewSurgicalInventory from "./Inventory management/ViewSurgicalInventory";
import UpdateSurgicalInventory from "./Inventory management/UpdateSurgicalInventory";
import UpdateGeneralInventory from "./Inventory management/UpdateGeneralInventory";
import ViewInventory from "./Inventory management/Inventory";

import Viewschedule from "./Herbalplantmangement/viewscheduledetails";
import Updateschedule from "./Herbalplantmangement/updateschedule";
import Updateplant from "./Herbalplantmangement/updateplant";
import Viewplant from "./Herbalplantmangement/viewplantdetails";
import Schedule from "./Herbalplantmangement/addschedule";
import dboard from "./Herbalplantmangement/dboard";
import addplant from "./Herbalplantmangement/addplant";

import UpdateDrug from "./pharmacy management/UpdateDrug";
import pharmacyland from "./pharmacy management/pharmacyland";
import AddDrugs from "./pharmacy management/addDrugs";
import AddIngredients from "./pharmacy management/addIngredients";
import IssueTreatmentItem from "./pharmacy management/issueTreatmentItem";
import UpdateIngredient from "./pharmacy management/UpdateIngredients";
import UpdateIssuedTreatmentItem from "./pharmacy management/UpdateIssuedTreatmentItem";
import ViewDrug from "./pharmacy management/viewDrugDeatils";
import ViewIngredient from "./pharmacy management/viewIngredientDetails";
import ViewIssueTreatment from "./pharmacy management/viewIssuedTreatmentItem";

import Grocerytbl from "./Kitchen management/grocerytbl";
import Adddiet from "./Kitchen management/adddiet";
import Kitchen from "./Kitchen management/kitchen";
import Dietplan from "./Kitchen management/dietplan";
import Diettbl from "./Kitchen management/diettbl";
import Addgrocery from "./Kitchen management/addgrocery";
import Editdiet from "./Kitchen management/editdiet";
import Editgrocery from "./Kitchen management/editgrocery";
import Groceryplan from "./Kitchen management/groceryplan";

import TransForm from "./ward management/ward incharge/Transferform";

import DrugIssue from "./ward management/NursingStaff/drugissue";
import DisForm from "./ward management/ward incharge/discharge";
import DrugAdd from "./ward management/NursingStaff/druggadd";
import ViewDrugWard from "./ward management/NursingStaff/viewDrug";
import EditDrug from "./ward management/NursingStaff/editdrug";
import DietAdd from "./ward management/WardAttendant/wardDiet";
import DietView from "./ward management/WardAttendant/viewDiet";
import DietEdit from "./ward management/WardAttendant/EditDiet";
import TransList from "./ward management/ward incharge/transferlist";
import DischargeList from "./ward management/ward incharge/disList.jsx";

import viewDrugIssue from "./ward management/NursingStaff/viewdrugissue";
import Visit from "./ward management/Ward Doctor/visit";
import wardPresc from "./ward management/Ward Doctor/wardPrescription";

import clinicDocPres from "./clinic management/ClinicDoctor/clinicPrescription";
import viewclinicpres from "./clinic management/ClinicDoctor/viewpres";

import viewwardpres from "./ward management/Ward Doctor/viewWardpres";
import viewVisit from "./ward management/Ward Doctor/viewvisit";

// DashBoards
import clinicDocDB from "./clinic management/ClinicDoctor/clinicDocDB"; //checked
import wardDocDB from "./ward management/Ward Doctor/wardDocDB"; //done
import NSDB from "./ward management/NursingStaff/NursingStaffDB.jsx"; //done
import wardAttendantDB from "./ward management/WardAttendant/wardAttendantDB"; //done
import WardinchargeDB from "./ward management/ward incharge/wardinch"; //done

export default class App extends Component {
  constructor(props) {
    super(props);

    this.isLogined = this.isLogined.bind(this);
    this.isLogin = this.isLogin.bind(this);

    this.state = {
      token: undefined,
      user: undefined,
    };
  }

  componentDidMount() {
    this.isLogined();
  }

  isLogined() {
    //get the local token
    let tokenSession = localStorage.getItem("auth-token");

    //if there no local token create blank local token
    if (tokenSession === null) {
      localStorage.setItem("auth-token", "");
      tokenSession = "";
    }

    //send the local token to check it is valid
    Axios.post(
      "http://localhost:5000/api/users/tokenIsValid",
      {},
      { headers: { "x-auth-token": tokenSession } }
    )
      .then((res) => {
        //if token is valid set the user data and token in local
        if (res.data.valid && this.isLogin()) {
          //not needed
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("id", res.data.user.id);
        } else {
          localStorage.setItem("auth-token", "");
          localStorage.setItem("username", "");
          localStorage.setItem("id", "");
          localStorage.setItem("expiration", "");
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.setItem("auth-token", "");
        localStorage.setItem("username", "");
        localStorage.setItem("id", "");
        localStorage.setItem("expiration", "");
      });
  }

  isLogin() {
    const expiration = localStorage.getItem("expiration");
    const token = localStorage.getItem("auth-token");
    if (
      token === undefined ||
      token === null ||
      token === "" ||
      expiration === "" ||
      new Date(expiration) < new Date()
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/opd_tc_dashboard"
            exact
            render={() =>
              this.isLogin() ? <TcDashboard /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_tc_dashboard/records"
            exact
            render={() =>
              this.isLogin() ? <TcRecords /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_cd_dashboard"
            exact
            render={() =>
              this.isLogin() ? <CdDashboard /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_cd_dashboard/records"
            exact
            render={() =>
              this.isLogin() ? <CdRecords /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_dis_dashboard"
            exact
            render={() =>
              this.isLogin() ? <DisDashboard /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_dis_dashboard/opd_drug_store"
            exact
            render={() =>
              this.isLogin() ? <OpdDrugStore /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_ad_dashboard"
            exact
            render={() =>
              this.isLogin() ? <AdDashboard /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_ad_dashboard/records"
            exact
            render={() =>
              this.isLogin() ? <AdRecords /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_ic_dashboard"
            exact
            render={() =>
              this.isLogin() ? <IcDashboard /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_ic_dashboard/records"
            exact
            render={() =>
              this.isLogin() ? <IcRecords /> : <Redirect to="/" />
            }
          />
          <Route
            path="/opd_ic_dashboard/reports"
            exact
            render={() =>
              this.isLogin() ? <IcReports /> : <Redirect to="/" />
            }
          />
          <Route
            path="/unauthorized"
            exact
            render={() =>
              this.isLogin() ? <NotAuthorized /> : <Redirect to="/" />
            }
          />
          <Route path="/" exact component={Login} />
          <Route path="/ma_dashboard" exact component={ManageAssLand} />
          <Route path="/viewmonthlyschedule" exact component={ViewMonSche} />
          <Route path="/update/:id" exact component={UpdateMonthly} />
          <Route path="/viewemployee" exact component={ViewEmp} />
          <Route path="/addemployee" exact component={AddEmp} />
          <Route path="/searchemployee" exact component={searchEmp} />
          <Route path="/addempdutyschedule" exact component={AddEmpDuty} />
          <Route path="/addmonschedule" exact component={AddMonSche} />
          <Route path="/addmonschedule" exact component={AddMonSche} />
          <Route path="/viewempduty" exact component={ViewEmpDuty} />
          <Route path="/searchempduty" exact component={searchDuty} />
          <Route
            path="/updategen/:id"
            exact
            component={UpdateGeneralInventory}
          />
          <Route path="/inventory" exact component={ViewInventory} />
          <Route path="/addgen" exact component={AddGenInventory} />
          <Route path="/addsurg" exact component={AddSurInventory} />
          <Route path="/Surgtable" exact component={ViewSurgicalInventory} />
          <Route path="/Surgical" exact component={ViewSurgicalInventory} />
          <Route path="/General" exact component={ViewGeneralInventory} />
          <Route
            path="/updateSurgical/:id"
            exact
            component={UpdateSurgicalInventory}
          />
          <Route path="/gentable" exact component={ViewGeneralInventory} />
          <Route path="/addsurg" exact component={AddSurInventory} />
          <Route path="/addgen" exact component={AddGenInventory} />
          <Route path="/updateEmployee/:id" exact component={UpdateEmployee} />
          <Route
            path="/updateemployeeduty/:id"
            exact
            component={UpdateEmployeeDuty}
          />

          <Route path="/herbal_garden" exact component={dboard} />
          <Route path="/addPlant" exact component={addplant} />
          <Route path="/viewPlant" exact component={Viewplant} />
          <Route path="/plant/update/:id" exact component={Updateplant} />
          <Route path="/viewSchedule" exact component={Viewschedule} />
          <Route path="/addSchedule" exact component={Schedule} />
          <Route path="/schedule/update/:id" exact component={Updateschedule} />

          <Route path="/pharmacist" exact component={pharmacyland} />
          <Route path="/AddDrugs" exact component={AddDrugs} />
          <Route path="/AddIngredients" exact component={AddIngredients} />
          <Route path="/ViewDrug" exact component={ViewDrug} />
          <Route path="/ViewIngredient" exact component={ViewIngredient} />
          <Route
            path="/issueTreatmentitems"
            exact
            component={IssueTreatmentItem}
          />
          <Route
            path="/viewTreatmentitems"
            exact
            component={ViewIssueTreatment}
          />
          <Route path="/drug" exact component={ViewDrug} />
          <Route path="/edit/:id" exact component={UpdateDrug} />
          <Route path="/ingredient" exact component={ViewIngredient} />
          <Route
            path="/update_Ingredient/:id"
            exact
            component={UpdateIngredient}
          />
          <Route path="/IssueTreatment" exact component={ViewIssueTreatment} />
          <Route
            path="/updatetreat/:id"
            exact
            component={UpdateIssuedTreatmentItem}
          />

          <Route path="/kitchen" exact component={Kitchen} />
          <Route path="/addDiet" exact component={Adddiet} />
          <Route path="/dietTable" exact component={Diettbl} />
          <Route path="/groceryTable" exact component={Grocerytbl} />
          <Route path="/dietPlan" exact component={Dietplan} />
          <Route path="/groceryPlan" exact component={Groceryplan} />
          <Route path="/addGrocery" exact component={Addgrocery} />
          <Route path="/editdiet/:id" exact component={Editdiet} />
          <Route path="/editgrocery/:id" exact component={Editgrocery} />

          <Route path="/wardDoctor" exact component={wardDocDB}></Route>
          <Route path="/clinicDoctor" exact component={clinicDocDB}></Route>
          <Route path="/wardNurse" exact component={NSDB}></Route>
          <Route
            path="/wardAttendant"
            exact
            component={wardAttendantDB}
          ></Route>
          <Route path="/wardInCharge" exact component={WardinchargeDB}></Route>
          <Route path="/drugissue" exact component={DrugIssue}></Route>
          <Route path="/updatedrug/:id" exact component={EditDrug}></Route>
          <Route path="/updatediet/:id" exact component={DietEdit}></Route>
          <Route path="/updateransfer/:id" exact component={DietEdit}></Route>
          <Route path="/viewdrugissue" exact component={viewDrugIssue}></Route>
          <Route
            path="/clinicpreslist"
            exact
            component={viewclinicpres}
          ></Route>
          <Route path="/issuediet" exact component={DietAdd}></Route>
          <Route path="/viewdiet" exact component={DietView}></Route>
          <Route path="/viewwardpres" exact component={viewwardpres}></Route>
          <Route path="/viewwardvisit" exact component={viewVisit}></Route>

          <Route path="/drugadd" exact component={DrugAdd}></Route>
          <Route path="/druglist" exact component={ViewDrugWard}></Route>
          <Route path="/discharge" exact component={DisForm}></Route>
          <Route path="/transfer" exact component={TransForm}></Route>
          <Route path="/transferlog" exact component={TransList}></Route>
          <Route path="/dischargelog" exact component={DischargeList}></Route>

          <Route path="/wardprescription" exact component={wardPresc}></Route>
          <Route path="/visit" exact component={Visit}></Route>
          <Route path="/clinicpresc" exact component={clinicDocPres}></Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}
