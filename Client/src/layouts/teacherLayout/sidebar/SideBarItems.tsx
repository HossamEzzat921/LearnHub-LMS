const SideBarItems = ({ children }) => {
  return (
    <div className="px-4 py-6 space-y-2 relative">
      <div>{children}</div>
    </div>
  );
};

export default SideBarItems;
