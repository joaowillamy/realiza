import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FrontendSharedUiFormProps {}

const StyledFrontendSharedUiForm = styled.div`
  color: pink;
`;

export function FrontendSharedUiForm(props: FrontendSharedUiFormProps) {
  return (
    <StyledFrontendSharedUiForm>
      <h1>Welcome to FrontendSharedUiForm!</h1>
    </StyledFrontendSharedUiForm>
  );
}

export default FrontendSharedUiForm;
