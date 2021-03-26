<template>
    <div class="box">
        <Header :title="title"></Header>
        <div class="create">
            <div class="borBox">
                Имя: <input v-model="name" placeholder="введите Имя" type="text" />
            </div>
            <div class="borBox">
                Фамилия: <input v-model="lastname" placeholder="введите Фамилия" type="text" />
            </div>
            <div class="borBox">
                <label>номер телефона: </label>
                <span class="seven">+7</span>
                <input style="width: 50%" v-model="mobile" placeholder="введите номер телефона" type="tel" maxlength="10"/>
            </div>
            <div class="borBox" id="area" @click="borBox">район:
                <p class="inputBox selectedaddress">{{areavalue}}</p>
                <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
            </div>

            <div class="borBox">
                Адрес: <input placeholder="введите Адрес" v-model="address" type="text" />
            </div>
            <!--省市選取-->
            <van-popup class="provice" v-model="show2" round position="bottom">
                <van-cascader
                        v-model="cascaderValue"
                        title="Ваш район"
                        :options="options"
                        @close="show2 = false"
                        @change="onChange"
                        @finish="onFinish"
                        placeholder = "Выбрать"
                />
            </van-popup>
        </div>

        <button class="addadd" @click="addaddress">спасти</button>
    </div>
</template>

<script>
import Header from './header'
export default {
    name: "update_address",
    data() {
        return {
            title: 'Сменить адрес',
            show: false,
            show2: false,
            items: [],
            city: [],
            activeIndex: 0,
            selected: 0,
            selected1: 1,
            areaList: null,
            areavalue: '',
            district: [],
            provice: '',
            provice_id: 0,
            cityname: '',
            city_id: 0,
            disctrict_id: 0,
            districtname: '',
            name: '',
            lastname: '',
            mobile: '',
            address: '',
            userid: 0,
            options: [],
            cascaderValue: '',
            address_id: 0
        }
    },
    components: {
        Header
    },
    mounted() {
        this.getaddess()
        this.getCity(3)
        this.address_id = this.$route.query.address_id
        /*this.getdistrict(36)*/
    },
    methods: {
        getaddess () {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            this.userid = userinfo.user_id
            this.$axios.post('api/user/getUserAddress', {
                address_id: this.$route.query.address_id,
                user_id: this.userid
            }).then((e) => {
                if (e.data.statuscode == 200) {
                    let res = e.data.data
                    this.name = res.first_name
                    this.lastname = res.last_name
                    this.mobile = res.mobile
                    this.address = res.address
                    this.provice_id = res.province
                    this.city_id = res.city
                    if (res.district_name) {
                        this.disctrict_id = res.district
                        this.areavalue = res.province_name + ' ' + res.city_name + ' ' + res.district_name + ' ' + res.address
                        this.cascaderValue = res.district
                    } else {
                        this.areavalue = res.province_name + ' ' + res.city_name + ' ' + res.address
                        this.cascaderValue = res.city
                    }
                }
            })
        },
        //添加地址
        addaddress () {
            if (this.name == '') {
                this.$toast.fail('введите Имя');
                return
            }
            if (this.lastname == '') {
                this.$toast.fail('введите Фамилия');
                return
            }
            if (this.mobile == '' || !(/^\d{1}\d{9}$/.test(this.mobile))) {
                this.$toast.fail('Ошибка номера телефона');
                return
            }
            if (this.areavalue == '') {
                this.$toast.fail('выберите регион');
                return
            }
            if (this.address == '') {
                this.$toast.fail('заполните подробный адрес');
                return
            }

            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                mask: true,
                message: "Загрузка..."
            });
            // this.selected = 36
            this.$axios.post('api/user/userAddAddress', {
                name: this.name,
                lastname: this.lastname,
                user_id: this.userid,
                province: this.provice_id,
                city: this.city_id,
                district: this.disctrict_id,
                address: this.address,
                mobile: this.mobile,
                address_id: this.address_id
            }).then((e) => {
                this.$toast.clear(); // 关闭加载
                if (e.data.statuscode == 200) {
                    this.$toast({
                        type: 'success',
                        message: e.data.message,
                        onClose: () => {
                            this.$router.back()
                        }
                    })
                } else {
                    this.$toast({
                        type: 'fail',
                        message: e.data.message,
                    })
                }
            })
        },
        //点击选择地址
        borBox() {
            this.show2 = true
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                mask: true,
                message: "Загрузка..."
            });
            // this.selected = 36
            this.$axios.post('api/user/getProvice').then((e) => {
                this.$toast.clear(); // 关闭加载
                if (e.data.statuscode == 200) {
                    this.options = e.data.data
                    this.options.map((v, k) => {
                        this.options[k].value = v.region_id
                    })
                    this.provice_id = e.data.data[0].region_id
                    this.provice = e.data.data[0].text
                }
            })
        },
        //选择省
        getprovice(index) {
            let provice_id = this.items[index].region_id
            this.provice_id = provice_id
            this.provice = this.items[index].text
            this.getCity(provice_id)
        },
        //点击选择市
        onItemClick1(id, name){
            this.selected = id
            this.cityname = name
            this.city_id = id
            this.$axios.post('api/goods/getCity', {
                provice_id: id
            }).then((res) => {
                if (res.data.statuscode == 200) {
                    this.district = []
                    this.district = res.data.data
                    // this.selected1 = this.district[0].region_id
                } else {
                    this.show2 = false
                    this.areavalue = this.provice + ' ' + this.cityname
                    this.district = []
                }
            })
        },
        // 选择区
        onItemClick2 (id, name) {
            this.selected = id
            this.disctrict_id = id
            this.districtname = name
            this.show2 = false
            this.district = []
            this.city = []
            this.areavalue = this.provice + ' ' + this.cityname + ' ' + this.districtname
        },
        //读取市接口
        getCity(id) {
            this.$axios.post('api/goods/getCity', {
                provice_id: id
            }).then((res) => {
                if (res.data.statuscode == 200) {
                    this.city = []
                    this.city = res.data.data
                    this.selected = this.city[0].region_id
                }
            })
        },
        //读取区接口
        getdistrict(id) {
            this.$axios.post('api/goods/getCity', {
                provice_id: id
            }).then((res) => {
                if (res.data.statuscode == 200) {
                    this.district = []
                    this.district = res.data.data
                    this.selected1 = this.district[0].region_id
                }
            })
        },
        onChange () {

        },
        onFinish (value) {
            this.show2 = false
            this.areavalue = value.selectedOptions.map((option) => option.text).join(' ');
            this.provice_id = value.selectedOptions[0].value
            this.city_id = value.selectedOptions[1].value
            if (value.selectedOptions.length == 3) {
                this.disctrict_id = value.selectedOptions[2].value
            }
        }
    }
}
</script>

<style scoped>
    #coupon1 {
        margin: 85px 0;
    }
    .box {
        font-family: Source Han Sans SC;
        font-weight: 400;
    }
    .create {
        margin: 20px 15px;
        text-align: left;
    }
    .borBox {
        border-bottom: 1px solid #eee;
        font-size: 28px;
        color: #333333;
        padding: 20px 0;
    }
    .borBox input {
        width: 75%;
        height: 50px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 15px;
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
        line-height: 40px;
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
    #area label {
        height: 50px;
        line-height: 50px;
    }
    #coupon1 #left {
        float: left;
        width: 45%;
    }
    #coupon1 #right {
        float: right;
        width: 45%;
        margin-right: 10px;
    }
    .right-content li {
        text-align: center;
        white-space: normal;
        background-color: #eee;
        margin-top: 10px;
    }
    .selected {
        color: #ff362c;
    }
    .van-sidebar-item--select {
        font-weight: bold;
    }
    .seven {
        margin: 0 15px;
        color: #ff362c;
    }

    #area >>> .van-icon {

    }
    .provice >>> .van-tab__text {
        font-size: 24px;
    }
    .selectedaddress {
        width: 80%;
        margin: unset;
        padding-left: 15px;
    }
</style>