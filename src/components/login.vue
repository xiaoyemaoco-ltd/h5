<template>
    <div id="content">
        <Header :title="title"></Header>
        <!--<van-row type="flex" justify="center" class="img">
            <van-col span="22"><img src="../assets/logo.png" /></van-col>
        </van-row>-->


        <van-row type="flex" justify="center" class="line">
            <van-col span="18">
                <van-cell-group class="username">
                    <van-field label="+7" class="border" v-model="mobile" placeholder="введите номер телефона" type="text" left-icon="manager"/>
                </van-cell-group>

                <van-cell-group class="username" v-show="show">
                  <van-field class="border" v-model="password" placeholder="введите пароль"  type="password"  left-icon="lock"/>
                </van-cell-group>

                <van-cell-group class="username" v-show="show1">
                  <van-field class="border" v-model="code" placeholder="код проверки ввода"  type="number"  left-icon="eye"/>
                </van-cell-group>

                <van-button v-show="codebtn" id="minibnt" @click="getcode" round type="danger" size="mini">получение кода проверки</van-button>

                <van-count-down :time="time" @finish="finish" v-show="show2" :auto-start="false" ref="countDown">
                    <template #default="timeData">
                        <span class="block">{{timeData.seconds}}</span>
                    </template>
                </van-count-down>

            </van-col>
        </van-row>
        <div class="text">
            <p class="code" @click="codesign" v-show="codetext">использовать код проверки</p>
            <p class="code" @click="pwdsign" v-show="pwdtext">Пароль логин</p>
            <p>забыть пароль</p>
        </div>

        <van-row type="flex" justify="center" class="btns">
            <van-col span="18">
                <van-button class="jumpBtn" @click="sign" type="primary" size="large">вход</van-button>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" class="reg">
            <van-col span="18">
                <van-button class="jumpBtn" @click="register" type="primary" size="large">регистрация</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "login",
        data() {
            return {
                mobile: '',
                password: '',
                code: '',
                title: 'вход',
                show: true,
                show1: false,
                show2: false,
                codebtn: false,
                codetext: true,
                pwdtext: false,
                time: 60 * 1000,
                timeData: {},
            }
        },
        components: {
          Header
        },
        methods: {
            sign() {
                /*if (this.mobile == '' || !(/^\d{1}\d{9}$/.test(this.mobile))) {
                    this.$toast.fail('Ошибка номера телефона');
                    return
                }*/
                if (this.password == '' && this.code == '') {
                    this.$toast.fail('Пожалуйста, введите пароль или проверочный код');
                    return
                }
                this.$axios.post('api/user/sign', {
                    mobile: this.mobile,
                    password: this.password,
                    verifycode: this.code,
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        let objstr = JSON.stringify(e.data.data)
                        localStorage.setItem('userinfo', objstr)
                        // sessionStorage.setItem('userinfo', objstr)
                        this.$toast({
                            type: 'success',
                            message: 'Авторизация успешна',
                            onClose: () => {
                                // this.$router.push('/home')
                                this.$router.go(-1)
                            }
                        })
                    } else if (e.data.statuscode == 400) {
                        this.$toast({
                            type: 'fail',
                            message: e.data.message,
                            onClose: () => {
                                this.$router.push('/register')
                            }
                        })
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })
            },
            register() {
                this.$router.push('./register')
            },
            //獲取驗證碼
            getcode () {
                /*if (this.mobile == '' || !(/^\d{1}\d{9}$/.test(this.mobile))) {
                    this.$toast.fail('Ошибка номера телефона');
                    return
                }*/

                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/v1/Sendsms', {
                    mobile: this.mobile,
                    snum: 'tt7d3tyr',
                    fn: 'mobileverify',
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                            onClose: () => {
                                this.codebtn = false
                                this.show2 = true
                                this.$refs.countDown.start();
                            }
                        })
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })
            },
            //驗證碼登錄
            codesign () {
                this.show = false
                this.show1 = true
                this.codetext = false
                this.pwdtext = true
                this.codebtn = true
            },
            //密碼登錄
            pwdsign () {
                this.show = true
                this.show1 = false
                this.codetext = true
                this.pwdtext = false
                this.codebtn = false
                this.show2 = false
            },
            //倒計時函數
            finish () {
                this.codebtn = true
                this.show2 = false
                this.$refs.countDown.reset();
            },
            reset() {
                this.$refs.countDown.reset();
            },
        }
    }
</script>

<style scoped>
    .van-count-down {
        background-color: #ff362c;
        width: 100%;
        height: 64px;
        border-radius: 32px;
    }
    .border >>> .van-field__label {
        width: 40px;
        margin-right: 10px;
    }
    .van-count-down span {
        font-size: 28px;
        color: #fff;
        line-height: 64px;
    }
    #header h1 {
        height: 100%;
        margin: unset;
        text-align: center;
        color: #fff;
        line-height: 150px;
    }
    .line {
      margin-top: 30px;
    }
    .username {
        margin-bottom: 50px;
        border: unset;
    }
    .btns {
        margin-top: 100px;
    }
    .jumpBtn {
        background-color: #ff362c;
        border: unset;
    }
    [class*=van-hairline]::after {
      border: unset;
    }
    .border {
      border-top: unset;
      border-bottom: 1px #ccc solid;
    }
    .reg {
        margin-top: 30px;
    }
    .reg .jumpBtn {
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
        border: unset;
    }
    #minibnt {
       width: 100%;
       height: 65px;
       font-size: 28px;
        background-color: #ff362c;
    }
    .text p{
        width: 100%;
        height: 40px;
        font-size: 32px;
        color: #ee2325;
        text-align: center;
    }
    .text .code {
        border-bottom: 1px #eee solid;
        padding-bottom: 20px;
    }
    .text {
      width: 60%;
      margin: 0 auto;
    }
</style>