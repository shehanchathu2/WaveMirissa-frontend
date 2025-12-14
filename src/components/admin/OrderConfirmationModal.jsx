import React, { useState } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';

// Reusable Confirmation Modal Component
const OrderConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Action", 
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "warning" // warning, danger, success
}) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: <X className="w-6 h-6" />,
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    confirmBtn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                };
            case 'success':
                return {
                    icon: <Check className="w-6 h-6" />,
                    iconBg: 'bg-green-100',
                    iconColor: 'text-green-600',
                    confirmBtn: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                };
            default:
                return {
                    icon: <AlertTriangle className="w-6 h-6" />,
                    iconBg: 'bg-amber-100',
                    iconColor: 'text-amber-600',
                    confirmBtn: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${styles.iconBg} ${styles.iconColor} flex items-center justify-center`}>
                            {styles.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex space-x-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;