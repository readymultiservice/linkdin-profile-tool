import React from 'react';

export const GaugeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25m6-6a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25m0 0H5.25m13.5 0H12m0 0v-4.5m-3 4.5v-4.5m3 0h-3m-3 0h3m0 0v-4.5m3 4.5v-4.5m-3 0h3m-6.75 0h6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
