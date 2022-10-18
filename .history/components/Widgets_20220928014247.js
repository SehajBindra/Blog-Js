import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

function Widgets() {
  return (
    <div className="md:col-span-2 border-l mt-2 px-2 hidden md:inline lg:inline">
      {/* Search */}
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2 mb-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          className="bg-transparent flex-1 outline-none"
          type="text"
          placeholder="Search "
        />
      </div>
      <div className="ml-2  overflow-y-visible">
        {/* <TwitterTimelineEmbed
          sourceType="profile"
          screenName="GameOfThrones"
          options={{ height: 1000 }}
        /> */}
        {/* <TwitterTimelineEmbed
          sourceType="profile"
          screenName="diljitdosanjh"
          options={{ height: 500 }}
        /> */}
      </div>

      {/* <TwitterFollowButton screenName={"Stranger_Things"} /> */}

      {/* <TwitterTimelineEmbed
        sourceType="profile"
        screenName="Marvel"
        options={{ height: 1000 }}
      /> */}
    </div>
  );
}

export default Widgets;
