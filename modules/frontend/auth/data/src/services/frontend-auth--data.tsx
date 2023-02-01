import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendAuthDataProps {}

const StyledFrontendAuthData = styled.div`
  color: pink;
`;

export function FrontendAuthData(props: FrontendAuthDataProps) {
  return (
    <StyledFrontendAuthData>
      <h1>Welcome to FrontendAuthData!</h1>
    </StyledFrontendAuthData>
  );
}

export default FrontendAuthData;
