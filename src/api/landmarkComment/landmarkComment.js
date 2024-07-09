import axios from "axios";
import { BACK_URL } from "../config";




// 댓글목록 가져오기
export const fetchLandmarkComment = async(landmarkNo) =>{
  try {
    const response = await axios.get(`${BACK_URL}/landmarkComment/list?landmarkNo=${landmarkNo}`);
    return response.data;
  } catch (error) {
    console.error(error);
  };
};

// 댓글등록
export const registerLandmarkComment = async(newComment) =>{
  try {
    const response = await axios.post(`${BACK_URL}/landmarkComment/register`, newComment);
    // return response.data;
    // 댓글등록(post시는 리턴 데이터 할필요 없었나나요?)
  } catch (error) {
    console.log(error);
  }
};

// 댓글삭제
export const deleteComment = async (commentNo) => {
  try {
    const response = await axios.delete(`${BACK_URL}/landmarkComment/remove?landmarkcommentNo=${commentNo}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 임시로.. 댓글컴포넌트로 이사보내기, 아직 postman 확인못함

// const LandmarkComment = () => {
//   const [landmarkNo, setLandmarkNo] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     fetchComments(landmarkNo)
//       .then(data => setComments(data))
//       .catch(error => console.error('Error fetching comments:', error));
//   }, [landmarkNo]);

// const handleCommentSubmit = async () => {
//   try {
//     await submitComment({
//       content: newComment,
//       landmarkNo: landmarkNo,
//     });
//     fetchComments(landmarkNo)
//       .then(data => setComments(data))
//       .catch(error => console.error('Error fetching comments:', error));
//     setNewComment('');
//   } catch (error) {
//     console.error('Error submitting comment:', error);
//   }
// };

// const handleCommentDelete = async (commentNo) => {
//   try {
//     await deleteComment(commentNo);
//     fetchComments(landmarkNo)
//       .then(data => setComments(data))
//       .catch(error => console.error('Error fetching comments:', error));
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//   }
// };

// return (
//   <div>
//     <input
//       type="number"
//       value={landmarkNo}
//       onChange={(e) => setLandmarkNo(Number(e.target.value))}
//       placeholder="Enter landmark number"
//     />
//     <br />
//     <input
//       type="text"
//       value={newComment}
//       onChange={(e) => setNewComment(e.target.value)}
//       placeholder="Write a comment"
//     />
//     <button onClick={handleCommentSubmit}>Submit</button>
//     <br />
//     <ul>
//       {comments.map((comment) => (
//         <li key={comment.commentNo}>
//           {comment.content} by {comment.writer}
//           <button onClick={() => handleCommentDelete(comment.commentNo)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// };