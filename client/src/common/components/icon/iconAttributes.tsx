export const iconAttributes = {
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
