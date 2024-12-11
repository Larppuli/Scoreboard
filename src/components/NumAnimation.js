import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const NumAnimation = ({ targetNumber, fixedNum, colorChange, fontWeight }) => {
  const validTargetNumber = isNaN(targetNumber) ? 0 : parseFloat(targetNumber);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: validTargetNumber },
    config: { mass: 1, tension: 20, friction: 10 },
  });

  const calculateColor = (value) => {
    if (colorChange) {
        const adjustedValue = value - 15;
        if (adjustedValue <= 20) {
            const t = Math.max(adjustedValue / 20, 0);
            return `rgb(255, ${Math.round(255 * t)}, 0)`;
        } else if (adjustedValue <= 40) {
            const t = (adjustedValue - 20) / 20;
            return `rgb(${Math.round(255 - 255 * t)}, 255, 0)`;
        } else if (adjustedValue <= 60) {
            const t = (adjustedValue - 40) / 20;
            return `rgb(0, 255, ${Math.round(255 * t)})`;
        } else {
            return `rgb(0, 255, 255)`;
        }
    } else {
        return 'white';
    }
};




  return (
    <animated.span
      style={{
        color: number.to((n) => calculateColor(n)),
        fontWeight: fontWeight || '400'
      }}
    >
      {number.to((n) => n.toFixed(fixedNum))}
    </animated.span>
  );
};

export default NumAnimation;
