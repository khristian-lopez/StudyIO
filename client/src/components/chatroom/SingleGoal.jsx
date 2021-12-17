import React from 'react';

const individualEventOrGoalSx = {

}

let SingleGoal = (props) => {

  return (
    <div style={individualEventOrGoalSx}>
      <span>{props.content.name}</span>
    </div>
  )
}

export default SingleGoal;