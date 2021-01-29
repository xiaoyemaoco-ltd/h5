<template>
    <van-tabbar v-model="tabbarValue" active-color="#ff362c" inactive-color="#000" @change="onChange">
        <van-tabbar-item name="home">
          <span id="text">Первая</span>
          <template #icon="props">
            <img v-if="tabbarValue != 'home'" src="../assets/image/foot/shouye1@2x.png" />
            <img v-else src="../assets/image/foot/shouye3@2x.png" />
          </template>
        </van-tabbar-item>
      <van-tabbar-item name="category">
        <span id="text">классификация</span>
        <template #icon="props">
          <img v-if="tabbarValue != 'category'" src="../assets/image/foot/fenlei1@2x.png" />
          <img v-else src="../assets/image/foot/fenlei2@2x.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="cart">
        <span id="text">корзина</span>
        <template #icon="props">
          <img v-if="tabbarValue != 'cart'" src="../assets/image/foot/gouwuche1@2x.png" />
          <img v-else src="../assets/image/foot/gouwuche2@2x.png" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="personal">
        <span id="text">шахта</span>
        <template #icon="props">
          <img v-if="tabbarValue != 'personal'" src="../assets/image/foot/gerenzhongxin1@2x.png" />
          <img v-else src="../assets/image/foot/gerenzhongxin2@2x.png" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        name: "tabbar",
        props: {
            active: String
        },
        data() {
            return {
                tabbarValue: this.active
            }
        },
        methods: {
            onChange(index) {
                if (index == 'home') {
                  this.$router.push('./')
                } else {
                  this.$router.push('./' + index)
                }

            }
        }
    }
</script>

<style scoped>
 .van-tabbar-item__icon img {
   height: 48px;
 }
  #text {
    font-size: 4px;
    display: inline-block;
  }
</style>