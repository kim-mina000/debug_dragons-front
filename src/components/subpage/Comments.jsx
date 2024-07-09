import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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

const EditInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // 댓글 추가 함수
  const addComment = () => {
    if (commentText.trim() !== '') {
      setComments([...comments, { id: uuidv4(), text: commentText }]);
      setCommentText('');
    }
  };

  // 댓글 삭제 함수
  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  // 댓글 수정 함수
  const startEditComment = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEditComment = (id) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, text: editText } : comment));
    setEditId(null);
    setEditText('');
  };

  return (
    <Container>
      <h2>댓글</h2>
      <CommentList>
        {comments.map(comment => (
          <CommentItem key={comment.id}>
            {editId === comment.id ? (
              <>
                <EditInput
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <Button onClick={() => saveEditComment(comment.id)}>저장</Button>
              </>
            ) : (
              <>
                <CommentText>{comment.text}</CommentText>
                <Button onClick={() => startEditComment(comment.id, comment.text)}>수정</Button>
                <Button onClick={() => deleteComment(comment.id)}>삭제</Button>
              </>
            )}
          </CommentItem>
        ))}
      </CommentList>
      <InputContainer>
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <Button onClick={addComment}>게시</Button>
      </InputContainer>
    </Container>
  );
};

export default Comments;
