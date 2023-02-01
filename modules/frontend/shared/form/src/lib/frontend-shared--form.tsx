import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendSharedFormProps {}

const StyledFrontendSharedForm = styled.div`
  color: pink;
`;

export function FrontendSharedForm(props: FrontendSharedFormProps) {
  return (
    <StyledFrontendSharedForm>
      <h1>Welcome to FrontendSharedForm!</h1>
    </StyledFrontendSharedForm>
  );
}

export default FrontendSharedForm;
