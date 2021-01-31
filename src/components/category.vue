<template>
    <div id="cate">
        <div id="header">
            <h2 id="cart">классификация</h2>
        </div>
        <div id="content">
            <div id="left" ref="left">
                <van-sidebar v-model="activeKey" @change="onChange">
                    <van-sidebar-item v-for="(item, index) in category" :key="index" :title="item.cat_name" :class="{current: currentIndex == index}" />
                </van-sidebar>
            </div>
            <div id="right">
                <h3>{{catename}}</h3>
                <van-list id="list" class="list right-item-hook" finished-text="Больше нет" ref="right">
                    <div id="goods" v-for="(item, index) in list" :key="index" @click="getGoodsList(item.cat_id)">
                        <lazy-component>
                            <!--<van-image class="image" :show-loading="false" width="90px" height="80px" radius="5px" v-lazy="item.cat_img" />-->
                            <img id="images" v-lazy="item.cat_img" >
                        </lazy-component>
                        <P class="text">{{item.cat_name}}</P>
                    </div>
                </van-list>
            </div>
        </div>
        <tabbar :active="active"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "./tabbar";
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
                activeKey: 0,
                category: [],
                catename: '',
                loadtext: 'продолжить просмотр ',
                listHeight: [],
                scrollY: 0, //实时获取当前y轴的高度
                clickEvent: false
            };
        },
        watch: {
            $route (to, from) {
                // 对路由变化作出响应...
                console.log('to.path----',to.path)//跳转后路由
                console.log('from----',from)//跳转前路由
            }
        },
        components: {
            Tabbar
        },
        mounted() {
            this.getCategory()
            /*this.$nextTick( () => {
                this._initScroll()
                this._getHeight()
            })*/
            console.log(this.$route.path)
        },
        computed: {
            currentIndex () {
                for(let i = 0; i < this.listHeight.length; i ++){
                    let height = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    //当height2不存在的时候，或者落在height和height2之间的时候，直接返回当前索引
                    //>=height，是因为一开始this.scrollY=0,height=0
                    if(!height2 || (this.scrollY >= height && this.scrollY < height2)){
                        return i
                    }
                    if(this.listHeight[this.listHeight.length - 1] - this.$refs.right.clientHeight <= this.scrollY){
                        if(this.clickTrue){
                            return this.currentNum
                        }else{
                            return (this.listHeight.length - 1)
                        }
                    }
                }
                //如果this.listHeight没有的话，就返回0
                return 0
            }
        },
        methods: {
            load() {
                /*setTimeout(() => {
                    // let resdata=JSON.parse(JSON.stringify(that.runlogData));
                    console.log(this.category[this.activeKey].cat_id)
                    let index = 0;
                    this.$axios.post('api/v1/Getclassdata', {
                        parent_id: this.category[index].cat_id
                    }).then((res) => {
                        if (res.data.statuscode == 200) {
                            this.list = res.data.list
                            this.catename = this.category[index].cat_name
                            index += 1
                            this.activeKey = index
                            console.log(this.activeKey)
                        }
                    })
                }, 1000);*/
            },
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
                /*this.clickEvent = true
                //在better-scroll的派发事件的event和普通浏览器的点击事件event有个属性区别_constructed
                //浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性的时候return掉
                if(!event._constructed){
                    return
                }else{
                    let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
                    let el = rightItems[index]
                    this.rights.scrollToElement(el, 300)
                }*/
            },
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
                        this.loadtext += e.data.list[1].cat_name
                        this.$axios.post('api/v1/Getclassdata', {
                            parent_id: e.data.list[0].cat_id
                        }).then((res) => {
                            if (res.data.statuscode == 200) {
                                this.list = res.data.list
                            }
                        })
                    }
                })
            },
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
        height: calc( 100vh - 1000px );
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
    }
    #right #list {
        /*height: 100%;*/
        display: flex;
        flex-wrap: wrap;
        overflow-y:auto;
        height: calc(100vh - 250px);
    }
    #right #goods {
        /*padding-left: 10px;*/
        width: 50%;
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
        margin: 15px;
    }
    #list >>> .van-list__finished-text {
        width: 100%;
    }
    #list >>> .van-list__loading {
        width: 100%;
    }
</style>