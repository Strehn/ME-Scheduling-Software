import React, { Component } from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT
} from "react-big-scheduler";
import { 
  prevClick,
  nextClick,
  onViewChange,
  onSelectDate,
  loadAgendaData
 } from '../../actions/schedulerActions';
import "react-big-scheduler/lib/css/style.css";
import { connect } from "react-redux";
import { compose } from 'redux';

import withDragDropContext from "./components/WithDndContext";
const mapStateToProps = state => {
  return {
    viewModel: state.schedulerData,
  }
};

class ViewOnlyCalendar extends Component {
  componentDidMount= () => {
    this.props.loadAgendaData();
  }

  prevClick = () => { this.props.prevClick() }
  nextClick = () => { this.props.nextClick() }
  onViewChange = ( schedulerData, view ) => { this.props.onViewChange(schedulerData, view) }
  onSelectDate = ( schedulerData, date ) => { this.props.onSelectDate(schedulerData, date) }
  render() {
    return (
      <div>
          <Scheduler
            schedulerData={this.props.viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            toggleExpandFunc={this.toggleExpandFunc}
          />
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, {prevClick, nextClick, onViewChange, onSelectDate, loadAgendaData }),
  withDragDropContext
)(ViewOnlyCalendar);
