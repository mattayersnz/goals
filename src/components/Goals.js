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
import ProgressBar from "@ramonak/react-progress-bar";

function Goals({ auth, userId }) {

  const [myGoals, setMyGoals] = useState([])
  const [goalName, setGoalName] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [goalImage, setGoalImage] = useState('')
  const [goalSaved, setGoalSaved] = useState('')

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
    setDoc(goalRef, { id: newId, owner: userId, name: goalName, amount: goalAmount, image: goalImage, saved: goalSaved });
    setGoalName('');
    setGoalAmount('');
    setGoalImage('');
    setGoalSaved('');
  }

  const deleteGoal = (i) => {
    const firestore = getFirestore();
    deleteDoc(doc(firestore, 'goals', myGoals[i].id));
  }

  const addAmount = (i) => {
    const firestore = getFirestore();
    const goalRef = doc(firestore, 'goals', myGoals[i].id);
    let currentAmount = myGoals[i].saved
    if (parseInt(currentAmount) < parseInt(myGoals[i].amount)) {
      currentAmount++
      setDoc(goalRef, { saved: currentAmount }, { merge: true });
    }
  }

  const reduceAmount = (i) => {
    const firestore = getFirestore();
    const goalRef = doc(firestore, 'goals', myGoals[i].id);
    let currentAmount = myGoals[i].saved
    if (parseInt(currentAmount) > 0) {
      currentAmount--
      setDoc(goalRef, { saved: currentAmount }, { merge: true });
    }
  }

  // Progress Bar attributes
  // https://github.com/KaterinaLupacheva/react-progress-bar

  return (
    <>
      {myGoals.map((goal, i) => (
        <GoalContainer key={i+goal.name}>
          <GoalHeader>
            <GoalImage className="goalItem" src={goal.image} />
            <GoalName>{goal.name}</GoalName>
          </GoalHeader>
          <GoalMoney>
            <GoalAmount>${goal.amount}</GoalAmount>
            <ProgressBar completed={goal.saved/goal.amount * 100} width={'100%'} className="progressBar" dir={'rtl'} baseBgColor={'#212224'} customLabel={' $' + goal.saved} />
          </GoalMoney>
          <GoalSettings>
            <SavedUpdate onClick={() => addAmount(i)}>Add</SavedUpdate>
            <SavedUpdate onClick={() => reduceAmount(i)}>Reduce</SavedUpdate>
            <Close src={close} onClick={() => deleteGoal(i)}/>
          </GoalSettings>
        </GoalContainer>

       ))}
       <AddGoalContainer>
       <div className="inputs">
          <h2>Add Goal</h2>
          <AddGoalTitle>Goal Name</AddGoalTitle>
          <input type="url" autoComplete="off" value={goalName} onChange={(event) => { setGoalName(event.target.value) }} />
          <AddGoalTitle>Goal Amount</AddGoalTitle>
          <input type="number" autoComplete="off" value={goalAmount} onChange={(event) => { setGoalAmount(event.target.value) }} />
          <AddGoalTitle>Goal Image</AddGoalTitle>
          <input type="url" autoComplete="off" value={goalImage} onChange={(event) => { setGoalImage(event.target.value) }} />
          <AddGoalTitle>Goal Saved</AddGoalTitle>
          <input type="number" autoComplete="off" value={goalSaved} onChange={(event) => { setGoalSaved(event.target.value) }} />
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
  justify-content: center;
  width: 80%;
  @media only screen and (max-width: 920px) {
    flex-direction: column;
    margin-top: 24px;
  }
`

const GoalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`

const GoalName = styled.div`
  margin-top: 12px;
`

const GoalImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 10px;
`

const GoalAmount = styled.div`
  margin-left: 12px;
  margin-right: 7px;
  font-weight: 800;
`

const GoalMoney = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  @media only screen and (max-width: 920px) {
    margin-top: 10px;
  }
`

const GoalSettings = styled.div`
  display: flex;
  align-items: center;
`

const SavedUpdate = styled.div`
  margin-left: 7px;
  margin-right: 7px;
  padding-left: 12px;
  cursor: pointer;
  font-weight: 800;
  @media only screen and (max-width: 920px) {
    margin-top: 10px;
  }
`

const Close = styled.img`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 12px;
  @media only screen and (max-width: 920px) {
    margin-top: 10px;
  }
`

const AddGoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  padding-top: 0px;
  margin-top: 42px;
  margin-bottom: 42px;
  background-color: #212224;
  border-radius: 5px;
`

const AddGoalTitle = styled.span`
  font-weight: 800;
`

export default Goals;
