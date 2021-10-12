import "./HoverCircle.css";

const HoverCircle = ({ row, pickCol, circleColor }) => {
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e, col) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e, col) => {
    pickCol(col);
    e.preventDefault();
    e.stopPropagation();
  };

  const circle = () => {
    return (
      <div className="d-flex" draggable>
        <div className="circle" style={{ backgroundColor: circleColor }} />
      </div>
    );
  };

  const createRow = () => {
    return (
      <div className="w-100 bg-primary d-flex">
        {new Array(row).fill().map((_, i) => (
          <div
            className="w-100"
            key={i}
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={(e) => handleDragOver(e, i)}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <>
      {circle()}
      <div className="d-flex" className="d-flex hover-circle">
        {createRow()}
      </div>
    </>
  );
};

export default HoverCircle;
