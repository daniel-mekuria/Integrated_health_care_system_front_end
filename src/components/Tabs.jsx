import React, { useState } from 'react';

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex mb-4">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`mr-4 px-4 py-2 text-sm font-medium rounded ${
              index === activeTab ? 'bg-gray-800 text-white' : 'bg-green text-white'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div>{children[activeTab]}</div>
    </div>
  );
}

export default Tabs;
