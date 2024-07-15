import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { fetchLikeCountLandmark, fetchToggleLikeLandmark } from "./LandmarkLike";

function LikeTest() {
  const [likeCount, setLikeCount] = useState(0);
  const [likeTrue, setLikeTrue] = useState(false);

  const { landmarkNo, userId } = useParams();  // useParams를 사용하여 URL 파라미터를 가져오기

  useEffect(() => {
    fetchToggleLikeLandmark(landmarkNo)
      .then(data => {
        setLikeCount(data);
        setLikeTrue(data > 0);  //  좋아요 갯수가 0보다 크면 이미 좋아요 상태
      })
      .catch(error => console.error('좋아요갯수조회에러' + error));
  }, [landmarkNo]);   // 컴포넌트가 마운트되거나 landmarkNo가 변경될 때 좋아요 갯수를 조회

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