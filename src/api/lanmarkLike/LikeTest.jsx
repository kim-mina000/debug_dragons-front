import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { fetchLikeCountLandmark, fetchToggleLikeLandmark } from "./LandmarkLike";

function LikeTest() {
  const [likeCount, setLikeCount] = useState(0);
  const [likeTrue, setLikeTrue] = useState(false);

  const { landmarkNo, userId } = useParams();  // useParams를 사용하여 URL 파라미터를 가져오기

  // 좋아요갯수보기
  useEffect(() => {
    fetchLikeCountLandmark(landmarkNo)
      .then(data => {
        setLikeCount(data);
        console.log('좋아요갯수데이터:' + data);
      })
      .catch(error => console.log('좋아요갯수에러 ' + error));
  }, [landmarkNo]);

  // 좋아요 등록
  const handleLikeToggle = async () => {
    try {
      await fetchToggleLikeLandmark(landmarkNo, userId);
      fetchLikeCountLandmark(landmarkNo)
        .then((data) => {
          setLikeCount(data);
          setLikeTrue(data > 0);
        })
        .catch(error => console.error('좋아요갯수에러' + error));
    } catch (error) {
      console.error('좋아요토글버튼에러' + error);
    }
  };

  const buttonText = likeTrue ? '칠해진하트' : '빈하트';

  return (
    <>
      <button onClick={handleLikeToggle}>{buttonText}</button>
      <p>좋아요갯수: {likeCount}</p>
    </>
  );
};

export default LikeTest;