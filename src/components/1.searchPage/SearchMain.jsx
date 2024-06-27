import styled from "styled-components";

const Container = styled.div`
  width: 1200px;
  height: 800px;
`;

const LeftWrap = styled.div`
  width: 575px;
  height: 100%;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const MyCourseContainer = styled.div`
  width: 100%;
  height: 600px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 50px;
`;

function SearchMain() {
  return (
    <Container>
      <LeftWrap>
        <SearchContainer>

        </SearchContainer>
        <MyCourseContainer>
          
        </MyCourseContainer>
      </LeftWrap>
      <MapContainer></MapContainer>
    </Container>
  );
};

export default SearchMain;