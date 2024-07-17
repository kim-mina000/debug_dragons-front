import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteComment, fetchLandmarkComment, registerLandmarkComment } from '../../api/landmarkComment/landmarkComment';
import { useParams } from 'react-router-dom';


const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const CommentText = styled.div`
  flex: 1;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


const Comments = ({landmark}) => {
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');

  // 댓글목록보기
  useEffect(() => {
    fetchLandmarkComment(landmark.landmarkNo)
      .then(data => {
        setComments(data);
        console.log('랜드마크NO:' + landmark.landmarkNo);  //랜드마크게시판정보
      })
      .catch(error => console.error(error));
  }, []);
  // 배열안에 landmarkNo 렌더링될떄마다 실행하는기 (?)


  // 폼 데이터를 비동기적으로 처리하여 페이지 새로고침 없이 서버와 통신하는 방법을 사용
  const handleCommentSubmit = async (e) => {
    e.preventDefault();


    // 댓글 등록 함수
    const newComment = {
      "landmarkNo": landmark.landmarkNo,
      "landmarkCommentContent": newCommentContent
    };

    try {
      await registerLandmarkComment(newComment);
      fetchLandmarkComment(landmark.landmarkNo)
        .then(data => setComments(data))
        .catch(error => console.error(error));
      setNewCommentContent('');
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제 함수
  const handleDeleteComment = async (commentNo) => {
    try {
      await deleteComment(commentNo);
      fetchLandmarkComment(landmark.landmarkNo)
        .then(data => setComments(data))
        .catch(error => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>댓글</h2>
      <CommentList>
        {comments && comments.map(comment => (
          <CommentItem key={comment.landmarkCommentNo}>
            {comment.landmarkCommentContent} <p>작성자: </p> {comment.writer}
            <Button onClick={() => handleDeleteComment(comment.landmarkCommentNo)}>삭제</Button>
          </CommentItem>
        ))}
      </CommentList>
      <form onSubmit={handleCommentSubmit}> {/* 폼 제출 시 handleCommentSubmit 함수 호출 */}
        <InputContainer>
          <Input
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <Button type="primary" htmlType="submit">등록</Button>
          {/* type="submit"으로 설정하여 폼 제출 */}
        </InputContainer>
      </form>
    </Container >
  );
};

export default Comments;
