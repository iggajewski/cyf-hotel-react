import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import CustomerProfile from "./CustomerProfile";

function SearchResults(props) {
  let [profile, setProfile] = useState(null);

  function Person(props) {
    let [isHighlighted, setHighlight] = useState(false);
    function changeSelection() {
      setHighlight(!isHighlighted);
    }

    function showProfile() {
      fetch(`https://cyf-react.glitch.me/customers/${props.person.id}`)
        .then(response => response.json())
        .then(json => setProfile(json));
    }

    return (
      <tr
        className={isHighlighted ? "highlighted" : ""}
        onClick={changeSelection}
      >
        <th>{props.person.id}</th>
        <th>{props.person.title}</th>
        <th>{props.person.firstName}</th>
        <th>{props.person.surname}</th>
        <th>{props.person.email}</th>
        <th>{props.person.roomId}</th>
        <th>{props.person.checkInDate}</th>
        <th>{props.person.checkOutDate}</th>
        <th>
          {moment(props.person.checkOutDate).diff(
            props.person.checkInDate,
            "days"
          )}{" "}
          days
        </th>
        <th>
          <button
            className="btn btn-secondary profile-button"
            onClick={showProfile}
          >
            Show profile
          </button>
        </th>
      </tr>
    );
  }

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">first name</th>
            <th scope="col">surname</th>
            <th scope="col">email</th>
            <th scope="col">room id</th>
            <th scope="col">check in date</th>
            <th scope="col">check out date</th>
            <th scope="col">staying for</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {props.results.map(result => (
            <Person person={result} />
          ))}
        </tbody>
      </table>
      <CustomerProfile customer={profile} />
    </div>
  );
}

export default SearchResults;
