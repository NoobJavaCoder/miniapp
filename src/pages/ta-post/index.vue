<template>
  <div class="page-main" @click="clickHandle('test click', $event)">
    <div v-for="(item,index) in lists" :key="index">
      <post-item :item="item" pageName="pageName"></post-item>
    </div>
    <div class="nothing" v-if="lists.length < 1"></div>
    <!-- <nav-bar :pageName="pageName"></nav-bar> -->
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import utils from '../../utils'
  import navBar from '@/components/nav-bar'
  import postItem from '@/components/post-item'
  export default {

    data() {
      return {
        pageName: 'ta-post',
        lists: [],
        id: 0
      }
    },

    components: {
      navBar,
      postItem
    },
    methods: {

      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev)
      },
      get_index_list() {
        const self = this
        fly.post('/api/app/dabate-topic/list-person', {
            userId: this.id,
            page: 1,
            pageSize: 30
          })
          .then(function (response) {
            if (response.retCode === 0) {
              //渲染列表
              self.lists = response.result
              self.lists.map(item => {
                if (!item.forwardCount) {
                  item.forwardCount = '分享'
                }
                if (!item.commentCount) {
                  item.commentCount = '评论'
                }
                item.createTime = utils.formatTime(new Date(item.createTime))
                return item
              })
              console.log(self.lists)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onShow() {
      this.id = this.$root.$mp.query.id
      console.log(this.id)
      this.get_index_list()
    },
    onHide() {
      this.lists = []
    },
    onLoad() {
      wx.setNavigationBarTitle({
        title: 'ta的辩题'
      })


    },
    onPullDownRefresh() {

      this.get_index_list()
      wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
      this.nowPage += 1
      this.get_index_list()
    },
    onShareAppMessage: function (opts) {
      let shareData = opts.target.dataset.share
      console.log(shareData)
      return {

        title: shareData.debateTopic,

        path: '/pages/detail/main?id=' + shareData.id,
        imageUrl: shareData.headImgUrl,
        success: function (res) {
          let url = '/api/app/dabate-topic/forward'
          let data = {
            debateTopicId: shareData.id
          }
          fly.post(url, data)

        },
        fail: function (e) {
          console.log(e)
        }


      }

    },
  }
</script>

<style scoped>
  .page-main {
    background: rgb(245, 246, 248);
    margin-bottom: 150rpx
  }
</style>