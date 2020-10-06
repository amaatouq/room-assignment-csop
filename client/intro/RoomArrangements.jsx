import React from "react";

import { Centered } from "meteor/empirica:core";
export default class RoomArrangements extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1 className={"bp3-heading"}> Task Room Arrangements</h1>
          <p>
            Depending on the number of rooms, number of students, and your
            screen/browser size and resolution, the arrangement of the rooms
            might "look" different on your screen.
          </p>

          <div className="image">
            <img src="/experiment/instruction-room-arrangements.svg" />
          </div>

          <p>
            In all cases and for any arrangement that appears for you, you only
            need to consider the numbers on those rooms when addressing
            constraints in a task. In particular,{" "}
            <strong>
              "neighbor" is defined as rooms with consecutive numbers
            </strong>
            . For example, regardless of the arrangement you have on the screen,
            Room 102 is next door to both Room 101 and Room 103. On the other
            hand, Room 101 is only next door to Room 102.
          </p>

          <button
            type="button"
            className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
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
}
