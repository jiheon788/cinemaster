import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';



const StarHist = ()=>{
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [myDist, setMyDist] = useState({});
  const [myAver, setMyaver] = useState("");
  const [myFeq, setMyFeq] = useState("");
  const [myMov, setMyMov] = useState("");
  const [myType, setMyType] = useState("");

  useEffect(()=>{
    getStarDist().then(res=>{
      setMyaver(res.data.result.aver)
      setMyFeq(res.data.result.feq)
      setMyDist(res.data.result.cnt)
      // console.log(res.data.result)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  let sum=0;

  useEffect(()=>{
    for (let [key, value] of Object.entries(myDist)){
      sum += value
    }
    setMyMov(sum)
  },[myDist])

  const getStarDist = async () => {
    return await axios.get(
      process.env.REACT_APP_SERVER_URL + "/report/dist/" + cookies.userData.shortId
    );
  };

  const data = {
    labels: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
    datasets: [
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgba(255, 99, 132 ,.8)', 
        data: [myDist["0"],myDist["0.5"],myDist["1"],myDist["1.5"],myDist["2"],myDist["2.5"],myDist["3"],myDist["3.5"],myDist["4"],myDist["4.5"],myDist["5"]],
        borderColor: 'red',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
          display: false,
      }
    }
  }

  useEffect(()=>{
    if(myAver > 4.7){
      setMyType("5점 뿌리는 '부처님급' 아량의 소유자")
    } else if(myAver > 4.4){
      setMyType("영화면 마냥 다 좋은 '천사급' 착한 사람♥")
    }else if(myAver > 4.0){
      setMyType("남들보다 별점을 조금 후하게 주는 '인심파'")
    }else if(myAver > 3.9){
      setMyType("영화를 정말로 즐길 줄 아는 '현명파'")
    }else if(myAver > 3.8){
      setMyType("편식 없이 영화를 골고루 보는 '균형파'")
    }else if(myAver > 3.7){
      setMyType("대중의 평가에 잘 휘둘리지 않는 '지조파'")
    }else if(myAver > 3.6){
      setMyType("영화 평가에 있어 주관이 뚜렷한 '소나무파'")
    }else if(myAver > 3.4){
      setMyType("대체로 영화를 즐기지만 때론 혹평도 마다치 않는 '이성파' ")
    }else if(myAver > 3.3){
      setMyType("영화 평가에 상대적으로 깐깐한 '깐새우파'")
    }else if(myAver > 3.1){
      setMyType("영화를 남들보다 진지하고 비판적으로 보는 '지성파'")
    }else if(myAver > 2.9){
      setMyType("영화를 대단히 냉정하게 평가하는 '냉장고파'")
    }else if(myAver > 2.5){
      setMyType("웬만해서는 호평을 하지 않는 매서운 '독수리파'")
    }else if(myAver > 2.3){
      setMyType("별점을 대단히 짜게 주는 한줌의 '소금' 같은 분 :) ")
    }else if(myAver > 1.9){
      setMyType("웬만해선 영화에 만족하지 않는 '헝그리파' ")
    } else {
      setMyType("세상 영화들에 불만이 많으신 '개혁파' ")
    }
  },[myAver])

  return (
    <>
      <p className="color-middle-font mb-3">{myType}</p>
      <Bar type="bar" data={data} options={options} />
      <div className="flex-box p-5">
        <div className="score-report">
          <p className="white-middle-font mb-1">별점 평균</p>
          <p className="grey-middle-font">{myAver}</p>
        </div>

        <div className="score-report">
          <p className="white-middle-font mb-1">별점 준 갯수</p>
          <p className="grey-middle-font">{myMov}</p>
        </div>
        
        <div className="score-report">
          <p className="white-middle-font mb-1">많이 준 별점</p>
          <p className="grey-middle-font">{myFeq}</p>
        </div>
      </div>
      
    </>
  )

}

export default StarHist;