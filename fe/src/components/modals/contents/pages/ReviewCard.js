import axios from 'axios';
import { useEffect, useState } from 'react';
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Update from './Update';

const ReviewCard = ({review, getReviewData, accessType, setCreateAuth}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [doYouLike, setDoYouLike] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    // console.log("11",review.likeUsers.includes(cookies.userData.shortId))
    if(cookies.userData){
      setDoYouLike(review.likeUsers.includes(cookies.userData.shortId))
    }
  },[])

  const onClickDeleteBtn = ()=>{
    if(window.confirm("삭제 하시겠습니까?")){
      deleteReview().then(res=>{
        // alert(res.data.result)
        getReviewData(review.movieId)
        setCreateAuth(true)
      }).catch(err=>{
        console.log(err)
      })
    }
  }

  const deleteReview = async () => {
    return await axios.post(process.env.REACT_APP_SERVER_URL + '/review/delete', {
      shortId: cookies.userData.shortId,
      movieId: review.movieId
    })
  }

  const onClickLike = ()=> {
    if(!cookies.userData){
      // alert("로그인이 필요합니다");
      navigate('/login')
      return;
    }
    axios.post(process.env.REACT_APP_SERVER_URL + "/like", {
      shortId: cookies.userData.shortId,
      reviewId: review.reviewId
    }).then(res=>{
      // console.log(res.data.like)
      getReviewData(review.movieId)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <>
      {
        updateIsOpen ? ( // 업데이트?
          <>
            <Update updateIsOpen={updateIsOpen} setUpdateIsOpen={setUpdateIsOpen} reviewId={review.reviewId} getReviewData={getReviewData} movieId={review.movieId} />
          </>
        ) : (
        <>
          <div className="review-card">
            <div className="review-content">
              <h1 className='white-big-font center'>{review.title}</h1>
              <div className='right'>
                <span className='grey-small-font m-3'>{review.star}</span>
                <span className="star">
                  ★★★★★
                  <span style={{width: `${Number(review.star) * 10 * 2}%`}}>
                    ★★★★★
                  </span>
                </span>
              </div>
            </div>
            <div className="review-content">
              <p className='white-small-font mb-4'>
                {review.content}
              </p>
            </div>  
            <div className='review-content-last'>
              <div className='right nav-left-wrap'>
                {
                  accessType ? (
                    <>
                      {
                        doYouLike ? (
                          <>
                            <span className="material-symbols-outlined color-small-icons" onClick={()=>{
                              setDoYouLike(false)
                              onClickLike()
                            }}>
                              sentiment_satisfied
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined grey-small-icons" onClick={()=>{
                              setDoYouLike(true)
                              onClickLike()
                            }}>
                              sentiment_satisfied
                            </span>
                          </>
                        )
                      }
                      <span className='grey-small-font'>&nbsp;{review.likeCount}</span>
                    </>
                  ) : (<></>)
                }
              </div>

              <div className='nav-right-wrap'>
                <img id='profile-image-small' src={review.profileImg} />
                  <p className='grey-small-font set-inline'>
                    {review.author}
                  </p>

                  <span className='white-small-font time-box'>
                    {review.updatedAt}
                  </span>
                  { // 로그인이 되어있고 && 내가 작성한 글 && 모달에서 접근 ??
                    cookies.userData 
                      && cookies.userData.shortId == review.shortId
                      && accessType ? (
                      <>
                        <button type="button" className="button grey-button-small" onClick={()=>{setUpdateIsOpen(true)}}>
                          UPDATE
                        </button>
                        <button type="button" className="button grey-button-small" onClick={()=>{onClickDeleteBtn()}}>
                          DELETE
                        </button>
                      </>
                    ) : (<></>)
                  }
                
              </div>
                
            </div>
          </div>

        </>
      )
    }
    
    
    </>
    
  )
}

export default ReviewCard;