<template>
    <div id="cate">
        <div id="header">
            <h2 id="cart">классификация</h2>
        </div>
        <div id="content">
            <div id="left" ref="left">
                <van-sidebar v-model="activeKey" @change="onChange" ref="menuList">
                    <van-sidebar-item ref="l_item" v-for="(item, index) in category" :key="index" :title="item.cat_name"
                    />
                </van-sidebar>
            </div>
            <div id="right" ref="right">
                <div id="list" class="list right-item-hook">
                    <div class="right" v-for="(item, index) in category" :key="index" ref="good" style="width: 100%;display: flex;flex-wrap: wrap;">
                        <h3>{{item.cat_name}}</h3>
                        <div id="goods" v-for="(v, k) in item.sub_cat_id" :key="k" @click="getGoodsList(v.cat_id)">
                            <lazy-component>
                                <!--<van-image class="image" :show-loading="false" width="90px" height="80px" radius="5px" v-lazy="item.cat_img" />-->
                                <img id="images" v-lazy="v.cat_img" >
                            </lazy-component>
                            <P class="text">{{v.cat_name}}</P>
                        </div>
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
                loading: false,
                finished: false,
                refreshing: false,//清空列表数据
                pageNo: 0, //当前页码
                category: [],
                catename: '',
                activeKey: 0,
                loadtext: 'продолжить просмотр ',

                listHeight: [],
                scrollY: 0, //实时获取当前y轴的高度
                clickEvent: false

            };
        },
        components: {
            Tabbar
        },
        mounted() {
            this.getCategory()
        },
        computed: {
            //动态绑定class类名
        },
        methods: {
            //点击左侧
            onChange(index) {
                this.clickEvent = true
                //在better-scroll的派发事件的event和普通浏览器的点击事件event有个属性区别_constructed
                //浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性的时候return掉

                let rightItems = this.$refs.right.getElementsByClassName('right')
                let el = rightItems[index]
                this.rights.scrollToElement(el, 300)


                /*this.$axios.post('api/v1/Getclassdata', {
                    parent_id: this.category[index].cat_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        console.log(res)
                        this.list = []
                        this.list = res.data.list
                        this.catename = this.category[index].cat_name
                    }
                })*/
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
                    console.log(e)
                    if (e.data.statuscode == 200) {
                        this.category = e.data.list
                        this.catename = e.data.list[0].cat_name
                        this.loadtext += e.data.list[1].cat_name

                        this.$nextTick(() => {
                            this._initBScroll()
                            // 获取某个分类下商品列表离顶部距离
                            this._initRightHeight();
                        })

                        /*this.$axios.post('api/v1/Getclassdata', {
                            parent_id: e.data.list[0].cat_id
                        }).then((res) => {
                            if (res.data.statuscode == 200) {
                                this.list = res.data.list
                            }
                        })*/
                    }
                })
            },
            _initBScroll() {
                if (!this.Scroll) {
                    this.rights = new BScroll(this.$refs.right, {
                        startY: true,
                        click: true, // 配置允许点击事件
                        scrollY: true, // 可以开启纵向滚动
                        probeType: 3, // 开启滚动监听
                        bounce: false // 关闭弹性效果
                    })
                    //rights这个对象监听事件，实时获取位置pos.y
                    this.rights.on('scroll', (pos) => {
                        this.scrollY = pos.y
                    })
                } else {
                    this.Scroll.refresh()
                }
                this.lefts = new BScroll(this.$refs.left, {
                    click: true,
                    startY: true,
                })
            },
            //求出右边列表的高度
            _initRightHeight(){
                let rightItems = this.$refs.right.getElementsByClassName('right')
                let height = 0
                this.listHeight.push(height)
                for(let i = 0; i < rightItems.length; i++){
                    let item = rightItems[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }

            },
            //左右联调
            _initLeftScroll(index){
                let menu = this.$refs.menuList;
                let el = menu[index];
                this.leftBscroll.scrollToElement(el,300,0,-300)
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
        padding: 30px 2px;
    }

    .van-sidebar-item >>> .van-sidebar-item__text {
        font-size: 12px;
    }
    #content {
        display: flex;
        height: calc( 100vh - 100px );
        width: 750px;
        /*overflow:hidden;*/
    }
    #content #left {
        overflow-y:auto;
        height: calc(100vh - 200px);
    }
    #left >>> .van-sidebar {
        width: 250px;
    }
    #content #right {
        width: 500px;
        height: calc(100vh - 200px);
        overflow: hidden;
    }
    #right #list {
        display: flex;
        flex-wrap: wrap;
    }
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
    }
    #list >>> .van-list__finished-text {
        width: 100%;
    }
    #list >>> .van-list__loading {
        width: 100%;
    }
</style>