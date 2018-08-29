<template>
    <!-- 商品详情 -->
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 图片部分 -->
                            <div class="pic-box">
                                 <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="mini" v-model="num1" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!-- 商品介绍和商品评论区域 -->
                        
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- iview 图钉 实现固定导航栏的效果 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="flag=true" :class="{selected:flag}" >商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="flag=false" :class="{selected:!flag}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            
                            <!-- 用v-html 解析带标签的数据 -->
                            <div class="tab-content entry" v-show="flag" v-html="goodsinfo.content">
                                
                            </div>
                            <div class="tab-content" v-show="!flag">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" v-model.trim="contentText" @click="submitComment" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in contentInfo" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | capitalize }}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- iview的分页插件 -->
                                        <Page :total="100" show-sizer show-elevator placement='top' @on-change = "pageChange"  @on-page-size-change="sizeChange" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="index">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/productdetal/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <router-link :to="'/productdetal/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | capitalize}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部(吸顶效果) -->
        <BackTop></BackTop>
    </div>
</template>

<script>
// 引入axios 拿数据

export default {
  name: "productdetail",
  data() {
    return {
      productid: "",
      goodsinfo: [],
      hotgoodslist: [],
      imglist: [],
      num1: 1,
      flag: true,
      //   设置评论区页码页容量的数据
      pageIndex: 1,
      pageSize: 10,
      //   获取评论区域的数据
      contentInfo: [],
      // 评论内容
      contentText: "",
      //   放大镜设置
      images: {
        normal_size: [] // required
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#dd2c00"
      }
    };
  },
  //   放大镜设置

  methods: {
    getProductInfo() {
      // console.log(this.$route.params.id);
      // 传递id
      this.productid = this.$route.params.id;

      this.$axios.get("site/goods/getgoodsinfo/" + this.productid).then(res => {
        //   console.log(res)
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
        let zoomArr = [];
        this.imglist.forEach(element => {
          zoomArr.push({
            id: element.id,
            url: element.original_path
          });
        });

        // console.log(this.normal_size);
        this.images.normal_size = zoomArr;
      });
    },
    pageChange() {},
    sizeChange() {},
    // 点击发表评论方法
    submitComment() {
      // 发送请求
      this.$axios
        .post(`site/validate/comment/post/goods/${this.productid}`, {
          commenttxt: this.contentText
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  created() {
    this.getProductInfo();
    //   获取评论数据
    this.$axios
      .get(
        `site/comment/getbypage/goods/${this.productid}?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}`
      )
      .then(res => {
        // console.log(res)
        // 获取评论信息
        this.contentInfo = res.data.message;
      });
  },
  watch: {
    $route(to, from) {
      this.productid = to.params.id;
      // 先清空图片
      this.images.normal_size = [];
      this.getProductInfo();
    }
  }
};
</script>

<style lang="less">
/* 更改图片的样式 */
.tab-content p {
  line-height: 25px;
}
.tab-content img {
  width: 100%;
  /* 解决图片之间c的间隙 */
  display: block;
}

/* 放大镜相关样式  前提是引入less包*/
.pic-box {
  width: 390px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
</style>
