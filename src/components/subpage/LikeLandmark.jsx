import { useEffect, useState } from "react";
import { fetchLikeCountLandmark, fetchToggleLikeLandmark } from "../../api/lanmarkLike/LandmarkLike";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import styled from "styled-components";


const HeartContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
`;

function LikeLandmark({landmark, userId}) {
  const [likeCount, setLikeCount] = useState(0);
  const [likeTrue, setLikeTrue] = useState(false);

  // 좋아요갯수보기
  useEffect(() => {
    fetchLikeCountLandmark(landmark.landmarkNo)
      .then(data => {
        setLikeCount(data);
        console.log('좋아요갯수데이터:' + data);
      })
      .catch(error => console.log('좋아요갯수에러 ' + error));
  }, []);

  // 좋아요 등록
  const handleLikeToggle = async () => {
    try {
      await fetchToggleLikeLandmark(landmark.landmarkNo, userId);
      fetchLikeCountLandmark(landmark.landmarkNo)
        .then((data) => {
          setLikeCount(data);
          setLikeTrue(data > 0);
        })
        .catch(error => console.error('좋아요갯수에러' + error));
    } catch (error) {
      console.error('좋아요토글버튼에러' + error);
    }
  };

  return (
    <HeartContainer onClick={handleLikeToggle}>
      {likeTrue ? <IoMdHeart /> : <IoIosHeartEmpty />}
      {likeCount}
    </HeartContainer>
  );
};

export default LikeLandmark;