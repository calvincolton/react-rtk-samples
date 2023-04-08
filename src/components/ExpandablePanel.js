import { useState } from "react";
import classNames from "classnames";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

const ExpandablePanel = ({ header, children, ...props }) => {
  const className = classNames(props.className, "mb-2 border rounded");
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((curr) => !curr);
  };

  return (
    <div {...props} className={className}>
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">{header}</div>
        <div onClick={handleClick} className="cursor-pointer">
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
