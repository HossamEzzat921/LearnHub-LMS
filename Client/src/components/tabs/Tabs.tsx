import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  // Using 0 as the initial index to match array mapping
  const [activeTab, setActiveTab] = useState(0);
const handleActiveTab = (index : number) => {setActiveTab(index)}
  return (
    <div className="w-full ">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200  bg-cream/50">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          
          return (
            <button
              key={tab.id || index}
              onClick={() => handleActiveTab(index)}
              className={`
                relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? "text-teal-600" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"}
              `}
            >
              {/* Optional Icon Support */}
              {tab.icon && <span className="text-lg hidden md:block">{tab.icon}</span>}
              
              <span>{tab.label}</span>

              

              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 shadow-[0_-1px_4px_rgba(13,148,136,0.3)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className=" mt-5">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;