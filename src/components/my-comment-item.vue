<template>
  <div class="item-box">
    <div class="item-top">

      <div class="face"><img :src="item.headImgUrl" /></div>
      <div v-if="pageName == 'my-comment'">
        <div class="no-pass" v-if="item.state == 0">该评论不过审</div>
        <div class="like-btn close-btn" @click="dels(item.commentId)">

        </div>
      </div>
      <div class="name-date">
        <div class="nickname">{{item.nickname}} </div>
        <div class="add-date">{{item.createTime}}</div>
      </div>
    </div>
    <div v-if="item.debateTopic != '该辩题已删除'" class="item-mid" >
      <p v-if="item.replyNickname"><span class="r-name">回复<span class="h-name" @click="gota(item.replyUserId)">{{item.replyNickname}}</span>：</span> <span @click="goto(item.debateTopicId)">{{item.content}}</span></p>
      <p v-if="!item.replyNickname">{{item.content}}</p>
    </div>

    <div v-if="item.debateTopic == '该辩题已删除'" class="item-mid">
      <p>{{item.content}}</p>
    </div>



    <div v-if="item.debateTopic != '该辩题已删除'" class="item-bottom" @click="goto(item.debateTopicId)" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">
      <p v-if="!item.replyNickname">{{item.debateTopic}}</p>
      <div v-if="item.replyNickname">
        <p class="rep-text">{{item.replyCommentContent}}</p>
        <div class="bianti-box">
          {{item.debateTopic}}
        </div>
      </div>
    </div>

    <div v-if="item.debateTopic == '该辩题已删除'" class="item-bottom" :style="item.debateTopic.length > 60 ? 'margin-bottom:20rpx': ''">
      <p v-if="!item.replyNickname">{{item.debateTopic}}</p>
      <p v-if="item.replyNickname">{{item.content}}</p>
    </div>


  </div>
</template>

<script>
  export default {
    props: ['item', 'pageName'],
    methods: {
      goto(id) {
        let url = "/pages/detail/main?id=" + id
        wx.navigateTo({ url })
      },
      gota(id){
        let url = "/pages/ta/main?id=" + id
        wx.navigateTo({ url })
      },
      dels(id) {
        this.$emit('dels', id)
      }
    },
    onLoad() {
      // if(this.item.content.length > 40) {
      //   this.item.content = this.item.content.substr(0,40)+'...'
      // }
      // if(this.item.replyCommentContent &&  this.item.replyCommentContent.length > 40){
      //   this.item.replyCommentContent = this.item.replyCommentContent.substr(0,40)+'...'
      // }
    }
  }
</script>

<style scoped>
  .item-box {
    margin: 10rpx 0;
    border-radius: 0rpx;
    background: #FFF;
    padding-bottom: 30rpx;
  }

  .item-box .item-top {
    padding: 24rpx;
    position: relative;
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
  }

  .item-top .name-date {
    float: left;
    margin-left: 11rpx;
    line-height: 30rpx;
    margin-top: 8rpx;
  }

  .item-mid {
    clear: both;
    font-size: 28rpx;
    color: rgb(26, 26, 28);
    padding: 23rpx 53rpx;
    line-height: 30rpx;
  }



  .nickname {
    font-size: 24rpx;
    color: rgb(158, 160, 181);

  }

  .add-date {
    font-size: 22rpx;
    color: #b0b2c4;
  }

  .item-bottom {
    padding: 23rpx;
    border-radius: 10rpx;
    margin: 0 30rpx;
    font-size: 30rpx;
    line-height: 30rpx;
    background: rgb(245, 246, 248);
    color: rgb(176, 178, 196);
    overflow-y: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    /* max-height: 130rpx; */
  }

  .like-btn.close-btn {

    float: right;
    text-align: left;
    padding-left: 0rpx;
    font-size: 24rpx;
    height: 24rpx;
    margin-right: 6rpx;
    width: 24rpx;
    margin-top: 30rpx;
    background: url(../../static/img/close1@2x.png) no-repeat;
    background-size: auto 100%;
    color: rgb(176, 178, 196);
  }

  .btn-group {
    width: 110rpx;
    margin: 0 auto;
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
    top: 44rpx;
    border-radius: 20rpx;
  }

  .r-name {
    color: rgb(158, 160, 181);
  }

  .bianti-box {
    background: #FFF;
    border-radius: 10rpx;
    padding: 23rpx 12rpx;
    margin-top: 23rpx;
    font-size: 28rpx;
    margin-left: -8rpx;
    margin-right: -8rpx;
  }

  span.h-name {
    color: rgb(41, 182, 246);
  }
  .rep-text {
    color:rgb(26, 26, 28);
  }
</style>