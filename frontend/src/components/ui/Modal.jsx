import React, { Fragment } from 'react';
import { PrimaryButton, SecondaryButton } from './Button';

const Modal = ({ 
  children, 
  show = false, 
  maxWidth = '2xl', 
  closeable = true, 
  title = null,
  footer = null,
  onClose = () => {} 
}) => {
  const handleClose = () => {
    if (closeable) {
      onClose();
    }
  };

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
    '6xl': 'sm:max-w-6xl',
    '7xl': 'sm:max-w-7xl',
  }[maxWidth] || 'sm:max-w-md';

  return (
    <>
      {show && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog" 
          aria-modal="true"
          onClick={handleClose}
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">            <div className="fixed inset-0 transition-opacity bg-neutral-800/75" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div 
              className={`inline-block align-bottom bg-surface-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${maxWidthClass} sm:w-full`}
              onClick={e => e.stopPropagation()}
            >
              {title && (
                <div className="px-6 py-4 border-b border-surface-border">
                  <h3 className="text-lg font-medium text-text-primary" id="modal-title">
                    {title}
                  </h3>
                  {closeable && (
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-text-secondary hover:text-text-primary"
                      onClick={handleClose}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              
              <div className="px-6 py-4">
                {children}
              </div>

              {footer && (
                <div className="px-6 py-4 bg-surface-background border-t border-surface-border flex justify-end space-x-3">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ConfirmationModal = ({
  show = false,
  title = 'Confirmation',
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmButtonType = 'primary',
  onConfirm,
  onCancel,
}) => {  const ConfirmButton = confirmButtonType === 'danger' 
    ? props => <SecondaryButton className="bg-red-600 text-white hover:bg-red-700" {...props} />
    : PrimaryButton;

  return (
    <Modal 
      show={show} 
      maxWidth="md"
      title={title}
      onClose={onCancel}
      footer={
        <>
          <SecondaryButton onClick={onCancel}>
            {cancelText}
          </SecondaryButton>
          <ConfirmButton onClick={onConfirm}>
            {confirmText}
          </ConfirmButton>
        </>
      }
    >
      <p className="text-text-primary">{message}</p>
    </Modal>
  );
};

export default Modal;
