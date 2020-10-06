import React from "react";

import {Centered} from "meteor/empirica:core";
import { exampleTaskData } from "./TaskDetails";

export default class ConstraintsDetails extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    this.violatedConstraints();
    this.updateScore();
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}>Respecting the Constraints</h1>
          <p>
            You need to{" "}
            <strong>
              consider some constraints when assigning students to rooms
            </strong>. Some students can't live together in the same room and
            some students must be neighbors.
          </p>
          <p>
            These constraints vary from task to task, and there are no
            additional constraints you need to respect other than the ones
            stated (e.g., feel free to leave one room empty if no constraint
            requires you to assign at least one student in each room).
          </p>

          <p>
            Try this example again and see what will happen if a constraint is
            violated:
          </p>

          <div className="task">
            <div className="left">
              <div className="constraints">
                <h5 className={"bp3-heading"}>Constraints</h5>
                <ul>
                  {exampleTaskData.constraints.map(constraint => {
                    const failed = this.state.violatedConstraintsIds.includes(
                      constraint._id
                    );
                    return (
                      <li
                        key={constraint._id}
                        className={failed ? "failed" : ""}
                      >
                        {failed ? (
                          <span className="bp3-icon-standard bp3-icon-cross" />
                        ) : (
                          <span className="bp3-icon-standard bp3-icon-dot" />
                        )}
                        {constraint.pair.join(" and ")} {constraint.text}.
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="info">
                <div className="score">
                  {/*<h5>Score</h5>*/}
                  {/*<h2>{this.state.score}</h2>*/}
                </div>
              </div>
            </div>

            <div className="board">
              <div className="all-rooms">
                {this.renderRoom("deck", true)}
                <div className="rooms">
                  {exampleTaskData.rooms.map(room =>
                    this.renderRoom(room, false)
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ color: "red" }}>
              <strong>
                NOTE: Every violated constraint will result in deducting 100
                points from your score.
              </strong>
            </p>
            <p style={{ color: "green" }}>
              <strong>
                NOTE: It is OK to leave some rooms empty, but you have to assign
                all the students.
              </strong>
            </p>
          </div>

          <button
            type="button"
            className="bp3-button bp3-intent-nope -icon-standard bp3-icon-double-chevron-left"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="bp3-button bp3-intent-primary"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <span className="bp3-icon-standard bp3-icon-double-chevron-right bp3-align-right" />
          </button>
        </div>
      </Centered>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      studentARoom: "deck",
      studentBRoom: "deck",
      studentCRoom: "deck",
      studentDRoom: "deck",
      score: 0,
      violatedConstraintsIds: []
    };
  }

  updateScore() {
    this.state.score = 0;
    exampleTaskData.students.forEach(student => {
      exampleTaskData.rooms.forEach(room => {
        if (this.state[`student${student}Room`] === room) {
          this.state.score += exampleTaskData.payoff[student][room];
        }
      });
    });
    this.state.score -= 100 * this.state.violatedConstraintsIds.length;
    //if anyone in the deck, then score is 0
    exampleTaskData.students.forEach(student => {
      if (this.state[`student${student}Room`] === "deck") {
        //if anyone in the deck, score is 0
        this.state.score = "N/A";
      }
    });
  }

  violatedConstraints() {
    this.state.violatedConstraintsIds = [];
    exampleTaskData.constraints.forEach(constraint => {
      const firstStudentRoom = this.state[`student${constraint.pair[0]}Room`];
      const secondStudentRoom = this.state[`student${constraint.pair[1]}Room`];

      if (firstStudentRoom !== "deck" && secondStudentRoom !== "deck") {
        switch (constraint.type) {
          case 0:
            //they are not in the same room, when they should've
            if (firstStudentRoom !== secondStudentRoom) {
              console.debug(
                constraint.pair.join(" and "),
                "they are not in the same room, when they should've"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }
            break;
          case 1:
            //they are in the same room, when they shouldn't
            if (firstStudentRoom === secondStudentRoom) {
              console.debug(
                constraint.pair.join(" and "),
                "they are in the same room, when they shouldn't"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }

            break;
          case 2:
            //if they are not neighbors, when they should've been
            if (Math.abs(firstStudentRoom - secondStudentRoom) !== 1) {
              console.debug(
                constraint.pair.join(" and "),
                "they are not neighbors, when they should've been"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }

            break;
          case 3:
            if (Math.abs(firstStudentRoom - secondStudentRoom) < 2) {
              console.debug(
                constraint.pair.join(" and "),
                "can't live in the same room or be neighbors, so why are they?"
              );
              this.state.violatedConstraintsIds.push(constraint._id);
            }
            break;
        }
      }
    });
  }

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    this.setState({ hovered: true });
  };

  handleDragLeave = e => {
    this.setState({ hovered: false });
  };

  handleDrop = (room, e) => {
    const student = e.dataTransfer.getData("text/plain");
    this.setState({ hovered: false });
    let obj = {};
    obj[`student${student}Room`] = room;
    this.setState(obj);
  };

  renderRoom(room, isDeck) {
    const { hovered } = this.state;
    const students = [];
    exampleTaskData.students.forEach(student => {
      if (this.state[`student${student}Room`] === room) {
        students.push(student);
      }
    });

    const classNameRoom = isDeck ? "deck bp3-elevation-1" : "room";
    const classNameHovered = hovered ? "bp3-elevation-3" : "";
    return (
      <div
        key={room}
        onDrop={this.handleDrop.bind(this, room)}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        className={`bp3-card ${classNameRoom} ${classNameHovered}`}
      >
        {isDeck ? null : <h6 className={"bp3-heading"}>Room {room}</h6>}
        {students.map(student => this.renderStudent(student))}
      </div>
    );
  }

  studentHandleDragStart = (student, e) => {
    e.dataTransfer.setData("text/plain", student);
  };

  studentHandleDragOver = e => {
    e.preventDefault();
  };

  studentHandleDragEnd = e => {
    //console.log("Dropped", Math.random());
  };

  renderStudent(student) {
    const style = {};
    const cursorStyle = { cursor: "move" };

    return (
      <div
        key={student}
        draggable={true}
        onDragStart={this.studentHandleDragStart.bind(this, student)}
        onDragOver={this.studentHandleDragOver}
        onDragEnd={this.studentHandleDragEnd}
        className="student"
        style={cursorStyle}
      >
        {/* <span className="icon bp3-icon-standard bp3-icon-person" /> */}
        <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <path
              style={style}
              d="M96 0c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64S60.654 0 96 0m48 144h-11.36c-22.711 10.443-49.59 10.894-73.28 0H48c-26.51 0-48 21.49-48 48v136c0 13.255 10.745 24 24 24h16v136c0 13.255 10.745 24 24 24h64c13.255 0 24-10.745 24-24V352h16c13.255 0 24-10.745 24-24V192c0-26.51-21.49-48-48-48z"
            />
          </svg>
        </span>
        <span className="letter">{student}</span>
      </div>
    );
  }
}
