<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <div class="con">
                <h2>{{value}}</h2>
                <p class="date">{{date}}</p>
                <p class="text">{{desc}}</p>
            </div>
        </div>
    </div>

</template>

<script>
import Header from "@/components/header";

export default {
    name: "stationmsgdetail",
    components: {Header},
    data () {
        return {
            title: 'Детали письма сайта',
            desc: '',
            date: '',
            value: ''
        }
    },
    mounted() {
        this.date = this.$route.query.date
        this.desc = this.$route.query.desc
        this.value = this.$route.query.title
    }
}
</script>

<style scoped>
    .content {
        height: calc( 100vh - 100px );
        overflow-y:auto;
        background-color: #eee;
    }
    .date {
        text-align: right;
    }
    .con {
        background-color: #fff;
        padding: 20px 15px;
    }
    .con h2 {
        margin-top: unset;
    }
    .date {
        color: #686868;
        font-size: 26px;
    }
    .text {
        text-align: left;
        font-size: 30px;
    }
</style>