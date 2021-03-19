export const iconAttributes = {
  campfire: {
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    paths: [
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />,
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />,
    ],
  },
  'head-shape': {
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    paths: [
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />,
    ],
  },
};

type IconAttributes = typeof iconAttributes;
export type IconName = keyof IconAttributes;
