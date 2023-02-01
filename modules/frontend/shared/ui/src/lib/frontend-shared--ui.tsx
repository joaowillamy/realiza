import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendSharedUiProps {}

const StyledFrontendSharedUi = styled.div`
  color: pink;
`;

export function FrontendSharedUi(props: FrontendSharedUiProps) {
  return (
    <StyledFrontendSharedUi>
      <h1>Welcome to FrontendSharedUi!</h1>
    </StyledFrontendSharedUi>
  );
}

export default FrontendSharedUi;
