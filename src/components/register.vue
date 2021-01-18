<template>
    <div id="content">
        <Header :title="title"></Header>


        <van-row type="flex" justify="center" class="line">
            <!--<van-col span="3">&nbsp</van-col>-->
            <van-col span="18">
                <van-cell-group class="username">
                    <van-field class="border" placeholder="введите номер телефона" type="text" left-icon="manager"/>
                </van-cell-group>
                <van-cell-group class="username">
                  <van-field class="border" placeholder="код проверки ввода"  type="text"  left-icon="eye"/>
                </van-cell-group>
                <van-button id="minibnt" round type="danger" size="mini">получение кода проверки</van-button>
                <van-cell-group class="username">
                    <van-field class="border" placeholder="введите пароль"  type="password"  left-icon="lock"/>
                </van-cell-group>
                <van-cell-group class="username">
                    <van-field class="border" placeholder="код приглашения друзей"  type="password"  left-icon="friends"/>
                </van-cell-group>
            </van-col>
            <!--<van-col span="3">&nbsp</van-col>-->
        </van-row>


        <van-row type="flex" justify="center" class="btns">
            <!--<van-col span="3">&nbsp</van-col>-->
            <van-col span="18">
                <van-button class="jumpBtn" type="primary" size="large">регистрация</van-button>
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
                title: 'регистрация'
            }
        },
        components: {
            Header
        },
    }
</script>

<style scoped>
    [class*=van-hairline]::after {
        border: unset;
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