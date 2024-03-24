function Pill({ image, text, onClick }) {
  return (
    <span className="user-pill" onClick={onClick}>
      <img src={image} alt="user-image" />
      <span>{text} &times;</span>
    </span>
  );
}

export default Pill;
