import React from "react";

export default class Author extends React.Component {
  render() {
    const { player, self } = this.props;

    return (
      <div className="author">
        <img src={player.get("avatar")} />
        <span className="name" style={{ color: player.get("nameColor") }}>
          {self ? "You" : player.get("name")}
        </span>
      </div>
    );
  }
}
