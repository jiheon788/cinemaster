import { useCookies } from "react-cookie";
import axios from "axios";
import $ from "jquery";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [modifyUserData, setModifyUserData] = useState({
    name: "",
    password: "",
    rePassword: "",
    type: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (cookies.userData) {
      getUserInfo()
        .then((res) => {
          setModifyUserData({
            ...modifyUserData,
            name: res.data.name,
            type: res.data.type,
          });
          setProfileImage(res.data.profileImg);
        })
        .catch((err) => {
          console.log("유저 데이터 로드 오류", err);
        });
    }
  }, []);

  const getUserInfo = async () => {
    return await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${cookies.userData.shortId}`);
  };

  //----------------------------- 프로필 업로드 -----------------------------//
  const fileInput = useRef(null);

  const onChangeProfileImg = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      //업로드 취소할 시
      // setProfileImage(
      //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
      // );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  //------------------------------------------------------------------------//

  const onClickModifyButton = () => {
    if (modifyUserData.password === "") {
      // alert("패스워드를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (modifyUserData.rePassword === "") {
      // alert("확인 패스워드를 입력해주세요.");
      $("#rePassword").focus();
      return;
    }

    if (modifyUserData.name === "") {
      // alert("이름을 입력해주세요.");
      $("#name").focus();
      return;
    }

    if (modifyUserData.password !== modifyUserData.rePassword) {
      setModifyUserData({
        ...modifyUserData,
        password: "",
        rePassword: "",
      });
      setErrMsg("비밀번호와 확인 비밀번호가 같지 않습니다.");
      $("#password").focus();
      return;
    }

    ///////////// 프로필 이미지
    let formData = new FormData();
    const profileImg = $("#profile_input")[0].files[0];
    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };

    formData.append("shortId", cookies.userData.shortId);
    formData.append("file", profileImg);
    formData.append("name", modifyUserData.name);
    formData.append("password", modifyUserData.password);
    formData.append("type", modifyUserData.type);

    sendModifyUserData(formData, config)
      .then((res) => {
        // alert(res.data.result);
        navigate('/')
        window.location.reload(); // window는 실행하는 최고 객체 즉 브라우저. 브라우저를 새로 고침
      })
      .catch((e) => {
        setErrMsg(e.response.data.error);
      });
  };

  const sendModifyUserData = async (formData, config) => {
    // console.log("signUpdaata");
    return await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/update`, formData, config);
  };

  // 회원가입 data를 입력받는 함수
  const onChangeUserInfo = (event) => {
    setModifyUserData({
      ...modifyUserData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login-page">
      <div className="form">
        <img
          alt="User Picture"
          src={profileImage}
          // src={userInfo.profileImg}
          id="profile-image"
          onClick={() => {
            fileInput.current.click();
          }}
          height="240"
        />
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg,image/png,image/jpeg"
          name="profile_input"
          id="profile_input"
          onChange={onChangeProfileImg}
          ref={fileInput}
        />

        <input
          id="nameUp"
          name="name"
          type="text"
          placeholder="Name"
          value={modifyUserData.name}
          onChange={onChangeUserInfo}
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={modifyUserData.password}
          onChange={onChangeUserInfo}
        />
        <input
          id="rePassword"
          name="rePassword"
          type="password"
          placeholder="re-Password"
          value={modifyUserData.rePassword}
          onChange={onChangeUserInfo}
        />
        <p className="warning-text">{errMsg}</p>
        <button type="button" onClick={()=>onClickModifyButton()}>
          Modify
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
