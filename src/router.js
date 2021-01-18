import Vue from 'vue'
import Router from 'vue-router'

//组件模块
import Home from './components/home'
import Category from './components/category'
import Cart from './components/cart'
import Personal from './components/personal'
import Goods from './components/goods'
import GoodsDetail from './components/goods_detail'
import Pay from './components/pay'
import Order from './components/order'
import OrderDetail from './components/order_detail'
import Address from './components/address'
import AddAddress from './components/add_address'
import Coupon from './components/coupon'
import Login from './components/login'
import Register from './components/register'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/home', component: Home},
        {path: '/category', component: Category},
        {path: '/cart', component: Cart},
        {path: '/personal', component: Personal},
        {path: '/goods', component: Goods},
        {path: '/goodsdetail', component: GoodsDetail},
        {path: '/pay', component: Pay},
        {path: '/order', component: Order},
        {path: '/orderdetail', component: OrderDetail},
        {path: '/address', component: Address},
        {path: '/addaddress', component: AddAddress},
        {path: '/coupon', component: Coupon},
        {path: '/login', component: Login},
        {path: '/register', component: Register},
    ]
})
