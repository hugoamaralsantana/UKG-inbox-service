import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../parts/sidebar";
import NavBar from "../parts/navbar";
import data from "../../mockData.js";

import PartContainer from "../parts/partContainer"

const assigned_training_data = data.assignedTrainingPage;

const AssignedTraining = (props) => {
  const [expanded, updateState] = useState(true);
  const reelItems = ['Pending', 'In Progress', 'Completed']
  const user = 'employee'

  function expandSideBar() {
    if (expanded) {
      updateState(false);
  }
  else {
      updateState(true);
  }
  }
  return (
    <div>
      <NavBar title="Assign Training" /> 
      <div className="d-flex">
        <SideBar expandSideBar={expandSideBar} expanded={expanded}/>
        <PartContainer data={assigned_training_data} type='assignedTraining' reelItems={reelItems} expanded={expanded} user={user} containerCount='1'/>
      </div>
    </div>
  )
}

export default AssignedTraining;