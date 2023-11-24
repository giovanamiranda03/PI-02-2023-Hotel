import styled from 'styled-components';
import loginImage from '../assets/loginImage.svg';

const MainContainer = styled.div`
  width: 50%;
  position: relative;
  background-color: #4a5568;
`;

const FlexContainer = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: start;
  align-items: start;
  gap: 2.5rem;
`;

const SidePanel = styled.div`
  width: 50%;
  background-color: #4a5568; 
`;

const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  left: 104px;
  top: 131px;
  gap: 53px;
`;

const Image = styled.img`
  width: 170px;
  height: 167px;
  position: absolute;
  top: 0;
  left: 0;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 42px; 
`;

const Text = styled.div`
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: bold;
`;

const SubText = styled(Text)`
  width: 479px;
  opacity: 0.75;
  font-size: 1rem;
`;

const InputContainer = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
`;

const InputBox = styled.div`
  width: 454px;
  height: 53px;
  position: relative;
  background-color: #1a202c; 
`;

const Input = styled.input`
  width: 454px;
  height: 53px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #374151;
  border-radius: 8px;
  border: 1px solid #a0aec0; 
`;

const Placeholder = styled.div`
  position: absolute;
  left: 18.16px;
  top: 15.98px;
  color: #718096;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
`;

const ButtonContainer = styled.button`
  width: 454px;
  height: 53px;
  position: relative;
  background-color: #F5D156;
  border-radius: 8px;
  color: #1a202c;
`;

export default function Login() {
  return (
    <MainContainer>
      <FlexContainer style={{ left: '-13px', top: '0' }}>
        <SidePanel />
        <ContentContainer>
          <FlexColumn style={{ height: '328px', gap: '42px' }}>
            <div>
              <Image src={loginImage} alt="Imagem" />
            </div>
            <FlexColumn style={{ gap: '3.5rem' }}>
              <Text>Bem vindo ao ALVERG!</Text>
              <SubText>Lorem ipsum dolor sit amet...</SubText>
            </FlexColumn>
          </FlexColumn>
          <FlexColumn style={{ gap: '72px' }}>
            <InputContainer>
              <Text style={{ fontSize: '1.25rem' }}>Email</Text>
              <InputBox>
                <Input />
                <Placeholder>Insira seu email</Placeholder>
              </InputBox>
            </InputContainer>
            <InputContainer>
              <Text style={{ fontSize: '1.25rem' }}>Senha</Text>
              <InputBox>
                <Input />
                <Placeholder>Insira sua senha</Placeholder>
              </InputBox>
            </InputContainer>
            <ButtonContainer>
              Entrar
            </ButtonContainer>
          </FlexColumn>
        </ContentContainer>
      </FlexContainer>

    </MainContainer>
  );
}

