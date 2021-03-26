<template>
  <div class="hello">
    <div id="header">
      <van-search v-model="value" @click="search" placeholder="поиска товар" />
    </div>

    <div id="content">
<!--        下拉刷新-->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item><img id="swiperimages" src="../assets/image/index1.png"></van-swipe-item>
            <van-swipe-item><img id="swiperimages" src="../assets/image/index2.png"></van-swipe-item>
            <van-swipe-item><img id="swiperimages" src="../assets/image/index3.png"></van-swipe-item>
            <van-swipe-item><img id="swiperimages" src="../assets/image/index4.png"></van-swipe-item>
          </van-swipe>
          <van-list id="list" v-model="loading" offset="1"
                    :finished="finished"
                    finished-text="Больше не надо"
                    loading-text="Загрузка..."
                    @load="onLoad">
            <div id="goods" v-for="(item, index) in list" :key="index" @click="getGoodsDetail(item.id)">
              <img v-lazy="item.thumb">
              <p v-if="item.count > 0" id="sales">Продажи：{{item.count}}</p>
              <p v-else id="sales"></p>
              <P class="text">{{item.name}}</P>
              <label id="attr">
                <span id="price">{{item.shop_price}}</span>
                <span id="dw">тг.</span>
                <span :id="item.cang == 'CN' ? 'cang' : 'hskst'">{{item.showkeyname}}</span>
              </label>
            </div>
          </van-list>
        </van-pull-refresh>
    </div>

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
      list: [],
      updata:{
        pageNumber: 0,  //页码
        pageSize:20     //每页条数
      },
      isLoading: false,
      loading: false,
      finished: false,
    };
  },
  components: {
    Tabbar,
  },
  mounted() {
    this.updata.pageNumber = 0
    this.updata.pageSize = 20
  },
  methods: {
    onLoad() {
      this.getgoodslist();
    },
    getgoodslist () {
      this.$axios.post('api/index/get_index_best', {
        skip: this.updata.pageNumber,
        maxperpage: this.updata.pageSize
      }).then((e) => {
        this.$toast.clear()
        if (e.data.statuscode == 200) {
          let list = e.data.data
          this.loading = false;              //是否处于加载状态，加载过程中不触发load事件
          if (list == null || list.length === 0) {
            this.finished = true;           // 加载结束
            return;
          }
          this.updata.pageNumber = e.data.skip;
          this.list = this.list.concat(list); // 将新数据与老数据进行合并
        } else {
          this.finished = true;
        }
      })
    },
    getGoodsDetail (goods_id) {
      this.$router.push({
        path: './goodsdetail',
        query: {
          goods_id: goods_id
        }
      })
    },
    search () {
      this.$router.push({
        path: './search'
      })
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.updata.pageNumber = 0
        this.updata.pageSize = 20
        this.list = []
        this.getgoodslist();
        this.isLoading = false;
      }, 1000);
    },
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
  #list >>> .van-list__finished-text, #list >>>.van-list__loading {
    margin: 0 auto;
  }
  .van-search {
    width: 80%;
    padding: unset;
    margin: 0 auto;
    background-color: unset;
    border-radius: 50%;
  }
  #content {
    height: calc( 100vh - 200px);
    overflow-y:auto;
    background-color: #eee;
    bounce: true;
  }

  #content::-webkit-scrollbar {
    width: 0 !important;
  }

  .my-swipe {
    background-color: #ffffff;
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
    padding-top: 15px;
    width: 96%;
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
  }
  #goods #sales {
    margin: 0 15px;
    color: #cccccc;
    text-align: left;
    height: 30px;
  }
  #goods #attr {
    display: inline-block;
    /*width: 300px;*/
    width: 93%;
    margin: 0 15px;
  }
  #goods .text {
    text-align: left;
    margin: 15px;
    height: 60px;
    line-height: 30px;
    /*兩行換行省略號*/
    text-overflow: ellipsis;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #goods img {
    width: 250px;
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
    font-size: 24px;
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
