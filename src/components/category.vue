<template>
   <div id="cate">
       <div id="header">
           <h2 id="cart">классификация</h2>
       </div>

       <div id="classifyContent">
           <div id="scrollTitle" ref="scrollTitle">
               <ul class="classify-title" ref="titleDetail">
                   <li v-for="(item,index) in categories" :class="{'active':currentIndex===index}" :key="index" @click="onShortcutTouchStart(index)" ref="titleText">
                       <p>
                           <span v-html="item.cat_name"></span>
                       </p>
                   </li>
               </ul>
           </div>
           <div id="scrollDetail" ref="scrollDetail">
               <ul class="classify-detail">
                   <li class="classify-detail-all" ref="listGroup" v-for="(item,index) in categories" :key="index">
                       <p class="classify-detail-title">
                           <img v-lazy="item.cat_img"/>
                       </p>
                       <div class="sub2list fixed-flex fixed-flex-fs-s flex-wrap">
                           <div class="sub2item fixed-flexv fixed-flex-fs-s" v-for="(v, k) in item.sub_cat_id" :key="k" @click="jumpMerchandise(v.cat_id)">
                               <div class="img fixed-flex fixed-flex-c-c">
                                   <img v-lazy="v.cat_img"/>
                               </div>
                               <h3>{{v.cat_name}}</h3>
                           </div>
                       </div>
                   </li>
               </ul>
           </div>
       </div>
       <tabbar :active="active"></tabbar>
   </div>
</template>


<script>
    import BScroll from "better-scroll";
    import Tabbar from "./tabbar";
    export default {
        data() {
            return {
                active: 'category',
                categories: [],
                currentIndex: 0,
                scrollTitle: "",
                scrollDetail: "",
                scrollY: -1,
                listHeight: [],
                touch: {},
                fixedLoading: false,
                titleHeight: 0,
                fixedImgHeight: 0,
            }
        },
        components: {
            Tabbar
        },
        mounted() {
            this.getClassifyData()
        },
        methods: {
            getClassifyData: function() {
                this.$axios.post('api/v1/getallclassdata').then((e) =>{
                    if (e.data.statuscode == 200) {
                        this.categories = e.data.list
                        this.initScroll()
                    }
                })
            },
            initScroll: function(now_index) {
                var that = this;
                setTimeout(function() {
                    that.scrollDetail = new BScroll('#scrollDetail', {
                        startY: true,
                        click: true,
                        bounce: false,
                        probeType: 3
                    })
                    that.scrollTitle = new BScroll('#scrollTitle', {
                        click: true
                    })
                    that.scrollDetail.on('scroll', function(pos) {
                        that.scrollY = pos.y
                    })
                    setTimeout(function() {
                        if (now_index) {
                            that.onShortcutTouchStart(now_index)
                        }
                    }, 20)
                }, 20)
            },
            onShortcutTouchStart: function(index) {
                this.touch.anchorIndex = index
                this._scrollTo(index)
            },
            _calculateHeight: function() {
                this.listHeight = []
                var list = this.$refs.listGroup
                var height = 0
                this.listHeight.push(height)
                if (!list) {
                    return
                }
                for (var i = 0; i < list.length; i++) {
                    var item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            _scrollTo: function(index) {
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }
                index = Math.max(0, index);
                this.ListenScroll = true;
                this.currentIndex = index;
                this.scrollDetail.scrollToElement(this.$refs.listGroup[index], 300)
                var that = this;
                setTimeout(function() {
                    that.ListenScroll = false;
                }, 400)

            },
            jumpMerchandise: function(catId) {
                this.$router.push({
                    path: './goods',
                    query: {
                        cate_id: catId
                    }
                })
            },
        },
        watch: {
            categories: function() {
                var that = this;
                setTimeout(function() {
                    that._calculateHeight()
                }, 20)
            },
            scrollY: function(newY) {
                if (this.ListenScroll) {
                    return
                }
                var listHeight = this.listHeight
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                for (var i = 0; i < listHeight.length - 1; i++) {
                    var height1 = listHeight[i]
                    var height2 = listHeight[i + 1]
                    if (!height2 || (-newY >= height1 && -newY < height2)) {
                        this.currentIndex = i
                        return
                    }
                }
                this.currentIndex = listHeight.length - 2
            },
            currentIndex: function() {
                // newIndex < 0 ? newIndex = 0 : ""
                /*var theTitle = this.$refs.titleText[newIndex].offsetTop
                var theTitleHeight = this.$refs.titleText[newIndex].clientHeight
                var detailHeight = this.$refs.titleDetail.clientHeight*/
                /*if (this.titleHeight - theTitleHeight < theTitle) {
                    this.scrollTitle.scrollTo(0, this.titleHeight - theTitle - theTitleHeight)
                } else {
                    this.scrollTitle.scrollTo(0, 0)

                }*/
            }
        }
    }
</script>


<style lang="scss" scoped>
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
    #classifyContent {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        background: #fff;
        height: 100%;
    }

    #classifyContent #scrollTitle {
        width: 33%;
        height: 100%;
        border-right: 1px solid #efefef;
        overflow: auto;
    }

    #classifyContent #scrollDetail {
        width: 67%;
        height: 100%;
        overflow: hidden;
        /*opacity: 0;*/
    }

    .classify-title {
        padding-top: 10px;
        width: 100%;
    }

    .classify-title li {
        text-align: center;
        font-size: 14px;
        /*height: 40px;*/
        padding-bottom: 12px;
    }

    .classify-title li p {
        width: 100%;
        /*height: 26px;*/
        /*line-height: 26px;*/
        color: #444444;
        border-left: 3px solid transparent;
    }

    .classify-title li p span {
        display: block;
        width: 100%;
        /*height: 26px;*/
        /*line-height: 26px;*/
        font-size: 20px;
        padding: 8px 0;
        color: #444444;
        -webkit-transform: scale(.9);
        transform: scale(.9);
        transition: all .1s linear;
    }

    .classify-title li.active p {
        border-left-color: #CF021B;
    }

    .classify-title li.active p span {
        color: #000;
        font-weight: bolder;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    .classify-detail {
        padding: 0 12px;
        padding-top: 12px;
        padding-bottom: 20px;
        margin-top: 100px;
    }

    .classify-detail .classify-detail-all .classify-detail-title {
        overflow: hidden;
        padding-bottom: 38%;
        position: relative;
        background-size: contain;
    }

    .classify-detail .classify-detail-all .classify-detail-title img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .classify-small {
        margin-top: 22px;
        color: #333;
        text-align: center;
        padding-bottom: 40px;
    }

    .classify-small div {
        margin-bottom: 13px;
        font-size: 13px;
        vertical-align: middle;
    }

    .classify-small div i {
        display: inline-block;
        width: 17px;
        height: 0.5px;
        background: #333;
        margin-bottom: 4px;
    }

    .classify-small div i span {
        padding: 0 10px;
    }

    .classify-small .classify-definite {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: start;
        -webkit-justify-content: start;
        -ms-flex-pack: start;
        justify-content: start;
    }

    .classify-small .classify-definite li {
        width: 32%;
        margin-left: 1%;
    }

    .classify-small .classify-definite li p {
        overflow: hidden;
        padding-bottom: 100%;
        position: relative;
        background-size: contain;
    }

    .classify-small .classify-definite li p img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .classify-small .classify-definite li h3 {
        margin: 10px;
        font-size: 13px;
    }

    .classify-detail-all:last-child {
        min-height: 100vh;
    }

    .sub2list {
        padding-top: 15px;
        display: flex;
        flex-wrap: wrap;
    }

    .sub2list .sub2item {
        margin: unset;
        width: 49%;
    }

    .sub2list .sub2item .img {}

    .sub2list .sub2item .img img {
        height: 160px;
        width: 160px;
    }

    .sub2list .sub2item h3 {
        margin-top: 15px;
        padding: 0 .3rem;
        font-size: 22px;
        /*line-height: .8rem;
        height: .6rem;*/
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-align: center;
    }

    .searchbox-class {
        padding: .8rem 0;
    }
</style>