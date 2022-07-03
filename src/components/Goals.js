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
import close from '../images/close.svg';
import styled from 'styled-components';


function Goals({ auth, userId }) {

  const [myGoals, setMyGoals] = useState([])
  const [goalName, setGoalName] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [goalImage, setGoalImage] = useState('')

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
    setDoc(goalRef, { id: newId, owner: userId, name: goalName, amount: goalAmount, image: goalImage });
    setGoalName('');
    setGoalAmount('');
    setGoalImage('');
  }

  const deleteGoal = (i) => {
    const firestore = getFirestore();
    deleteDoc(doc(firestore, 'goals', myGoals[i].id));
  }

  return (
    <>
      {myGoals.map((goal, i) => (
        <GoalContainer>
          <GoalImage key={i+goal.name} className="goalItem" src={goal.image} />
          <h3 key={i+goal.name} className="goalItem">{goal.name}</h3>
          <h3 key={i+goal.name} className="goalItem">${goal.amount}</h3>
          <Close src={close} onClick={() => deleteGoal(i)}/>
        </GoalContainer>

       ))}
       <AddGoalContainer>
       <div className="inputs">
         <AddGoalTitle>Goal Name</AddGoalTitle>
         <input type="url" autoComplete="off" value={goalName} onChange={(event) => { setGoalName(event.target.value) }} />
         <AddGoalTitle>Goal Amount</AddGoalTitle>
         <input type="url" autoComplete="off" value={goalAmount} onChange={(event) => { setGoalAmount(event.target.value) }} />
         <AddGoalTitle>Goal Image</AddGoalTitle>
         <input type="url" autoComplete="off" value={goalImage} onChange={(event) => { setGoalImage(event.target.value) }} />
       </div>
       <div className="buttons">
         <button onClick={addGoal}>Add Goal</button>
       </div>
       </AddGoalContainer>
    </>
  );
}

const GoalContainer = styled.div`
  display: flex;
  align-items: center;
`

const GoalImage = styled.img`
  height: 40px;
  width: 40px;
`

const Close = styled.img`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 12px;
`

const AddGoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #212224;
  border-radius: 5px;
`

const AddGoalTitle = styled.span`
  font-weight: 800;
`

export default Goals;
