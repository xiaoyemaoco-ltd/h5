<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <van-tabs v-model="active">
                <van-tab title="Bce">
                    <div class="all">

                    </div>
                </van-tab>
                <van-tab title="Комментарий">内容 2</van-tab>
                <van-tab title="Прокомментировал">内容 3</van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Header from "./header";
    export default {
        name: "comment",
        components: {Header},
        data () {
            return {
                title: 'Комментарий',
                active: '1'
            }
        }

    }
</script>

<style scoped>
    .content {
        background-color: #eeeeee;
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
</style>