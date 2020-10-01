import React, { Component } from "react";
import Scheduler, { SchedulerData } from "react-big-scheduler";
import {
  prevClick,
  nextClick,
  onViewChange,
  onSelectDate,
  newEvent,
  loadAgendaData
} from '../../actions/schedulerActions';
import "react-big-scheduler/lib/css/style.css";
import { connect } from "react-redux";
import { compose } from 'redux';
import moment from "moment";

import withDragDropContext from "./components/WithDndContext";

const mapStateToProps = state => {
  return {
    viewModel: state.schedulerData,
    auth: state.auth
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newRes: [],
      resFlg: false
    };
  }

  componentDidMount = () => {
    this.props.loadAgendaData();
  }


  prevClick = () => { this.props.prevClick() }
  nextClick = () => { this.props.nextClick() }
  onViewChange = (schedulerData, view) => { this.props.onViewChange(schedulerData, view) }
  onSelectDate = (schedulerData, date) => { this.props.onSelectDate(schedulerData, date) }
  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (!this.state.resFlg) {
      var today = moment().format("YYYY-MM-DD HH:mm:ss");
      var dayAhead = moment().add(1, 'Day').format("YYYY-MM-DD HH:mm:ss");
      if (moment(start).isBefore(today)) {
        window.confirm("Not a valid reservation time.");
      }
      else if (moment(start).isBefore(dayAhead)) {
        window.confirm("Reservations cannot be scheduled less than 24 hours in advanced.");
      }
      else {
        this.props.newEvent(schedulerData, slotId, slotName, start, end, type, item);
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
          if (item.id >= newFreshId) { newFreshId = item.id + 1; }
        });

        //Do a find machine here to attach the object id

        let newEvent = {
          id: newFreshId,
          start: start,
          end: end,
          resourceId: slotId,
          user: this.props.auth.user._id,
          machine: [],
          billingCode: [],
          grad: []
        }
        this.setState({ newRes: newEvent, resFlg: true });
        this.props.data.getReservation(this.state);
      }
    }
    else {
      if (window.confirm(`Only one reservation can be made at a time. Do you want to delete your current reservation time?`)) {
        this.props.loadAgendaData();
        this.setState({ newRes: [], resFlg: false });
        this.props.data.getReservation(this.state);
      }
    }
  }

  render() {
    return (
      <div>
        <Scheduler
          schedulerData={this.props.viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          newEvent={this.newEvent}
          onScrollTop={this.onScrollTop}
          onScrollBottom={this.onScrollBottom}
          toggleExpandFunc={this.toggleExpandFunc}
        />
      </div>
    );
  }

}
export default compose(
  connect(mapStateToProps, { prevClick, nextClick, onViewChange, onSelectDate, newEvent, loadAgendaData }),
  withDragDropContext
)(Calendar);
