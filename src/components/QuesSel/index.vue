<template>
  <div class="queList">
    <div class="title">点击左侧列表选择题目</div>
    <div class="content">
      <div class="list">
        <div class="titleName">题目列表</div>
        <div v-for="(i,index) in qstList" :class="{chooseItem: i.id === qstId}" :key="index" class="item" @click="chooseThis(index)">{{ i.id + '.' + i.title + '(' + i.tab + ')' }}</div>
      </div>
      <div class="sel">
        <div class="titleName">已选择题目</div>
        <div class="item">{{ chooseItem.id + '.' + chooseItem.title }}</div>
      </div>
    </div>
    <div class="sub" @click="subSel">确定选择</div>
  </div>

</template>

<script>
export default {
  name: 'UpLoad',
  props: {
    index: {
      required: true,
      type: Number
    },
    qst_id: {
      type: Number,
      default: -1
    },
    qstList: {
      required: true,
      type: Array,
      default() {
        return [{
          title: '',
          id: 6
        }]
      }
    }
  },
  data() {
    return {
      chooseItem: {},
      qstId: -1
    }
  },
  computed: {

  },
  updated: function() {

  },
  mounted: function() {
    if (this.qst_id !== -1) {
      this.chooseItem = this.qstList.filter(obj => obj.id === this.qst_id)[0]
      this.qstId = this.qst_id
    }
  },
  methods: {
    chooseThis(it) {
      this.chooseItem = this.qstList[it]
      this.qstId = this.chooseItem.id
    },
    subSel() {
      this.$emit('choose', { index: this.index, chooseItem: this.chooseItem })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.queList{
  text-align: center;
  .title{
    font-size: 25px;
    line-height: 55px;
  }
  .content{
    text-align: left;
    border: 1px solid gray;
    height: 300px;
    margin-top: 20px;
    > div{
      float: left;
      width: 50%;
      height: 300px;
      overflow-y: scroll;
      .titleName{
        text-align: center;
      }
      .item{
        padding-left: 10px;
        line-height: 30px;
        cursor: pointer;
        &:hover{
          background:cornflowerblue;
        }

      }

    }
  }
  .sub{
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 100px;
    margin-left: -50px;
    cursor: pointer;
    line-height: 35px;
    border-radius: 15px;
    background: lemonchiffon;
    border: 1px solid royalblue;
    &:hover{
      background:cornflowerblue;
    }
  }

}
.chooseItem{
  background: yellow;
}
</style>
