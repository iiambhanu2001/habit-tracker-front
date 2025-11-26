import React from "react";

export default function ConfirmModal({ open, message = "Are you sure?", onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-modal-backdrop" role="dialog" aria-modal="true">
      <div className="confirm-modal">
        <h3>Confirm</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-cancel" onClick={onCancel} aria-label="Cancel">Cancel</button>
          <button className="btn btn-confirm" onClick={onConfirm} aria-label="Confirm delete">Delete</button>
        </div>
      </div>
    </div>
  );
}
