import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: 'Mohammed',
    lastName: 'Ali',
    email: 'm.ali@gmail.com',
    language: 'English',
    timeZone: 'SA',
  });

  const [isEditing, setIsEditing] = useState(false);

 
  const handleEditClick = () => {
    setIsEditing(true);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', user);
    setIsEditing(false); 
  };

  return (
    <div className="bg-white m-5 shadow-md rounded-lg p-6">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/506667/person.svg "
            alt="Profile Picture"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="bg-blue-500  hover:bg-blue-600 text-white px-5 py-3 rounded"
        >
          Edit
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div>
              <label htmlFor="firstName" className="block mb-2">
                Your First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                placeholder="Your First Name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

       
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

     
            <div>
              <label htmlFor="language" className="block mb-2">
                Language
              </label>
              <select
                id="language"
                value={user.language}
                onChange={(e) => setUser({ ...user, language: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

         
            <div>
              <label htmlFor="timeZone" className="block mb-2">
                Time Zone
              </label>
              <select
                id="timeZone"
                value={user.timeZone}
                onChange={(e) => setUser({ ...user, timeZone: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="UTC">UTC</option>
                <option value="UTC+1">UTC+1</option>
                <option value="UTC-5">UTC-5</option>
                <option value="UTC+9">UTC+9</option>
              </select>
            </div>
          </div>

       
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      )}


      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   
          <div className="flex flex-col">
            <p>{`First Name`}</p>
            <p>{`${user.firstName}`}</p>
          </div>
          <div className="flex flex-col">
            <p>{`Last Name`}</p>
            <p>{`${user.lastName}`}</p>
          </div>

    
          <div>
            <p>{`Email`}</p>
            <p>{`${user.email}`}</p>
          </div>

    
          <div>
            <p>{`Language`}</p>
            <p>{`${user.language}`}</p>
          </div>

      
          <div>
            <p>{`Time Zone`}</p>
            <p>{`${user.timeZone}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;