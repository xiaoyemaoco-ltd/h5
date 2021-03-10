<template>
    <div id="cate">
        <div id="header">
            <h2 id="cart">классификация</h2>
        </div>
        <div id="content">
            <div id="left" ref="left">
                <van-sidebar v-model="activeKey"  ref="menuList">
                    <van-sidebar-item @click="onChange" ref="l_item" v-for="(item, index) in category" :key="index" :title="item.cat_name"/>
                </van-sidebar>
            </div>
            <div id="right" ref="right">
                <h3>{{catename}}</h3>
                <div id="list" class="list right-item-hook" ref="box">
                    <div class="right" ref="cate">
                        <div id="goods" v-for="(v, k) in list" :key="k" @click="getGoodsList(v.cat_id)">
                            <img id="images" v-lazy="v.cat_img" >
                            <P class="text">{{v.cat_name}}</P>
                        </div>
                        <p class="tip" v-show="show">Потяните вверх, чтобы продолжить просмотр {{loadtext}}</p>
                    </div>
                </div>
            </div>
        </div>
        <tabbar :active="active"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "./tabbar";
    import BScroll from "better-scroll"
    export default {
        name: "goods",
        data() {
            return {
                active: 'category',
                // active: Number(window.localStorage.getItem("activeIndex")||0),
                list: [],
                loading: true,
                finished: false,
                refreshing: false,//清空列表数据
                pageNo: 0, //当前页码
                category: [],
                catename: '',
                loadtext: '',
                loadtext1: '',
                activeKey: 0,
                show: false,
                scrollY:0,
                scroller: '',
            };
        },
        components: {
            Tabbar
        },
        created() {
            this.getCategory()
        },
        computed: {
            //动态绑定class类名
        },
        inject: ['reload'],
        watch: {
            scrollY: function (e) {
                if (e < 0) {
                    this.scrollY(0)
                }
            }
        },
        methods: {
            initScroller() {
                //初始化betterScroll
                let self = this
                setTimeout(function () {
                    self.scroller = new BScroll(self.$refs.box, {
                        probeType: 1,
                        click: true,
                        mouseWheel: true,//开启鼠标滚轮
                        disableMouse: false,//启用鼠标拖动
                        disableTouch: false,//启用手指触摸
                        pullUpLoad: {
                            threshold: -40
                        },
                        scrollY: true
                    })
                    //给右侧绑定的BScroll绑定监听事件,但是你会发现并没有调用
                    self.scroller.on('scroll',({x,y})=>{
                        console.log(x, y)
                        self.scrollY = Math.abs(y);
                    })
                    self.scroller.on('pullingUp', (e) => {
                        console.log(e)
                        if (self.activeKey == self.category.length - 2) self.show = false
                        if (self.activeKey + 1 < self.category.length) {
                            self.activeKey += 1
                            self.catename = self.category[self.activeKey].cat_name
                            self.loadtext = self.category[self.activeKey].cat_name
                            self.loadtext1 = self.category[self.activeKey - 1].cat_name
                            self.getCateList()
                        }
                        self.scroller.finishPullUp();
                    })
                    self.scroller.on('touchEnd', function (position) {
                        position.y = 0
                        if (position.y > 30) { // 下拉刷新
                            if (self.activeKey > 0) {
                                self.activeKey -= 1
                                self.catename = self.category[self.activeKey].cat_name
                            }
                            self.getCateList()
                        }
                    })
                }, 2000)

            },
                //点击左侧
            onChange(index) {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                this.activeKey = index
                if (this.activeKey != this.category.length - 1) {
                    this.show = true
                } else {
                    this.show = false
                }
                this.$axios.post('api/v1/Getclassdata', {
                    parent_id: this.category[index].cat_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        this.list = []
                        this.list = res.data.list
                        this.catename = this.category[index].cat_name
                        if (index < this.category.length - 1) {
                            this.loadtext = this.category[index + 1].cat_name
                        }
                        if (index > 0) {
                            this.loadtext1 = this.category[index - 1].cat_name
                        }
                        this.$refs.box.scrollTop = 0
                    }
                    this.$toast.clear();
                })
            },
            //商品列表
            getGoodsList (cate_id) {
                this.$router.push({
                    path: './goods',
                    query: {
                        cate_id: cate_id
                    }
                })
            },
            getCategory() {
                this.$axios.post('api/v1/getallclassdata').then((e) => {
                    if (e.data.statuscode == 200) {
                        this.category = e.data.list
                        this.catename = e.data.list[0].cat_name
                        this.loadtext = e.data.list[1].cat_name
                        this.getCateList()
                        this.$nextTick(() => {
                            this.initScroller()
                        })
                    }
                })
            },
            getCateList () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                let _this = this
                _this.$axios.post('api/v1/Getclassdata', {
                    parent_id: _this.category[_this.activeKey].cat_id
                }).then((res) => {
                    this.$toast.clear();
                    if (res.data.statuscode == 200) {
                        let list = res.data.list
                        _this.list = list;
                        _this.show = true
                        // _this.$refs.cate.scrollTo(0, 0, 1)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #cate {
        height: calc( 100vh - 100px );
        /*padding-bottom: 50px;*/
    }
    #header {
        height: 100px;
        background-color: #ef423a;
        margin: 0 auto;
    }
    #header #cart {
        height: 100%;
        line-height: 100px;
        margin: unset;
        color: #fff;
    }
    .van-sidebar-item--select {
        font-weight: bold;
    }
    .van-sidebar .van-sidebar-item {
        padding: 20px 2px;
    }

    .van-sidebar-item >>> .van-sidebar-item__text {
        font-size: 20px;
    }
    #content {
        display: flex;
        height: calc( 100vh - 200px );
        width: 750px;
        /*overflow:hidden;*/
    }
    #content #left {
        overflow-y:auto;
        height: calc(100vh - 200px);
    }
    #left >>> .van-sidebar {
        width: 270px;
    }
    #content #right {
        width: 480px;
        height: calc(100vh - 200px);
        overflow: hidden;
    }
    #right #list {
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*height: calc(100vh - 260px);*/
        height: 1100px;
        padding-left: 15px;
        overflow: hidden;
    }
    #list .right {
        align-content: flex-start;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    /*#list::-webkit-scrollbar {*/
    /*    display: none;*/
    /*    width: 0;*/
    /*}*/

    #right #goods {
        width: 49%;
    }
    #goods #images {
        width: 190px;
        height: 180px;
    }
    #right .text {
        width: 90%;
        margin-top: unset;
        word-break: break-all;
    }
    #right h3 {
        text-align: left;
        padding: 15px;
        width: 100%;
        margin: unset;
    }
    #list >>> .van-list__finished-text {
        width: 100%;
    }
    #list >>> .van-list__loading {
        width: 100%;
    }
    #list .tip {
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        padding: 20px 0;
        margin: unset;
    }
</style>