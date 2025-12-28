import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ConfirmToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "default";
}

export const ConfirmToast = ({ open, onOpenChange, title, description, onConfirm, confirmText = "확인", cancelText = "취소", variant = "default" }: ConfirmToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onOpenChange(false), 200);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`} onClick={handleClose} />

      <div
        className={`absolute top-6 left-1/2 -translate-x-1/2 w-[360px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{title}</p>
              {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 p-1 -m-1">
              <X size={16} />
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={handleClose} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-3 py-1.5 text-sm text-white rounded-md transition-colors cursor-pointer ${variant === "danger" ? "bg-red-500 hover:bg-red-600" : "bg-gray-900 hover:bg-gray-800"}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
