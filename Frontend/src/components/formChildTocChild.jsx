import React, { useState, useEffect } from 'react';

const Parent = () => {
  const [charedState, setSharedState] = useState(null);
  const callback = (value) => setSharedState(value);
  
  return (
    <React.Fragment>
      <Child1 callback={callback} />
      <Child2 sharedState={charedState} />
    </React.Fragment>
  );
};

const Child1 = ({ callback }) => {
  useEffect(() => {
    // or handler
    callback('data');
  }, []);
  return <div />;
};

const Child2 = (props) => {
  return <div>{props.sharedState}</div>;
};

export default Parent;
