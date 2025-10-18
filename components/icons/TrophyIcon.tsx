import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 119 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 21v-4.507c0-.982.797-1.779 1.779-1.779h.442c.982 0 1.779.797 1.779 1.779V21M9 14.25v6.75m-1.5-6.75v6.75m12-6.75v6.75m-1.5-6.75v6.75M5.25 10.5l-1.5 1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 10.5l1.5 1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v.75m6 0v.75m-6 3.75v.75m6 0v.75m-6 3.75h6" />
  </svg>
);
