<template>
    <div id="content">
        <van-nav-bar id="nav"/>
        <div id="header">
            <div id="avart">
                <img id="img" v-if="islogin" :src="avart">
                <img id="img" v-else src="../assets/image/default_head_img.png">
            </div>

            <div id="detail" v-if="islogin">
                <div id="nickname">
                    <span class="name">{{nickname}}</span>
                    <span class="role">{{role}}</span>
                </div>
                <div id="score">
                    <label>Код приглашения：</label>
                    <label>10029</label>
                </div>
              <!--<div id="invite">
                <img id="inviteimg" src="../assets/image/uc/m_inviteshare.png">
                <label>Пригласить друзей</label>
              </div>-->
            </div>
            <div id="login" @click="login" v-else>вход</div>
        </div>
        <div id="middle">
            <!--<div class="order">
                <div class="shopAdmintitle" @click="getOrder">
                    <h3>Мой заказ</h3>
                    <i class="van-icon van-icon-arrow van-cell__right-icon order_icon">&lt;!&ndash;&ndash;&gt;</i>
                </div>
                <div class="myorder">
                    <van-tabbar id="select">
                        <van-tabbar-item icon="credit-pay">待付款</van-tabbar-item>
                        <van-tabbar-item icon="paid">待收货</van-tabbar-item>
                        <van-tabbar-item icon="idcard">已完成</van-tabbar-item>
                        <van-tabbar-item icon="other-pay">已失效</van-tabbar-item>
                    </van-tabbar>
                </div>
            </div>-->
            <div class="other1 other" v-if="rank != 0">
                <div id="left">
                  <p id="money">0</p>
                  <p id="text">Моя прибыль</p>
                </div>
                <div id="middle">
                  <img src="../assets/image/uc/a-l-img.png">
                  <span>14 день</span>
                  <img src="../assets/image/uc/a-r-img.png">
                </div>
                <div id="right">
                  <p id="money">2729</p>
                  <p id="text">активный</p>
                </div>
            </div>
            <div class="other">
                <van-tabbar id="select">
                  <van-tabbar-item @click="getOrder">
                    <span>Мой заказ</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_myorder.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item @click="collect">
                    <span>Избранное</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_enshrine.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item @click="address">
                    <span>мой адресс</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_address.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item @click="coupon">
                    <span>Мой заказ</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_coupon.png" />
                    </template>
                  </van-tabbar-item>
                </van-tabbar>
            </div>
            <div class="other" v-if="rank != 0">
                <van-tabbar id="select">
                  <van-tabbar-item @click="brokerage">
                    <span>Мой бонус</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_teamorder.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item @click="invited">
                    <span>Мои подписчики</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_teamuser.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item>
                    <span>Обналичить</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_withdraw.png" />
                    </template>
                  </van-tabbar-item>
                </van-tabbar>
            </div>
          <div class="other" v-if="rank == 3">
            <van-tabbar id="select">
              <van-tabbar-item @click="vipuser">
                <span>моя команда</span>
                <template #icon="props">
                  <img src="../assets/image/uc/m_teamvip.png" />
                </template>
              </van-tabbar-item>
              <van-tabbar-item>
                <span>Успех моей команды</span>
                <template #icon="props">
                  <img src="../assets/image/uc/m_plussta.png" />
                </template>
              </van-tabbar-item>
              <van-tabbar-item>
                <span>лидер</span>
                <template #icon="props">
                  <img src="../assets/image/uc/m_pluslistrank.png" />
                </template>
              </van-tabbar-item>
            </van-tabbar>
          </div>
            <div class="other">
                <van-tabbar id="select">
                  <van-tabbar-item @click="stationmsg">
                    <span>Cообщение</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_privatemsg.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item>
                    <span>Окно </span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_leaveword.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item>
                    <span>Pуководство VIP</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/m_viphelp.png" />
                    </template>
                  </van-tabbar-item>
                  <van-tabbar-item>
                    <span>Центр помощи</span>
                    <template #icon="props">
                      <img src="../assets/image/uc/icon-help.png" />
                    </template>
                  </van-tabbar-item>
                </van-tabbar>
            </div>
        </div>
        <tabbar :active="active"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "./tabbar"
    export default {
        name: "personal",
        data () {
            return {
                active: 'personal',
                islogin: false,
                avart: '',
                nickname: '',
                role: '',
                invitecode: '',
                rank: 0
            }
        },
        components: {
            Tabbar
        },
        mounted() {
            this.getuserifo()
        },
        methods: {
            //订单
            getOrder() {
                this.$router.push('./order')
            },
            //地址
            address() {
                this.$router.push('./address')
            },
            //优惠券
            coupon() {
                this.$router.push('./coupon')
            },
            //登录
            login() {
                this.$router.push('./login')
            },
            //收藏
            collect() {
                this.$router.push('./collect')
            },
            //user
            invited() {
                this.$router.push('./myuser')
            },
            //vip列表
            vipuser() {
                this.$router.push('./vipuser')
            },
            //佣金
            brokerage() {
                this.$router.push('./brokerage')
            },
            //站内信
            stationmsg () {
                this.$router.push('./stationletter')
            },
            //用户信息
            getuserifo () {
                let userinfo = JSON.parse(localStorage.getItem('userinfo'))
                if (userinfo) {
                    this.islogin = true
                    this.avart = userinfo.headimg
                    this.nickname = userinfo.user_name
                    this.role = userinfo.rank_name
                    this.invitecode = userinfo.yaoqing_code
                    this.rank = userinfo.user_rank
                }
            }
        }
    }
</script>

<style scoped>
    #content {
        background-color: #eee;
        text-align: left;
        height: 1334px;
    }
    #nav {
        background-color: #ff655d;
        border: unset;
        width: 750px;
    }
    .van-tabbar-item__icon img {
      height: 60px;
    }
    #select >>> .van-tabbar-item__icon {
      margin-bottom: 30px;
    }
    [class*=van-hairline]::after {
        border: unset;
    }
    #nav >>> .van-nav-bar__title {
        color: #fff;
    }
    #header {
        height: 220px;
        background: url("../assets/image/uc/minebg.png") no-repeat;
        padding: 10px 20px 15px 40px;
        display: flex;
    }
    #header #avart {
        margin-left: 20px;
    }
    #header #detail {
        margin: 10px 0 0 40px;
        width: 55%;
    }
    #middle {
        margin-top: 28px;
        height: calc( 100vh - 300px);
        overflow-y:auto;
    }
    #header #login {
        width: 15%;
        color: #fff;
        font-size: 35px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        margin: 20px 20px;
    }
    #detail #nickname {
        width: 100%;
    }
    #detail #nickname .name {
        display: inline-block;
        color: #fff;
        font-size: 30px;
    }
    #detail #nickname .role {
        text-align: center;
        width: 50%;
        display: inline-block;
        color: rgb(238, 10, 36);
        font-size: 30px;
        background-color: #fff;
        margin-left: 15px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
    }
    #detail #score {
        color: #fff;
        margin-top: 20px;
        font-size: 30px;
    }
    .order {
        background-color: #fff;
        width: 95%;
        height: 220px;
        box-shadow: 4px 4px 10px 0px rgba(207, 207, 207, 0.53);
        margin: 24px auto;
        border-radius: 15px;
    }
    .order .shopAdmintitle {
        height: 40%;
        border-bottom: 2px #ccc solid;
    }
    .order .shopAdmintitle h3 {
        display: inline-block;
        margin: 15px 20px;
    }
    .myorder .van-col img {
        width: 100%;
    }
    .order .shopAdmintitle .order_icon {
        margin: 15px 20px;
        float: right;
    }
    .myorder #select, .other #select {
        position: unset;
        width: 100%;
        margin: 0 auto;
    }
    .other1 {
      display: flex;
    }
    .other1 #left {
      padding-left: 35px;
      width: 30%;
    }
    .other1 #right {
      width: 30%;
      padding-left: 35px;
    }
    #left #money,  #right #money{
        color: #ff362c;
        font-size: 30px;
        margin-bottom: 20px;
    }
    #left #text,  #right #text {
      font-size: 25px;
      margin-bottom: 20px;
    }
    .other1 #middle img {
      width: 45px;
      vertical-align: middle;
    }
    .other1 #middle span {
      display: inline-block;
      color: #ff362c;
      font-size: 30px;
      vertical-align: top;
      margin: 0 8px;
    }
    .other1 #middle {
      vertical-align: center;
      width: 30%;
      padding-left: 35px;
    }
    .other {
        padding: 20px 0;
        background-color: #fff;
        height: 120px;
        border-radius: 15px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 30px;
    }
    #select {
      height: 100%;
    }
    #select .van-tabbar-item--active {
        color: unset;
    }
    #invite {
      background-color: #fff;
      height: 50px;
      text-align: center;
      margin-top: 15px;
      border-radius: 25px;
    }
    #inviteimg {
      width: 10%;
      width: 10%;
      margin-top: 5px;
      vertical-align: top;
    }
    #invite label {
      font-size: 30px;
      color: #ff0000;
      line-height: 50px;
      margin-left: 10px;
    }
    #img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: #fff;
    }
</style>