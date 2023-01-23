import styled from 'styled-components';

/* eslint-disable-next-line */
export interface AuthenticationProps {}

const StyledAuthentication = styled.div`
  color: pink;
`;

export function Authentication(props: AuthenticationProps) {
  return (
    <StyledAuthentication>
      <h1>Welcome to Authentication!</h1>
    </StyledAuthentication>
  );
}

export default Authentication;
