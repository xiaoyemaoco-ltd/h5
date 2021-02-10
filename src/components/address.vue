<template>
    <div id="content">
        <Header :title="title"></Header>
        <div class="box">
            <div id="content" v-for="(item, index) in list" :key="index">
              <div class="addBox">
                <div class="addradio">
                  <div class="addsmallBox">
                    <div class="userphone">
                      <div class="user">{{item.consignee}}</div>
                      <div class="phone">{{item.mobile}}</div>
                    </div>
                    <p class="address">{{item.province_name}} {{item.city_name}} {{item.district_name}} {{item.address}}</p>
                  </div>
                </div>
              </div>
              <div id="edit">
                <van-radio-group v-model="radio">
                  <van-radio position icon-size="20px" :name="item.address_id" @click="defalutaddress">по умолчанию</van-radio>
                </van-radio-group>
                <div id="ed" @click="adressupdate(item.address_id)">
                  <img src="../assets/image/bianji@2x.png">
                  <span>редактировать</span>
                </div>
                <div id="del" @click="deladdress(item.address_id)">
                  <img src="../assets/image/shanchu@2x.png">
                  <span>удалять</span>
                </div>
              </div>
            </div>
            <div class="addadd" @click="add">Добавить адрес</div>
        </div>
    </div>

</template>

<script>
    import Header from './header'
    export default {
        name: "address",
        data() {
            return {
                radio: '',
                title: 'мой адресс',
                list: [],
                userid: 0
            }
        },
        components: {
            Header
        },
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (!userinfo) {
                this.$router.push({
                    path: './login',
                    query: {
                        path: '/personal'
                    }
                })
                return
            }
            this.userid = userinfo.user_id
            this.getaddresslist()
        },
        methods: {
            //默认地址
            defalutaddress () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/setDefaultAddress', {
                    user_id: this.userid,
                    address_id: this.radio
                }).then((e) => {
                    this.$toast.clear(); // 关闭加载
                    if (e.data.statuscode == 200) {
                        this.getaddresslist()
                    }
                })
            },
            //添加地址
            add() {
                this.$router.push('./addaddress')
            },
            //修改地址
            adressupdate(id) {
                this.$router.push({
                    path: './updateaddress',
                    query: {
                        address_id: id
                    }
                })
            },
            //删除
            deladdress(id) {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/userDelAddress', {
                    user_id: this.userid,
                    address_id: id
                }).then((e) => {
                    this.$toast.clear(); // 关闭加载
                    if (e.data.statuscode == 200) {
                        this.getaddresslist()
                    }
                })
            },
            //列表
            getaddresslist () {

                this.$toast.loading({
                  duration: 0,
                  forbidClick: true,
                  mask: true,
                  message: "Загрузка..."
                });

                this.$axios.post('api/user/getUserAddress', {
                  user_id: this.userid
                }).then((e) => {
                    this.$toast.clear(); // 关闭加载
                    if (e.data.statuscode == 200) {
                        this.list = e.data.data
                        this.radio = e.data.default
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
        height: calc( 100vh - 100px);
        overflow-y:auto;
        background-color: #eeeeee;
    }
    #content {
        background-color: #fff;
    }
    .addBox {
        display: flex;
        margin: 20px 20px;
        height: 155px;
        border-bottom: 2px solid #eee;
    }
    .addBox >>> .van-radio__icon-wrap {
        margin-top: -50px;
    }
    .userphone {
        display: flex;
        margin-left: 10px;
       font-weight: bold;
    }
    .user {
        font-size: 30px;
        color: #333333;
    }
    .phone {
        font-size: 30px;
        color: #666666;
        margin-left: 20px;
    }
    .addradio {
        margin-top: 20px;
        width: 98%;
        margin-top: 20px;
    }
    .editAdd {
        font-size: 24px;
        color: #999999;
        border-left: 2px solid #eee;
        padding-left: 20px;
        margin-top: 15px;
        width: 60px;
        float: right;
        line-height: 50px;
    }
    .editAdd div {
        margin-top: 10px;
    }
    .addsmallBox p {
        font-size: 26px;
        color: #515151;
        padding-right: 20px;
        width: 100%;
        word-wrap: break-word;
    }
    .addresadd, .address {
        margin: 10px 10px;
        text-align: left;
    }
    .addadd {
        width: 608px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background: #ef423a;
        border-radius: 40px;
        font-size: 30px;
        color: #FFFFFF;
        margin: 50px auto;
    }
    #edit {
        display: flex;
        margin-left: 20px;
        text-align: left;
        padding-bottom: 10px;
    }
    #edit #ed img, #edit #del img {
       width: 34px;
        height: 34px;
       vertical-align: middle;
    }
    #edit #ed, #edit #del {
        margin-left: 50px;
        display: flex;
    }
    #edit #ed span, #edit #del span {
      margin-left: 10px;
    }
</style>