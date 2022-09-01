import { useEffect, useState } from "react";
import ReactWordcloud from 'react-wordcloud';


const ReviewWordCloud = ({myContent})=>{
  const [words, setWords] = useState([]);

  let tempArr = []

  useEffect(()=>{
    myContent.split(" ").map((sentence)=>{
      tempArr.push({
        text: sentence,
        value: Math.floor(Math.random() * 500)
      })
    })
    setWords(tempArr)
  },[])

  return (
    <>
      <ReactWordcloud words={words} />
    </>
  )
}

export default ReviewWordCloud;