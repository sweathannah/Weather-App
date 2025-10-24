// This is a simple, large, blurred circle to simulate a sun ray effect
const SunEffect = () => (
  <div
    aria-hidden="true"
    className="fixed top-[-20%] right-[-20%] w-[50vmax] h-[50vmax] 
               bg-yellow-400 rounded-full blur-[150px] 
               opacity-20 animate-pulse z-0"
  />
);

export default SunEffect;