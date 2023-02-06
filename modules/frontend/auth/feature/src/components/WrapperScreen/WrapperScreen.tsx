import * as S from './styled'

export interface WrapperScreenProps  {
  children?: React.ReactNode;
}

export const WrapperScreen = ({ children }: WrapperScreenProps) => {
  return (
    <S.Wrapper>
      {children}
    </S.Wrapper>
  );
}

export default WrapperScreen;
