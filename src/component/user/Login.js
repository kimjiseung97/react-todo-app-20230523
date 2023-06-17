import React from 'react'
import { Grid,Button,Container,Typography,TextField } from '@mui/material'

import {API_BASE_URL as BASE,USER} from '../../config/host.config'
import { useNavigate } from 'react-router-dom';
import { setLoginUserInfo , isLogin } from '../../util/login-util';
const Login = () => {

  const redirection = useNavigate();  
  const REQUESTURL  = BASE+USER + '/signin';
  
  if(isLogin()){
    alert('이미 로그인 중입니다');
    window.history.back();
    return;
  }
  //서버에 ajax요청
  const fetchLogin = async() =>{

     //이메일 비밀번호 입력태그 얻어오기
     const $email = document.getElementById('email');
     const $password = document.getElementById('password');
    
    const res = await fetch(REQUESTURL,{
      method : 'POST',
      headers : {'content-type':'application/json'},
      body : JSON.stringify({
        email : $email.value,
        password : $password.value
        
      })
    });
    if(res.status===400){ //가입이 안되어있거나 비번이 틀린경우
      const text = await res.text(); //서버에서 온 문자열 읽기
      alert(text);
      return;
    }

    const userInfo = await res.json(); //서버에서 온 json읽기
    //alert(json.userName);

    //json에 담긴 인증정보를 클라이언트에 보관
    //1. 로컬 스토리지 - 브라우저가 종료되어도 보관됌
    //2. 세션 스토리지 - 브라우저가 종료되면 사라짐
    setLoginUserInfo(userInfo);
    //홈으로 리다이렉트
    redirection('/');

  };

  // 로그인 요청 핸들러




  //로그인 요청 핸들러
  const loginHandler = e =>{
    e.preventDefault();


    //서버에 로그인요청 전송
    fetchLogin();

  };
  
  return (
    <Container component="main" maxWidth="xs" style={{ margin: "200px auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={loginHandler}>
                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
  )
}

export default Login