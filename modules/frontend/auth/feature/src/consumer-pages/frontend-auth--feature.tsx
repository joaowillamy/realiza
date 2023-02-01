import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendAuthFeatureProps {}

const StyledFrontendAuthFeature = styled.div`
  color: pink;
`;

export function FrontendAuthFeature(props: FrontendAuthFeatureProps) {
  return (
    <StyledFrontendAuthFeature>
      <h1>Welcome to FrontendAuthFeature!</h1>
    </StyledFrontendAuthFeature>
  );
}

export default FrontendAuthFeature;
