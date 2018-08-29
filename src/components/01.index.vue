<template>
<!-- 静态资源首页 -->
    <div>
        <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="#/" class="router-link-active">首页</a> &gt;
                    <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
                </div>
            </div>
            <!-- banner部分 -->
            <div class="section">
                <div class="wrapper">
                    <div class="wrap-box">
                        <!-- 左边 -->
                        <div class="left-220" style="margin: 0px;">
                            <div class="banner-nav">
                                <ul>
                                    <li v-for="(item, index) in catelist" :key="index">
                                        <h3>
                                            <i class="iconfont icon-arrow-right"></i>
                                            <span>{{item.title}}</span>
                                            <p>
                                                <span v-for="(it, i) in item.subcates" :key="it.id">
                                                    {{it.title}}&nbsp;
                                                </span>
                                                <!-- <span>
                                                    摄影摄像&nbsp;
                                                </span>
                                                <span>
                                                    存储设备&nbsp;
                                                </span> -->
                                            </p>
                                        </h3>
                                        <div class="item-box">
                                            <dl>
                                                <dt>
                                                    <a href="/goods/40.html" >{{item.title}}</a>
                                                </dt>
                                                <dd>
                                                    <a href="/goods/43.html" v-for="(it, i) in item.subcates" :key="it.id" >{{it.title}}</a>
                                                    <!-- <a href="/goods/43.html">摄影摄像</a>
                                                    <a href="/goods/43.html">存储设备</a> -->
                                                </dd>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--幻灯片-->
                        <div class="left-705">
                            <div class="banner-img">
                                <div id="focus-box" class="focus-box">
                                    <ul class="slides">
                                        <el-carousel indicator-position="outside">
                                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                                <a href="#"><img :src="item.img_url" alt=""></a>
                                            </el-carousel-item>
                                        </el-carousel>
                                    </ul>
                                    <ol class="flex-control-nav flex-control-paging">
                                        <li>
                                            <a class="">1</a>
                                        </li>
                                        <li>
                                            <a class="flex-active">2</a>
                                        </li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                        <!--/右边-->
                        <div class="left-220">
                            <ul class="side-img-list">
                                <li v-for="(item, index) in toplist" :key="index">
                                    <div class="img-box">
                                        <label>{{index+1}}</label>
                                        <img :src="item.img_url">
                                    </div>
                                    <div class="txt-box">
                                        <a href="/goods/show-98.html">{{item.title}}</a>
                                        <!-- 设置过滤器 -->
                                        <span>{{item.add_time | capitalize }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section" v-for="(item, index) in productList" :key="index">
                <div class="main-tit">
                    <h2>{{item.catetitle}}</h2>
                    <p>
                        <a href="/goods/43.html" v-for="(initem, index) in item.level2catelist" :key="index">{{initem.subcatetitle}}</a>
                       
                        <a href="/goods/40.html">更多
                            <i>+</i>
                        </a>
                    </p>
                </div>
                <div class="wrapper clearfix">
                    <div class="wrap-box">
                        <ul class="img-list">
                            <li class="" v-for="(items, index) in item.datas" :key="items.artID">
                                <!-- <a href="#/site/goodsinfo/87" > -->
                                <router-link :to="'/productdetal/'+items.artID">
                                    <div class="img-box">
                                        <!-- <img :src="items.img_url"> -->
                                        <!-- 图片懒加载 -->
                                        <img v-lazy="items.img_url">
                                    </div>
                                    <div class="info">
                                        <h3>{{items.artTitle}}</h3>
                                        <p class="price">
                                            <b>{{items.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存 {{items.stock_quantity}}</strong>
                                            <span>市场价：
                                                <s>{{items.market_price}}</s>
                                            </span>
                                        </p>
                                    </div>
                                </router-link>
                                    
                                <!-- </a> -->
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入调取数据的axios




// 暴露出去
export default {
  // 设置名字
  name: "index",
  data() {
    return {
      catelist: [], //左边栏数据
      sliderlist: [], //轮播图数据
      toplist: [], //右边栏数据
      productList : []  //商品列表
    };
  },
  // 生命周期函数
  created() {
    //   axios 获取头部左右两侧栏和轮播图的数据
    this.$axios
      .get("site/goods/gettopdata/goods")
      .then(res => {
        // console.log(res)
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
      })

    // 获取商品列表
    this.$axios.get('site/goods/getgoodsgroup').then(res=>{
        this.productList = res.data.message;
    })
  },
  //子组件的私有过滤器  
//   filters:{
//       capitalize:function(value){
//           return moment(value).format('YYYY年MM月DD日');
//       }
//   }
};
</script>
<style>
/* 轮播图样式,element提供的 */
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /* 因为与实际应用不符 自己写样式进行覆盖 */
  .el-carousel__container{
      height: 341px !important;
  }
</style>
