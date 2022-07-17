export const H1Style = `
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 42px;
`;

export const H2Style = `
  font-size: 1.75rem; 
  line-height: 42px;
`;

export const H3Style = `
  font-size: 1.375rem;
  line-height: 33px;
`;

export const H4Style400 = `
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 27px;
`;

export const H4Style600 = `
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 27px;
`;

export const H5Style400 = `
  font-size: 1rem;
  font-weight: 400;
  line-height: 24px;
`;

export const H5Style600 = `
  font-size: 1rem;
  font-weight: 600;
  line-height: 24px;
`;

export const PStyle600 = `
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 21px;
`;

export const PStyle400 = `
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 21px;
`;

export const PStyleSmall = `
  font-size: 0.75rem;
  line-height: 18px;
`;

export const breakpoints = (
  cssProp: string, // the CSS property to apply to the breakpoints
  cssPropUnits: string, // the units of the CSS property (can set equal to "" and apply units to values directly)
  values: Array<object>, // array of objects, e.g. [{ 800: 60 }, ...] <-- 800 (key) = screen breakpoint, 60 (value) = CSS prop breakpoint
  mediaQueryType: string = 'max-width' // media query breakpoint type, i.e.: max-width, min-width, max-height, min-height
): Array<string> => {
  const breakpointProps = values.reduce((mediaQueries: any, value: any) => {
    const [screenBreakpoint, cssPropBreakpoint] = [
      Object.keys(value)[0],
      Object.values(value)[0],
    ];
    const targetBreakPointStyle = `${mediaQueries}
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
    }
    `;
    return targetBreakPointStyle;
  }, '');
  return [breakpointProps];
};
