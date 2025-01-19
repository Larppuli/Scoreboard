import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const NumAnimation = ({ targetNumber, fixedNum, fontWeight }) => {
  const validTargetNumber = isNaN(targetNumber) ? 0 : parseFloat(targetNumber);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: validTargetNumber },
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.span
      style={{
        color: 'white',
        fontWeight: fontWeight || '400'
      }}
    >
      {number.to((n) => n.toFixed(fixedNum))}
    </animated.span>
  );
};

export default NumAnimation;
