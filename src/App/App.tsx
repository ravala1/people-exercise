import React, { useState } from "react";
import styles from "./App.module.scss";
import * as services from "../dataServices";

import { PeopleList } from "../people/PeopleList";
import { AddPerson } from "../people/AddPerson";

function App() {
  // need to get the current count of people
  const [count, setCount] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false)

  React.useEffect(() => {
    const fn = async () => {
      const people = await services.retrievePeople();
      setCount(people.length);
    };
    fn();
  }, []);

  const add = () => {
    setShowAddForm(true)
  }

  const back = () => {
    setShowAddForm(false)
  }

  return (
    <div className={styles.App}>
      <h1>People Exercise</h1>
      {!showAddForm && <>
        <h2>total people: {count}</h2>
        <PeopleList />
        <button className='btn btn-primary' onClick={add}>Add</button></>
      }
      {showAddForm && <>
        <AddPerson isEdit={false} />
        <button className='btn btn-primary' onClick={back}>Back</button></>
        }
      <div className={styles.footer}>
        <a
          href="https://github.com/relode-dev/people-exercise"
          target="_blank"
          rel="noreferrer"
        >
          visit this project's github page
        </a>
      </div>
    </div>
  );
}

export default App;
