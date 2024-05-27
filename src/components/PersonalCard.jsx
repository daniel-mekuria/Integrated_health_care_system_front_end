function PersonCard({ name, isActive, gender, age, language, height, tags }) {
    return (
      <div className="ml-8 flex flex-col rounded-lg  overflow-hidden h-48">
        {/* Profile photo */}
        {/* <div className="flex justify-center mt-2">
          <img
            src="profile.jpg" // Replace with the URL of your profile photo
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
        </div> */}
        
        <div className="px-4 py-2">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="mt-1 text-sm text-gray-600">{isActive ? 'Active' : 'Inactive'}</p>
        </div>

        <div className="px-4 ">
          <dl className=" flex-col space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium text-gray-500">Gender:</span>
              <span className="ml-1">{gender}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-500">Age:</span>
              <span className="ml-1">{age}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-500">Language:</span>
              <span className="ml-1">{language}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-500">Height:</span>
              <span className="ml-1">{height}</span>
            </div>
            {/* <div className="col-span-2">
              <span className="font-medium text-gray-500">Tags:</span>
              <div className="flex flex-wrap mt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 mr-2 mb-2 text-sm font-medium rounded-full bg-gray-200 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div> */}
          </dl>
        </div>
      </div>
    );
  }
export default PersonCard;