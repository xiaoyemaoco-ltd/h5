<template>
    <div class="box">
        <Header :title="title"></Header>
        <div class="create">
            <div class="borBox">
              Имя<input placeholder="введите Имя" type="text" />
            </div>
            <div class="borBox">
              Фамилия<input placeholder="введите Фамилия" type="text" />
            </div>
            <div class="borBox">
              <label>номер телефона</label>
              <input style="width: 50%" placeholder="введите" type="number"/>
            </div>
            <div class="borBox" id="area" @click="borBox">
              район
                <input placeholder="Выберите" type="text" class="inputBox"/>
                <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
            </div>

            <div class="borBox">
              Адрес<input placeholder="введите Адрес" type="text" />
            </div>
        </div>
        <button class="addadd">
          спасти
        </button>
        <van-toast id="van-toast"/>
        <div class="areabox">
            <van-popup
                    :show="show"
                    position="bottom"
                    custom-style="height: 60%;"
                    @close="onClose"
            >
                <van-area :area-list="areaList" @confirm="getArea" @cancel="colseArea" />
            </van-popup>
        </div>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "add_address",
        data() {
            return {
                title: 'адрес получателя',
                show: false,
            }
        },
        components: {
            Header
        },
        methods: {
            borBox:function () {
                this.show = true
            },
            getArea: function(val) {
                let j = val.mp.detail.values
                console.log(val.mp.detail.values)
                let v = '';
                for(let i = 0; i< j.length; i++) {
                    v += j[i].name
                }
                this.areavalue = v
                this.show = false
            },
            colseArea: function() {
                this.show = false
            },
            onClose() {

            }
        }
    }
</script>

<style scoped>
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .create {
        margin: 20px 30px;
    }
    .borBox {
        border-bottom: 1px solid #eee;
        font-size: 28px;
        color: #333333;
        padding: 20px 0 20px 20px;
    }
    .borBox input {
        width: 75%;
        height: 50px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 30px;
        border: unset;
    }
    .inputBox {
        pointer-events: none;
    }
    .borBox div {
        float: right;
        font-size: 35px;
        line-height: 1;
    }
    .addadd {
        border: unset;
        width: 608px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background: #ef423a;
        border-radius: 40px;
        font-size: 40px;
        color: #FFFFFF;
        margin: 10px auto;
    }
    #area {
        display: flex;
    }
</style>