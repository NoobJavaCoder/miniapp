<template>
  <div class="item-box">
    <div :key="index" v-for="(item,index) in star_list" class="xing-btn" :class="answer.one == item.name ? 'hover '+ item.class : item.class" @click="set_one(item.name)">
      <img :src="'img/'+item.name+'@2x.png'" alt="">
    </div>
    <div class="item-top">
      <div class="zanzhu" v-if="pageName == 'home' && item.sponsored">赞助</div>
      <div class="hot" v-if="item.hot ==1"></div>
      <div v-if="pageName == 'my-post'">
        <div class="no-pass" v-if="item.state == 0">该辩题不过审</div>
        <div class="close-btn" @click="del(item.id)"></div>
      </div>

      <form @submit="nima" :data-id="item.id" report-submit="true">
        <button formType="submit" class='click-box'></button>
      </form>
      <div class="face" @click="goTa(item.userId)"><img :src="item.headImgUrl" /></div>
      <div class="name-date" @click="goTa(item.userId)">
        <div class="name-medal">
          <div class="nickname">{{item.nickname}}</div>
          <div class="medal-box" v-if="has_medal">
            <div :key="i" class="medal-item" :class="'medal-'+it.code" v-for="(it,i) in item.lightMedalCodeList "></div>
          </div>
        </div>

        <div class="add-date">{{item.createTime}}</div>
      </div>

    </div>
    <div class="item-mid" :class="pageName == 'detail' ? 'detail' : ''" @click="goto(item.id)" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">
      {{item.debateTopic}}

    </div>
    <div class="item-bottom">
      <div class="tag-btn" @click="go_tag(item.debateTag)" v-if="item.debateTag">{{item.debateTag.name}}</div>

      <form @submit="nima" :data-id="item.id" report-submit="true">
        <button formType="submit" class='btn-f'></button>

        <div class="comment_count btn" @click="goto(item.id)">
          <div class="btn-group">
            <div class="icon"></div>
            <div class="count">{{item.commentCount}}</div>
          </div>

        </div>

      </form>

      <div class="share_count btn" @click="share(item)">
        <div class="btn-group">
          <div class="icon"></div>
          <div class="count">{{item.forwardCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fly from '../utils/fly'
  export default {
    data() {
      return {
        shareId: 0,
        has_medal: false
      }
    },
    props: ['item', 'pageName'],
    methods: {
      setID(id) {
        this.shareId = id
        console.log('0000')
      },
      goto(id) {

        //发送formId 消息
        if (this.pageName !== 'detail') {
          let url = '/pages/detail/main?id=' + id
          wx.navigateTo({ url })
        }
      },
      goTa(id) {
        console.log(id)
        if (id) {
          let url = '/pages/ta/main?id=' + id
          wx.navigateTo({ url })
        }
      },
      share(item) {
        console.log('...000')
        this.$emit('onShare', item)
      },
      del(id) {
        this.$emit('dels', id)
      },

      go_tag(tag) {
        if (this.pageName == 'tags') {
          return false
        }
        let url = '/pages/tags/main?id=' + tag.id + '&title=' + tag.name
        wx.navigateTo({ url })
      },
      nima(e) {
        let id = e.target.dataset.id

        let formId = e.target.formId

        let url = '/api/app/msg-template-form/add'
        fly.post(url, {
          formId: formId
        }).then((res) => {
          console.log(res.retCode)
        })

        this.goto(id)
      }
    },
    onLoad() {
      if (this.item.lightMedalCodeList) {
        this.item.lightMedalCodeList.map(it => {
          if (it.light) {
            this.has_medal = true
          }
        })
      }
    }


  }
</script>

<style scoped>
  .item-box {
    margin: 30rpx;
    border-radius: 20rpx;
    background: #FFF;
  }

  .item-box .item-top {
    padding: 24rpx;
    height: 42rpx;

  }

  .item-top {
    position: relative;
  }

  .item-top .zanzhu {
    position: absolute;
    right: 25rpx;
    font-size: 24rpx;
    color: rgb(196, 198, 211);
  }

  .item-top .face {
    width: 72rpx;
    height: 72rpx;
    float: left;
  }

  .item-top .face img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    border: 1rpx solid #9ea0b5;
  }

  .item-top .name-date {
    float: left;
    margin-left: 11rpx;
    line-height: 30rpx;
    margin-top: 8rpx;
  }

  .tag-btn {
    height: 37rpx;
    position: absolute;
    left: 25rpx;
    top: 12rpx;
    color: rgb(41, 182, 246);
    line-height: 37rpx;
    border: 1rpx solid rgb(41, 182, 246);
    font-size: 22rpx;
    border-radius: 21rpx;
    padding: 0 10rpx;
  }

  .item-mid {
    clear: both;
    font-size: 32rpx;
    color: rgb(26, 26, 28);
    padding: 24rpx;
    line-height: 37rpx;

    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    max-height: 120rpx;

  }

  .item-mid.detail {
    max-height: 370rpx !important;
    overflow: auto;
    padding-bottom: 20rpx;
    -webkit-line-clamp: 7;
    /* background: #000; */
  }



  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);
float: left;
  }

  .add-date {
    font-size: 22rpx;
    color: #b0b2c4;
  }

  .item-bottom {
    height: 32rpx;
    padding: 16rpx;
    position: relative;
    border-top: 1rpx solid rgb(239, 239, 244);
  }

  .item-bottom .btn {
    width: 90rpx;
    height: 40rpx;
    top: 16rpx;
    position: absolute;
  }

  .btn-group {
    text-align: center
  }

  .comment_count.btn {
    right: 200rpx;
  }

  .share_count.btn {
    right: 60rpx;
  }

  .comment_count .icon {
    width: 37rpx;
    height: 35rpx;
    background-image: url(../../static/img/评论@2x.png);
    background-size: 100% 100%;
    float: left;
  }

  .share_count .icon {
    width: 37rpx;
    height: 32rpx;
    background: url(../../static/img/转发@2x.png) 0 3rpx no-repeat;
    background-size: 100% auto;
    float: left;
  }

  .item-bottom .count {
    font-size: 24rpx;
    color: rgb(176, 178, 196);
    float: left;
    margin-left: 10rpx;
  }

  .btn-group {
    width: 110rpx;
    margin: 0 auto;
  }

  .share-btn {
    width: 30%;
    position: absolute;
    right: 20%;
    height: 40rpx;
    opacity: 0;
  }

  .click-box {
    width: 80%;
    position: absolute;
    right: 0;
    height: 122rpx;
    opacity: 0;
  }

  .no-pass {
    position: absolute;
    width: 160rpx;
    height: 40rpx;
    background: rgb(244, 67, 54);
    color: #FFF;
    font-size: 20rpx;
    text-align: center;
    line-height: 40rpx;
    right: 72rpx;
    top: 15rpx;
    border-radius: 20rpx;
  }

  .close-btn {
    width: 24rpx;
    height: 24rpx;
    background: url(../../static/img/close1@2x.png) no-repeat;
    position: absolute;
    right: 25rpx;
    background-size: 100% 100%;
    z-index: 99999;
  }

  .btn-f {
    position: absolute;
    width: 50rpx;
    height: 30rpx;
    opacity: 0;
    right: 256rpx;

  }

  .hot {
    position: absolute;
    top: 21rpx;
    right: 21rpx;
    width: 24rpx;
    height: 31rpx;
    background: #ddd;
    background: url(../../static/img/fire.png) no-repeat;

    background-size: 100% 100%;
  }

  .medal-box {
    float: left;
    margin-left: 8rpx;
    margin-top: 0rpx;
  }

  .medal-box .medal-item {
    height: 30rpx;
    width: 30rpx;
    float: left;
    margin-right: 5rpx;
  }

  .medal-box .medal-item.medal-1 {
    background: url(../../static/img/huozanlittle.png) no-repeat;
    background-size: auto 100%;
  }

  .medal-box .medal-item.medal-2 {
    background: url(../../static/img/fabianlittle.png) no-repeat;
    background-size: auto 100%;
  }
</style>