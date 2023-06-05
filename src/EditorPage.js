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
  
  const forceSlashAfterHash = () => {

    let _hash = window.location.hash;
    if (_hash[1] && _hash[1] != '/') {
        return  window.location.origin + window.location.pathname + window.location.search + "#/" + _hash.slice(1);
    }

}

forceSlashAfterHash();

  const replaceUrlPath = () => {
    const newNote = encodeURIComponent(editorValue);
    return `${window.location.origin}${window.location.pathname}#/reader/?note=${newNote}`;
  };

  const handleOnClipCopyUrl = (event) => {
    navigator.clipboard.writeText( event.target.value);
  }

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
        className="pa2 mb3 w-50-ns w-90 mw-100 h-50" 
      />
   
      <p className='dn'>Character Count: {characterCount}</p>
      {isCharacterLimitReached && (
        <p className="red">Character limit reached (1000 characters)</p>
      )}
      <p class="f7 f6-l db black-70">Save note to url and generate qr code for link.</p>
      <button
        onClick={handleUpdateUrl}
        className={`bg-${isTextareaModified ? 'light-green' : 'white'} f6  link dim br1 ba ph3 pv2 mv3 dib black`}
        disabled={!isTextareaModified}
      >
        Save URL
      </button>        
      <div className='cf ba b--black-40 mb3 w-50-ns w-90 mw-100'>
      <input
        type="button"
        onClick={handleOnClipCopyUrl}
        value={replaceUrlPath()}
        className="fl w-90 pa2 bn bg-white"
        
      />
      <img src='copy.png' className=" fr pa2"  width="17" height="17"/>
      </div>
      <div className="flex justify-center">
        <div className="w-50 flex justify-center mb2">
          <QRCode value={replaceUrlPath()} size={200} />
        </div>
      </div>
        <a href={replaceUrlPath()}>Go to reader mode</a>
    </div>
  );
};

export default EditorPage;
