<template>
    <div id="content">
        <Header :title="title"></Header>

        <van-row type="flex" justify="center" class="line">
            <!--<van-col span="3">&nbsp</van-col>-->
            <van-col span="18">
                <van-cell-group class="username">
                    <van-field label="+7" class="border" v-model="mobile" placeholder="введите номер телефона" type="text" left-icon="manager"/>
                </van-cell-group>
                <van-cell-group class="username">
                  <van-field class="border" v-model="code" placeholder="код проверки ввода"  type="text"  left-icon="eye"/>
                </van-cell-group>
                <van-button id="minibnt" v-show="show" round @click="getcode" type="danger" size="mini">получение кода проверки</van-button>

                <van-count-down :time="time" @finish="finish" v-show="show1" :auto-start="false" ref="countDown">
                    <template #default="timeData">
                        <span class="block">{{timeData.seconds}}</span>
                    </template>
                </van-count-down>

                <van-cell-group class="username">
                    <van-field class="border" v-model="password" placeholder="введите пароль"  type="password"  left-icon="lock"/>
                </van-cell-group>
                <van-cell-group class="username">
                    <van-field class="border" v-model="invitecode" placeholder="код приглашения друзей"  type="number"  left-icon="friends"/>
                </van-cell-group>
            </van-col>
            <!--<van-col span="3">&nbsp</van-col>-->
        </van-row>


        <van-row type="flex" justify="center" class="btns">
            <!--<van-col span="3">&nbsp</van-col>-->
            <van-col span="18">
                <van-button @click="register" class="jumpBtn" type="primary" size="large">регистрация</van-button>
            </van-col>
            <!--<van-col span="3">&nbsp</van-col>-->
        </van-row>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "register",
        data() {
            return {
                title: 'регистрация',
                mobile: '',
                code: '',
                password: '',
                invitecode: '',
                time: 60 * 1000,
                timeData: {},
                show: true,
                show1: false
            }
        },
        components: {
            Header
        },
        methods: {
            register () {
                if (this.mobile == '' || !(/^7\d{9}$/.test(this.mobile))) {
                    this.$toast.fail('Ошибка номера телефона');
                    return
                }

                if (this.code == '') {
                    this.$toast.fail('код подтверждения должен быть заполнен');
                    return
                }

                if (this.password == '') {
                    this.$toast.fail('пароль не может быть пустым');
                    return
                }

                if (this.invitecode == '') {
                    this.$toast.fail('Код приглашения не может быть пустым');
                    return
                }

                /*this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });*/

                this.$axios.post('api/user/Savereg', {
                    mobile: this.mobile,
                    password: this.password,
                    verifycode: this.code,
                    invite_code: this.invitecode
                }).then((e) => {
                    // this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                            onClose: () => {
                                this.$router.push('./login')
                            }
                        })
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })


            },
            //获取验证码
            getcode () {

                if (this.mobile == '' || !(/^7\d{9}$/.test(this.mobile))) {
                    this.$toast.fail('Ошибка номера телефона');
                    return
                }

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
                                this.show = false
                                this.show1 = true
                                this.$refs.countDown.start();
                            }
                        })
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })
            },
            finish () {
                this.show = true
                this.show1 = false
                this.$refs.countDown.reset();
            },
            reset() {
                this.$refs.countDown.reset();
            },
        }
    }
</script>

<style scoped>
    [class*=van-hairline]::after {
        border: unset;
    }
    .van-count-down {
        background-color: #ff362c;
        width: 100%;
        height: 64px;
        border-radius: 32px;
    }
    .van-count-down span {
        font-size: 28px;
        color: #fff;
        line-height: 64px;
    }
    .border >>> .van-field__label {
        width: 40px;
        margin-right: 10px;
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
        margin-bottom: 20px;
    }
    .btns {
        margin-top: 60px;
    }
    .jumpBtn {
        border: unset;
        background: linear-gradient(0deg, #FF862D 0%, #F71010 100%);
    }
    .border {
        border-bottom: 2px #ccc solid;
        /*border: 1px #1989fa solid;*/
    }
    #minibnt {
      width: 100%;
      height: 65px;
      font-size: 28px;
    }
</style>