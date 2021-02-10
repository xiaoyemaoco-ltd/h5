<template>
    <div id="cate">
        <div id="header">
            <h2 id="cart">классификация</h2>
        </div>
        <div id="content">
            <div id="left" ref="left">
                <van-sidebar v-model="activeKey"  ref="menuList">
                    <van-sidebar-item @click="onChange" ref="l_item" v-for="(item, index) in category" :key="index" :title="item.cat_name"
                    />
                </van-sidebar>
            </div>
            <div  id="right" ref="right">
                <h3>{{catename}}</h3>
                <div id="list" class="list right-item-hook">
                    <van-list v-model="loading" offset="10"
                              :finished="finished"
                              finished-text="Больше не надо"
                              @load="load">

                    <div class="right" ref="good" style="width: 100%;display: flex;flex-wrap: wrap;">
                        <div id="goods" v-for="(v, k) in list" :key="k" @click="getGoodsList(v.cat_id)">
                            <img id="images" v-lazy="v.cat_img" >
                            <P class="text">{{v.cat_name}}</P>
                        </div>
                    </div>
                    </van-list>

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
                active: 'category1',
                // active: Number(window.localStorage.getItem("activeIndex")||0),
                list: [],
                loading: true,
                finished: false,
                refreshing: false,//清空列表数据
                pageNo: 0, //当前页码
                category: [],
                catename: '',
                activeKey: 0,
                loadtext: 'продолжить просмотр ',

                updata:{
                    pageNumber: 0,  //页码
                    pageSize:20     //每页条数
                },
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
        inject: ['reload'],
        methods: {
            load() {
                this.$axios.post('api/v1/Getclassdata', {
                    parent_id: this.category[this.activeKey].cat_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        console.log(res)
                        let list = res.data.list
                        this.catename = this.category[this.activeKey + 1].cat_name

                        this.loading = false;
                        //是否处于加载状态，加载过程中不触发load事件
                        if (list == null || list.length === 0) {
                            this.finished = true;           // 加载结束
                            return;
                        }
                        // this.list = this.list.concat(list);
                        this.list = list;
                    } else {
                        this.finished = true;
                    }
                })
                this.activeKey += 1
            },
            //点击左侧
            onChange(index) {
                this.$axios.post('api/v1/Getclassdata', {
                    parent_id: this.category[index].cat_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        console.log(res)
                        this.list = []
                        this.list = res.data.list
                        this.catename = this.category[index].cat_name
                    }
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
                    console.log(e)
                    if (e.data.statuscode == 200) {
                        this.category = e.data.list
                        this.catename = e.data.list[0].cat_name
                        this.loadtext += e.data.list[1].cat_name
                        // this.list = e.data.list[0].sub_cat_id
                        this.loading = false

                        /*this.$nextTick(() => {
                            this._initBScroll()
                            // 获取某个分类下商品列表离顶部距离
                            this._initRightHeight();
                        })*/

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
                if (!this.rights) {
                    this.rights = new BScroll(this.$refs.right, {
                        startY: true,
                        click: true, // 配置允许点击事件
                        scrollY: true, // 可以开启纵向滚动
                        probeType: 3, // 开启滚动监听
                        bounce: false // 关闭弹性效果
                    })
                    //rights这个对象监听事件，实时获取位置pos.y
                    this.rights.on('scroll', (pos) => {
                        this.scrollY = Math.abs(Math.round(pos.y))
                        console.log(this.scrollY)
                    })
                } else {
                    this.rights.refresh()
                }
                this.lefts = new BScroll(this.$refs.left, {
                    click: true,
                })
                console.log(this.lefts)
            },
            //求出右边列表的高度
            _initRightHeight(){
                let rightItems = this.$refs.good
                let height = 0
                this.listHeight.push(height)
                for(let i = 0; i < rightItems.length; i++){
                    let item = rightItems[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
                console.log(this.listHeight)
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
        height: calc(100vh - 250px);
        overflow: hidden;
    }
    #right #list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 100px;
        height: calc(100vh - 250px);
        overflow-y:auto;
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