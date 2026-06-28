import React from 'react'

function Button({
  children,
  loading = false,
}) {
  return (
    <button
      disabled={loading}
      className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;