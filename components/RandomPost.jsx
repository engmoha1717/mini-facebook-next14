import React from "react";

const RandomPost = () => {
  return (
    <div className="m-8 mb-9">
      <div className="flex flex-wrap flex-col items-center justify-center space-x-4 md:flex-row md:space-y-0 md:space-x-4">
        {[1, 2, 3,4,5,6].map((i) => (
          <div key={i} className="">
            <h1 className="
              text-2xl font-bold mb-2">Random Post</h1>
            <p className="
              text-gray-700 text-lg mb-4">Random Post Content</p>
            <img src="https://picsum.photos/200/200" alt="Random Post Image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomPost;




