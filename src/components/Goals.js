import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  query,
  collection,
  onSnapshot,
  where,
  doc,
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { uid } from 'uid';


function Goals({ auth, userId }) {

  const [myGoals, setMyGoals] = useState([])
  const [goalName, setGoalName] = useState('')

  // Goal Listener
  useEffect(() => {
    const firestore = getFirestore();
    let goals = [];
    const goalQuery = query(collection(firestore, 'goals'), where("owner", "==", userId));
    onSnapshot(goalQuery, (querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        goals.push({ ...doc.data(), id: doc.id })
      })
      setMyGoals(goals);
      goals = [];
    });
  }, [setMyGoals, userId]);

  const addGoal = () => {
    const firestore = getFirestore();
    const newId = uid();
    const goalRef = doc(firestore, 'goals', newId);
    setDoc(goalRef, { name: goalName, id: newId, owner: userId });
    setGoalName('');
  }

  const deleteGoal = (i) => {
    const firestore = getFirestore();
    deleteDoc(doc(firestore, 'goals', myGoals[i].id));
  }

  return (
    <>
      {myGoals.map((goal, i) => (
         <h3 key={i+goal.name} className="goalItem" onClick={() => deleteGoal(i)}>{goal.name}</h3> ))}
       <div className="inputs">
         <span>Goal</span>
         <input type="url" autoComplete="off" value={goalName} onChange={(event) => { setGoalName(event.target.value) }} />
       </div>
       <div className="buttons">
         <button onClick={addGoal}>Add Goal</button>
       </div>
    </>
  );
}

export default Goals;
