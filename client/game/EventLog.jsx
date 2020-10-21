import React from "react";
import moment from "moment/moment";
import Author from "./Author";
import { TimeSync } from "meteor/mizzao:timesync";

export default class EventLog extends React.Component {
  componentDidMount() {
    this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
    console.log("time", moment(TimeSync.serverTime(new Date(), 1000)));
  }

  componentDidUpdate(prevProps) {
    console.log(moment(TimeSync.serverTime(null, 1000)).format('HH:mm:ss'));
    if (prevProps.events.length < this.props.events.length) {
      this.eventsEl.scrollTop = this.eventsEl.scrollHeight;
    }
  }

  render() {
    const { events, player } = this.props;

    //if the one who made the event is the player himself then self will be true
    return (
      <div className="eventlog bp3-card">
        <div className="events" ref={(el) => (this.eventsEl = el)}>
          {events.map((event, i) => (
            <Event
              key={i}
              event={event}
              self={event.subject ? player._id === event.subject._id : null}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Event extends React.Component {
  render() {
    const {
      subject,
      roundId,
      verb,
      object,
      target,
      state,
      at,
    } = this.props.event;
    const { self } = this.props;
    let content;
    switch (verb) {
      case "roundStarted":
        content = <div className="content">Round {roundId} started</div>;
        break;
      case "movedStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> moved{" "}
            <div className="object">{object}</div> to{" "}
            <div className="target">Room {target}</div>.
          </div>
        );
        break;
      case "draggingStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> started moving{" "}
            <div className="object">{object}</div>.
          </div>
        );
        break;
      case "releasedStudent":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> released{" "}
            <div className="object">{object}</div> without moving it.
          </div>
        );
        break;
      case "playerSatisfaction":
        content = (
          <div className="content">
            <Author player={subject} self={self} /> {self ? "are" : "is"}{" "}
            <div className="object">{state}</div> with the answer
          </div>
        );
        break;
      default:
        console.error(`Unknown Event: ${verb}`);

        return null;
    }

    return (
      
      <div className="event">
        {/*
          Not sure we even need to show am/pm. I think we need seconds since the
          interactions are quick but to save space we can probably skip am/pm
          for the sake of space. We could maybe also just but the seconds since
          start of round or remaining second before end of round, might be more
          relevant. Might or might not be clear.
        */}
        {/* <div className="timestamp">{moment(at).format("hh:mm:ss a")}</div> */}
        
        <div className="timestamp">{moment(at).format("hh:mm:ss")}</div>
        {content}
      </div>
    );
  }
}
