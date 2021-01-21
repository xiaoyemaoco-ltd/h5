<template>
    <div class="box">
        <Header :title="title"></Header>
        <div class="create">
            <div class="borBox">
                Имя<input v-model="name" placeholder="введите Имя" type="text" />
            </div>
            <div class="borBox">
                Фамилия<input v-model="lastname" placeholder="введите Фамилия" type="text" />
            </div>
            <div class="borBox">
                <label>номер телефона</label>
                <input style="width: 50%" v-model="mobile" placeholder="введите номер телефона" type="number"/>
            </div>
            <div class="borBox" id="area" @click="borBox">
                район
                <input placeholder="Выберите" type="text" class="inputBox" v-model="areavalue"/>
                <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
            </div>

            <div class="borBox">
                Адрес<input placeholder="введите Адрес" v-model="address" type="text" />
            </div>
            <!--省市選取-->
            <div>
                <van-popup round  v-model="show2" closeable position="bottom">
                    <div id="coupon1">
                        <van-tree-select :items="items" :active-id.sync="items.region_id"
                                         :main-active-index.sync="activeIndex" @click-nav="getprovice">
                            <template slot="content" v-if="city">
                                <ul class="right-content" id="left">
                                    <li v-for="(item, index) in city" :key="index" :class="selected == item.region_id ? 'selected' : ''"
                                        @click="onItemClick1(item.region_id, item.region_name)"> <p>{{item.region_name}}</p>  </li>
                                </ul>
                            </template>
                            <template slot="content" v-if="district">
                                <ul class="right-content" id="right">
                                    <li v-for="(item, index) in district" :key="index" :class="selected1 == item.region_id ? 'selected' : ''"
                                        @click="onItemClick2(item.region_id, item.region_name)"> <p>{{item.region_name}}</p> </li>
                                </ul>
                            </template>
                        </van-tree-select>
                    </div>
                </van-popup>
            </div>
        </div>

        <button class="addadd" @click="addaddress">спасти</button>
        <!--<div class="areabox">
            <van-popup
                    :show="show"
                    position="bottom"
                    custom-style="height: 60%;"
                    @close="onClose"
            >
                <van-area :area-list="areaList" @confirm="getArea" @cancel="colseArea" />
            </van-popup>
        </div>-->

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
            userid: 0
        }
    },
    components: {
        Header
    },
    mounted() {
        this.getaddess()
        this.getCity(3)
        /*this.getdistrict(36)*/
    },
    methods: {
        getaddess () {
            let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
            this.userid = userinfo.user_id
            this.$axios.post('api/user/getUserAddress', {
                address_id: this.$route.query.address_id,
                user_id: this.userid
            }).then((e) => {
                console.log(e)
                if (e.data.statuscode == 200) {
                    let res = e.data.data
                    this.name = res.first_name
                    this.lastname = res.last_name
                    this.mobile = res.mobile
                    this.address = res.address
                    if (res.district_name) {
                        this.areavalue = res.province_name + ' ' + res.city_name + ' ' + res.district_name + ' ' + res.address
                    } else {
                        this.areavalue = res.province_name + ' ' + res.city_name + ' ' + res.address
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
            /*if (this.mobile == '' || !(/^7\d{9}$/.test(this.mobile))) {
                this.$toast.fail('Ошибка номера телефона');
                return
            }*/
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
                mobile: this.mobile
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
                    this.items = e.data.data
                    console.log()
                    this.provice_id = this.items[0].region_id
                    this.provice = this.items[0].text
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
                    console.log(this.city)
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
    margin: 20px 30px;
    text-align: left;
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
</style>