'use client';

import React from "react";
import Link from 'next/link';

const Body = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row p-4">
      <div className="w-full lg:w-1/2 p-4">
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
        </p>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4">
        <Link href="/register" legacyBehavior>
          <a className="bg-blue-500 text-gold py-2 px-4 rounded-lg hover:bg-blue-700">
            Get Started
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Body;
