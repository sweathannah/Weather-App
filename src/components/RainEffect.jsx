// This component creates a "matrix" of rain drops using CSS
import './RainEffect.css';

const RainEffect = () => {
  // Create an array of drops to render
  const drops = Array.from({ length: 60 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`, // Random horizontal position
      animationDelay: `${Math.random() * 2}s`, // Random start time
      animationDuration: `${0.5 + Math.random() * 0.5}s`, // Random speed
    };
    return <div key={i} className="rain-drop" style={style}></div>;
  });

  return <div className="rain-container" aria-hidden="true">{drops}</div>;
};

export default RainEffect;