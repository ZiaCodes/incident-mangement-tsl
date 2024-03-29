import React, { useState, useEffect, useRef } from "react";

const SearchHandle = (props) => {
  const inputRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  

  const keyDownHandler = (e) =>{
    
    if( e.ctrlKey && e.key === 'm'){
      inputRef.current.focus();
      setIsSearchActive(true);
    }

    if(e.key === 'Escape'){
      inputRef.current.blur();
      setIsSearchActive(false);
    }
  }

  useEffect(()=>{
    window.addEventListener('keydown',keyDownHandler);

    return () =>{
      window.removeEventListener('keydown',keyDownHandler)
    }
  },[]);
  
  return (
    <div className="user-search-container ">
        <div className="user-search-input">
          <div className="w-full h-full">
            <input
              ref={inputRef}
              type="text"
              value={props.searchValue}
              onChange={props.method}
              placeholder="Search for a user"
              className="z-50"
            />
            <p className="absolute top-1 right-2 font-extrabold">
              {
                !isSearchActive? <>
                <span 
                  className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                    ctrl</span>+<span className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                    m</span>
                </> : 
                  <span className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                  Esc</span>
              }
            </p>
          </div>
        </div>
      </div>
  )
}

export default SearchHandle