import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

const EditorPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const note = searchParams.get('note');
  const [editorValue, setEditorValue] = useState(note || '');
  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [isTextareaModified, setIsTextareaModified] = useState(false);
  const [isCharacterLimitReached, setIsCharacterLimitReached] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const encodedInputValue = encodeURIComponent(inputValue);
    setEditorValue(inputValue);
    setIsTextareaModified(encodedInputValue.length <= 1000);
    setIsCharacterLimitReached(encodedInputValue.length > 1000);
  };

  const handleUpdateUrl = () => {
    const newNote = encodeURIComponent(editorValue);
    const newUrl = `${window.location.origin}${window.location.pathname}?note=${newNote}`;
    setCurrentUrl(newUrl);
    window.history.pushState({}, '', newUrl);
    setIsTextareaModified(false);
  };

  const characterCount = editorValue.length;

  return (
    <div className="flex flex-column items-center justify-center min-vh-100">
      <h1>Editor Page</h1>
      <textarea rows="12"
        value={editorValue}
        onChange={handleInputChange}
        className="pa2 mb3 w-50-ns w-100 mw-100 h-50" 
      />
      <p>Character Count: {characterCount}</p>
      {isCharacterLimitReached && (
        <p className="red">Character limit reached (1000 characters)</p>
      )}
      
      <input
        type="text"
        value={currentUrl}
        className="pa2 mb3"
        disabled
      />
      <div className="flex justify-center">
        <div className="w-50 flex justify-center">
          <QRCode value={currentUrl} size={200} />
        </div>
      </div>
      <button
        onClick={handleUpdateUrl}
        className={`bg-${isTextareaModified ? 'green' : 'gray'} white pa2 mt3`}
        disabled={!isTextareaModified}
      >
        Update URL
      </button>
    </div>
  );
};

export default EditorPage;
