<template>
  <div id="login">
    <div class="loginBox">
      <div class="totalBox">
        <div class="infoBox">
          <img
            src="@/assets/login/logo.png"
            class="logIcon"
          >
          <div class="loginInfo">
            <img
              src="@/assets/login/infoBack.png"
              class="loginInfoIcon"
            >
            <div class="userInfo">
              <div class="pageTitle">
                业务管理平台
              </div>
              <ul class="userBox">
                <li class="userList">
                  <img
                    src="@/assets/login/user.png"
                    class="userIcon"
                    style="width: 16px;height: 18px;margin-right: 15px;"
                  >
                  <input
                    type="text"
                    class="infoInput"
                    v-model="userInfo.loginName"
                    placeholder="请输入用户名"
                  >
                </li>
                <li class="userList">
                  <img
                    src="@/assets/login/pwd.png"
                    class="userIcon"
                    style="width: 18px;height: 20px;margin-right: 14px;"
                  >
                  <input
                    :type="ptype"
                    class="infoInput"
                    v-model="userInfo.pwd"
                    placeholder="请输入密码"
                  >
                  <i
                    class="el-icon-view viewIcon"
                    @click="setView"
                    :class="{showView:ptype=='text'}"
                  />
                </li>
                <li class="userList">
                  <img
                    src="@/assets/login/validate.png"
                    class="userIcon"
                    style="width: 24px;height: 26px;margin-right: 11px;"
                  >
                  <input
                    type="text"
                    class="infoInput validataInput"
                    v-model="userInfo.code"
                    placeholder="请输入验证码"
                  >
                  <div
                    style="width: 110px;height: 32px;"
                    @click="changeIdentifying"
                  >
                    <img
                      class="identifyingImg"
                      :src="codeUrl"
                      alt=""
                    >
                  </div>
                </li>
              </ul>
              <div class="rememberPwdBox">
                <el-checkbox v-model="rememberPwd">
                  记住密码
                </el-checkbox>
              </div>
              <button
                class="submitBtn"
                @click="submit"
              >
                登录
              </button>
              <div class="loginTip">
                为保证更好地用户体验建议使用谷歌、火狐、360极速浏览器！
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      uuid: '',
      userInfo: {},
      codeUrl: '',
      ptype: 'password',
      rememberPwd: true,
      interval: null,
      url:null,//从上个路由跳转过来的url地址,用于登录失效重新跳转回去
    }
  },
  created () {
    this.setUuids()
    this.currentStatus()
    this.rememberPwd = !!localStorage.getItem('rememberPwd')
    this.userInfo.loginName = localStorage.getItem('rememberPwd')
      ? localStorage.getItem('loginName')
      : ''
    this.userInfo.pwd = localStorage.getItem('rememberPwd')
      ? localStorage.getItem('pwd')
      : ''
  },
  methods: {
    currentStatus () {
      this.$http.post('/login/currentUser').then(result => {
        if (result == null) {

        } else {
          if (!result.permission && result.is_admin != 1) return
          // $_cache.init(result)
          // location.href = "main.html"
          this.$store.commit('cacheInit',result)
          this.$router.replace('/')
        }
      })
    },
    setUuids () {
      const str = '1234567890qwertyuiopasdfghjklzxcvbnm-'
      let uuid = ''
      for (let i = 0; i < 32; i++) {
        const data = Math.floor(Math.random() * str.length)
        uuid += str[data]
      }
      this.uuid = uuid
    },
    submit () {
      if (!this.userInfo.loginName) { return this.$message.warning('请输入用户名') }
      if (!this.userInfo.pwd) return this.$message.warning('请输入密码')
      // if (!this.userInfo.code) return this.$message.warning('请输入验证码')
      this.url?this.$router.replace(this.url):this.$router.replace('/')
      // this.userInfo.uuid = this.uuid
      // this.$http.get('/login/login', this.userInfo).then(result => {
      //   // console.log(result)
      //   if (result.data) {
      //     result=result.data
      //     if (!result.permission) {
      //       this.$message.warning('此账号无登录权限')
      //       return
      //     }
      //     clearInterval(this.interval)
      //     // 设置记住密码
      //     if (this.rememberPwd) {
      //       localStorage.setItem('loginName', this.userInfo.loginName)
      //       localStorage.setItem('pwd', this.userInfo.pwd)
      //       localStorage.setItem('rememberPwd', this.rememberPwd)
      //     } else {
      //       localStorage.removeItem('loginName')
      //       localStorage.removeItem('pwd')
      //       localStorage.removeItem('rememberPwd')
      //     }
      //     localStorage.setItem('rmt_token', result.token)
      //     this.$store.commit("cacheInit",result)
      //     localStorage.setItem("cache",JSON.stringify(this.$store.state.cache))
      //     localStorage.setItem('pmsCode', JSON.stringify(result.permission.split(';')))
      //     console.log(this.url)
      //     this.url?this.$router.replace(this.url):this.$router.replace('/')
      //     // $_cache.init(result)
      //     // location.href = "main.html"
      //   }else{
      //     this.$message.error(result.errorMsg)
      //   }
      // }).catch(err=>{
      //   console.log(err)
      // })
    },
    changeIdentifying () {
      const timestamp = new Date().getTime()
      this.codeUrl = `${this.$store.state.WEB_PATH}/login/rendomCode?uuid=${this.uuid}&timestamp=${timestamp}`
    },
    setView () {
      this.ptype = this.ptype === 'password' ? 'text' : 'password'
    }
  },
  mounted () {
    this.url=this.$route.query.url
    console.log(this.url,this.$route.query)
    this.changeIdentifying()
    this.interval = setInterval(() => {
      this.changeIdentifying()
    }, 60000)
    document.onkeydown = function (event) {
      if (event.keyCode === 13) {
        this.submit()
      }
    }.bind(this)
  }
}
</script>

<style scoped="scoped">
#login{
  height: 100%;
}
.loginBox {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 680px;
  background-image: url("../assets/login/loginBack.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}

.totalBox {
  width: 980px;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}

.infoBox {
  width: 100%;
  height: 620px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(23, 68, 168, 0.3);
  border-radius: 5px;
  padding: 10px;
  padding-top: 20px;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.logIcon {
  width: 126px;
  height: 40px;
  margin-left: 10px;
}

.loginInfo {
  margin-top: 30px;
  height: calc(100% - 70px);
  width: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.loginInfoIcon {
  width: 541px;
}

.userInfo {
  height: 100%;
  width: 419px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: flex-start;
  -webkit-align-items: flex-start;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
}

.pageTitle {
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(30, 80, 162, 1);
  text-align: center;
  width: 100%;
}

.userBox {
  width: 300px;
  margin: 0 auto;
  margin-top: 18px;
}

.userList {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
  padding: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  margin-top: 15px;
}

.infoInput {
  width: 100%;
  font-size: 16px;
  height: 34px;
  color: #141414;
  outline: none;
  border: none;
}

.validataInput {
  width: calc(100% - 110px);
}

.identifyingImg {
  width: 100%;
  height: 32px;
  cursor: pointer;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.submitBtn {
  width: 300px;
  height: 40px;
  background: rgba(30, 104, 226, 1);
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 25px;
  cursor: pointer;
}

.loginTip {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(146, 146, 146, 1);
  line-height: 20px;
  margin-top: 20px;
}

input::placeholder {
  color: #a9a9a9;
  font-size: 16px;
}

.viewIcon {
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
}

.showView {
  color: rgba(30, 104, 226, 1);
  font-weight: bold;
}

.rememberPwdBox {
  width: 300px;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
}

.rememberPwdBox > input {
  display: block;
  outline: none;
  cursor: pointer;
  margin-top: 1px;
  margin-right: 5px;
}

.rememberPwdBox > label {
  font-size: 14px;
  color: #a9a9a9;
  line-height: 1;
  cursor: pointer;
}
</style>
