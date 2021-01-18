<template>
    <div id="cate">
        <div id="header">
            <h2 id="cart">классификация</h2>
        </div>
        <div id="content">
            <div id="left">
                <van-sidebar v-model="activeKey" @change="onChange">
                    <van-sidebar-item v-for="(item, index) in category" :key="index" :title="item.cat_name" />
                </van-sidebar>
            </div>
            <div id="right">
                <van-list id="list" finished-text="Больше нет">
                    <h3>{{catename}}</h3>
                    <div id="goods" v-for="(item, index) in list" :key="index" @click="getGoodsList(item.cat_id)">
                        <van-image class="image" width="90px" height="80px" radius="5px" :src="item.cat_img" />
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
                list: [],
                loading: false,
                finished: false,
                refreshing: false,//清空列表数据
                pageNo: 0, //当前页码
                activeKey: 0,
                category: [],
                catename: '',
                loadtext: 'продолжить просмотр '
            };
        },
        components: {
            Tabbar
        },
        mounted() {
            this.getCategory()
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
            }
        }
    }
</script>

<style scoped>
    #cate {
        height: calc( 100vh - 200px );
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
        height: calc( 100vh - 250px );
        width: 750px;
        /*overflow:hidden;*/
    }
    #content #left {
        overflow-y:auto;
        height: calc(100vh - 250px);
    }
    #left >>> .van-sidebar {
        width: 250px;
    }
    #content #right {
        width: 500px;
        overflow-y:auto;
        height: calc(100vh - 250px);
    }
    #right #list {
        /*height: 100%;*/
        display: flex;
        flex-wrap: wrap;
    }
    #right #goods {
        /*padding-left: 10px;*/
        width: 50%;
    }
    #right .text {
        width: 90%;
        margin-top: unset;
        word-break: break-all;
    }
    #list h3 {
        width: 100%;
        text-align: left;
        margin-left: 30px;
    }
    #list >>> .van-list__finished-text {
        width: 100%;
    }
    #list >>> .van-list__loading {
        width: 100%;
    }
</style>