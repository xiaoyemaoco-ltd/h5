<template>
    <div id="content">
        <Header :title="title"></Header>
        <!--<van-row type="flex" justify="center" class="img">
            <van-col span="22"><img src="../assets/logo.png" /></van-col>
        </van-row>-->


        <van-row type="flex" justify="center" class="line">
            <van-col span="18">
                <van-cell-group class="username">
                    <van-field class="border" v-model="mobile" placeholder="введите номер телефона" type="text" left-icon="manager"/>
                </van-cell-group>
                <van-cell-group class="username">
                  <van-field class="border" v-model="password" placeholder="введите пароль"  type="password"  left-icon="lock"/>
                </van-cell-group>
                <!--<van-cell-group class="username">
                  <van-field class="border" placeholder="код проверки ввода"  type="number"  left-icon="eye"/>
                </van-cell-group>-->
                <!--<van-button id="minibnt" round type="danger" size="mini">получение кода проверки</van-button>-->
            </van-col>
        </van-row>
        <div class="text">
            <p class="code">использовать код проверки</p>
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
                title: 'вход'
            }
        },
        components: {
          Header
        },
        methods: {
            sign() {
                /*if (this.mobile == '' || !(/^7\d{9}$/.test(this.mobile))) {
                    this.$toast.fail('Ошибка номера телефона');
                    return
                }*/
                if (this.password == '') {
                    this.$toast.fail('введите пароль');
                    return
                }
                this.$axios.post('api/login/sign', {
                    mobile: this.mobile,
                    password: this.password
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        let objstr = JSON.stringify(e.data.data)
                        sessionStorage.setItem('userinfo', objstr)
                        this.$toast({
                            type: 'success',
                            message: 'Авторизация успешна',
                            onClose: () => {
                                // this.$router.push('/home')
                                this.$router.go(-1)
                            }
                        })
                    }
                })
            },
            register() {
                this.$router.push('./register')
            }
        }
    }
</script>

<style scoped>
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
        background-color: #ee2325;
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