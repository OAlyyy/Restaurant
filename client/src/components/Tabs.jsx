import { TabItem } from "./TabItem.jsx";


export const Tabs = ({ list, activeTab, onTabSwitch }) => {
  // let active = activeTab ?  activeTab : list[0];
   let active = activeTab === '' ? list[0] : activeTab;
   console.log("Tabs,jsx active =>",active);

  return (
      <div className="container mx-auto flex align-center py-2 border-b-gray-400 border-b-1">
        {list.map((item, index) => {
          return (
            <TabItem
              title={item.name}
              key={index}
              index={index}
              active={active === item}
              setActive={onTabSwitch}
            />
          );
        })}
      </div>
  );
};
