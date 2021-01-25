<template>
  <div class="hello">
    <div id="header">
      <van-search v-model="value" placeholder="поиска товар" />
    </div>
    <van-tabs v-model="tab" :animated="true" :swipeable="true">
      <van-tab title="标签 1">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img id="swiperimages" src="https://img.yzcdn.cn/vant/apple-3.jpg">
          </van-swipe-item>
          <van-swipe-item><img id="swiperimages" src="https://img.yzcdn.cn/vant/apple-3.jpg"></van-swipe-item>
          <van-swipe-item><img id="swiperimages" src="https://img.yzcdn.cn/vant/apple-3.jpg"></van-swipe-item>
          <van-swipe-item><img id="swiperimages" src="https://img.yzcdn.cn/vant/apple-3.jpg"></van-swipe-item>
        </van-swipe>
        <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"/>

        <div id="content">
          <van-list id="list">
            <div id="goods">
              <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
              <p>Продажи：100</p>
              <P class="text">name</P>
              <label id="attr">
                <span id="price">1000</span>
                <span id="dw">тг.</span>
                <span id="cang">CN</span>
              </label>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="标签 2">
        <div id="content">
          <van-list id="list">
            <div id="goods">
              <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
              <p>Продажи：100</p>
              <P class="text">name</P>
              <label id="attr">
                <span id="price">1000</span>
                <span id="dw">тг.</span>
                <span id="cang">CN</span>
              </label>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="标签 3">
        <div id="content">
          <van-list id="list">
            <div id="goods">
              <img src="https://img.yzcdn.cn/vant/apple-3.jpg">
              <p>Продажи：100</p>
              <P class="text">name</P>
              <label id="attr">
                <span id="price">1000</span>
                <span id="dw">тг.</span>
                <span id="cang">CN</span>
              </label>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>

    <tabbar :active="active"></tabbar>
  </div>
</template>

<script>
  import Tabbar from "./tabbar";
export default {
  name: 'Home',
  data() {
    return {
      active: 'home',
      value: '',
      tab: 0,
    };
  },
  components: {
    Tabbar,
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    height: 1334px;
  }
  #header {
    height: 100px;
    background-color: #ef423a;
    margin: 0 auto;
    display: flex;
  }
  .van-search__content {
    border-radius: 30px;
  }
  .van-search {
    width: 80%;
    padding: unset;
    margin: 0 auto;
    background-color: unset;
    border-radius: 50%;
  }
  .van-tabs >>> .van-tabs__content {
    height: calc( 100vh - 260px);
    overflow-y:auto;
    background-color: #eee;
  }

  .van-tabs >>> .van-tab--active {
    color: #ff362c;
  }
  .van-tabs >>> .van-tabs__line {
    background-color: #ff362c;
  }

  .van-swipe-item {
    height: 300px;
  }
  #swiperimages {
    width: 100%;
  }
  .van-notice-bar {
    height: 45px;
    line-height: 24px;
    background-color: #fff;
    padding-top: 15px;
  }
  #content #list {
    display: flex;
    flex-wrap: wrap;
  }
  #content #goods {
    width: 47.5%;
    margin: 0 0 12px 12px;
    background-color: #ffffff;
    padding: 10px 0;
    border-radius: 15px;
  }
  #goods #sales {
    margin: 0 20px;
    color: #cccccc;
    text-align: left;
    height: 30px;
  }
  #goods #attr {
    display: inline-block;
    width: 300px;
  }
  #goods .text {
    text-align: left;
    margin-left: 20px;
    height: 70px;
  }
  #goods img {
    width: 220px;
    height: 250px;
  }
  #attr #price, #attr #dw {
    float: left;
    display: inline-block;
  }
  #attr #price {
    font-size: 30px;
    color: rgb(238, 10, 36);
    margin-right: 10px;
  }
  #attr #dw {
    font-size: 8px;
    padding-top: 6px;
  }
  #attr #cang {
    text-align: center;
    width: 50px;
    height: 35px;
    float: right;
    display: inline-block;
    background-color: rgb(238, 10, 36);
    color: #ffffff;
    line-height: 40px;
    border-radius: 5px;
  }
  #hskst {
    text-align: center;
    background-color: #00a0de;
    width: 45px;
    height: 35px;
    float: right;
    display: inline-block;
    color: #ffffff;
    line-height: 40px;
    border-radius: 5px;
  }
</style>
