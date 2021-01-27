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
import UpdateAddress from './components/update_address'
import Coupon from './components/coupon'
import Login from './components/login'
import Register from './components/register'
import Confirmorder from './components/confirmorder'
import Search from './components/search'

Vue.use(Router)

const routes = [
    {path: '/home', component: Home},
    {path: '/category', component: Category},
    {path: '/cart', component: Cart},
    {path: '/personal', component: Personal},
    {path: '/goods/:id', component: Goods},
    {path: '/goodsdetail/:id', component: GoodsDetail},
    {path: '/pay', component: Pay},
    {path: '/order', component: Order},
    {path: '/orderdetail', component: OrderDetail},
    {path: '/address', component: Address},
    {path: '/addaddress', component: AddAddress},
    {path: '/updateaddress', component: UpdateAddress},
    {path: '/coupon', component: Coupon},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/confirmorder', component: Confirmorder},
    {path: '/search', component: Search},
]


const router = new Router({
    mode: 'hash',
    // base: 'D-Square',
    routes
});


export default router
