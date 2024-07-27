const Overlay = ({ text }) => (
    <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
      <h1 className="text-white text-4xl font-bold text-center">{text}</h1>
    </div>
  );
  
  export default Overlay;
  