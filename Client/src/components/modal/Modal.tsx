import { X } from "lucide-react";
import { Button } from "../ui/button";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      className={`
    fixed inset-0 antialiased  flex items-center justify-center
    transition-colors  p-4 z-1000
    ${open ? "visible bg-black/60" : "invisible"}
    `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
      bg-white w-full p-8 max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all relative animate-fade-in-up
      ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      
      `}
      >
          <Button variant="outline" onClick={onClose} className="absolute top-2 right-2 ">
            <X size={20} />
        </Button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;
