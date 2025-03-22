// components/ui/modal.tsx
import React from "react";
import { X } from "lucide-react"; // Make sure to install react-feather or use any icon library

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg relative z-10">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

type ModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function ModalContent({ children, className = "" }: ModalContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
