import React, { useState, useEffect, useRef } from "react";
import Pill from '../util/Pill'

const SearchHandle = () => {
  const [searchTerm, setSreachTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const inputRef = useRef(null);
  const [userSelectedSet, setUserSelectedSet] = useState(new Set());
  const [data, setData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchUser = () => {
    if (searchTerm.trim() === "") {
      return;
    }

    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setSuggestion(data);
        setData(data.users);
      })
      .catch((err) => console.error(err));
  };


  const handleSelect = (user) => {
    setUserSelected([...userSelected, user]);
    setUserSelectedSet(new Set([...userSelectedSet, user.email]));
    setSreachTerm("");
    setSuggestion([]);
    inputRef.current.focus();
  };

  const handleRemovePill = (user) => {
    const updatedUsers = userSelected.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setUserSelected(updatedUsers);
    const updateduserEmail = new Set(userSelectedSet);
    updateduserEmail.delete(user.email);
    setUserSelectedSet(updateduserEmail);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      userSelected.length > 0
    ) {
      const lastUser = userSelected[userSelected.length - 1];
      handleRemovePill(lastUser);
      setSuggestion([]);
    }
  };

  const keyDownHandler = (e) =>{
    e.preventDefault();
    if( e.ctrlKey && e.key === 'k'){
      console.log("You just pressed ctrl and K");
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
  },[])

  useEffect(() => {
    fetchUser();
  }, [searchTerm]);
  
  return (
    <div className="user-search-container ">
        <div className="user-search-input">
          {/* pills */}
          {userSelected.map((user) => {
            return (
              <Pill
                key={user.email}
                image={user.image}
                text={`${user.firstName} ${user.lastName}`}
                onClick={() => handleRemovePill(user)}
              />
            );
          })}
          {/* input field */}
          <div className="bg-transparent w-full h-full">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSreachTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for a user"
            />
            <p className="absolute top-1 right-2 font-extrabold">
              {
                !isSearchActive? <>
                <span 
                  className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                    ctrl</span>+<span className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                    k</span>
                </> : 
                  <span className="shadow-md px-1 py-1 text-xs w-8 rounded-md font-bold">
                  Esc</span>
              }
            </p>
            {/* search suggestions */}
            <ul className="suggestions-list">
              {suggestion?.users?.map((user) => {
                return !userSelectedSet?.has(user.email) ? (
                  <li onClick={() => handleSelect(user)} key={user.email}>
                    <img src={user.image} alt={user.firstName} />
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </li>
                ) : (
                  <></>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default SearchHandle