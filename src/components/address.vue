<template>
    <div id="content">
        <Header :title="title"></Header>
        <div class="box">
            <div>
              <div class="addBox">
                <div class="addradio">
                  <div class="addsmallBox">
                    <div class="userphone">
                      <div class="user">扎克</div>
                      <div class="phone">13366666666</div>
                    </div>
                    <p class="address">是打发斯蒂芬的沙发斯蒂芬的沙发斯蒂芬是打发斯蒂芬的沙发斯蒂芬的沙发斯蒂芬</p>
                  </div>
                </div>
              </div>
              <div id="edit">
                <van-radio-group :value="radio">
                  <van-radio icon-size="20px" name="2">настройки по умолчанию</van-radio>
                </van-radio-group>
                <div id="ed">
                  <img src="../assets/image/bianji@2x.png">
                  <span>редактировать</span>
                </div>
                <div id="del">
                  <img src="../assets/image/shanchu@2x.png">
                  <span>удалять</span>
                </div>
              </div>
            </div>
            <div>
              <div class="addBox">
                <div class="addradio">
                  <div class="addsmallBox">
                    <div class="userphone">
                      <div class="user">扎克</div>
                      <div class="phone">13366666666</div>
                    </div>
                    <p class="address">是打发斯蒂芬的沙发斯蒂芬的沙发斯蒂芬是打发斯蒂芬的沙发斯蒂芬的沙发斯蒂芬</p>
                  </div>
                </div>
              </div>
              <div id="edit">
                <van-radio-group :value="radio">
                  <van-radio icon-size="20px" name="2">настройки по умолчанию</van-radio>
                </van-radio-group>
                <div id="ed">
                  <img src="../assets/image/bianji@2x.png">
                  <span>редактировать</span>
                </div>
                <div id="del">
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
                radio: '1',
                title: 'мой адресс'
            }
        },
        components: {
            Header
        },
        methods: {
            add() {
                this.$router.push('./addaddress')
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
    }
    #edit #ed img, #edit #del img {
      width: 34px;
      vertical-align: middle;
    }
    #edit #ed, #edit #del {
      margin-left: 20px;
    }
    #edit #ed span, #edit #del span {
      margin-left: 10px;
    }
</style>