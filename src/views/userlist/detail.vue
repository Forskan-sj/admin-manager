<template>
  <div class="app-container">
    <el-form label-width="260px">
      <el-form-item label="昵称：">
        <div class="testsdf" v-text="pageData.user.nickname"/>
      </el-form-item>
      <el-form-item label="头像：">
        <img :src="pageData.user.avatar" alt="">
      </el-form-item>
      <el-form-item label="代理等级:" >
        <div class="testsdf" v-text="province_list[pageData.user.level - 1]"/>
      </el-form-item>
      <el-form-item label="手机号:">
        <div class="testsdf" v-text="pageData.user.mobile"/>
      </el-form-item>
      <el-form-item label="当前级别:" >
        <div class="testsdf" v-text="pageData.user.user_level.level"/>
      </el-form-item>
      <el-form-item label="升级进度:" >
        <div>{{ '已完成:' + parseInt(pageData.user.user_level.wc) + '%， 还差' + (pageData.user.user_level.next_score - pageData.user.user_level.now_score) + '钻石' }}</div>
      </el-form-item>
      <el-form-item label="专训勋章:" >
        <div v-if="pageData.medal.length">
          <img v-for="(item) in pageData.medal" :key="item.mid" :src="item.is_over ? cdn + item.img1 : cdn + item.img2">
        </div>
      </el-form-item>
      <el-form-item label="互动得分:" >
        <div v-if="pageData.honour.interact.length" class="asdfa">
          <div v-for="(item) in pageData.honour.interact" :key="item.mid">
            <div>{{ item.title + '：' + item.score }}</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="课程得分:" >
        <el-table
          v-loading="listLoading"
          :key="tableKey"
          :data="pageData.honour.course"
          border=""
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column :label="'课程名'" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'听课得分'" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.course_num }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'单选得分'" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.choose_num }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'问答题得分'" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.answer_num }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getInfo } from '@/api/college'
export default {
  name: 'ManagerDetail',
  data() {
    return {
      path: 'user',
      province_list: [
        '品牌合作分公司',
        '分公司董事',
        '分公司营销总监',
        '一级授权代理',
        '二级授权代理',
        '三级授权代理',
        '特约授权代理'
      ],
      tableKey: 0,
      pageData: {
        user: {
          nickname: '',
          mobile: '',
          level: '',
          avatar: '',
          user_level: {
            level: '',
            now_score: '',
            next_score: '',
            wc: ''
          }
          // address: '',
          // birthday: '',
          // is_assistant: 0,
          // is_local: 0,
          // sex: 0,
        },
        medal: [],
        honour: {
          interact: [],
          course: []
        }

      },
      bEdit: false,
      listLoading: false,
      cdn: 'https://cdncollege.quansuwangluo.com/'
    }
  },
  mounted() {
    this.bEdit = this.$route.params.id !== '0'
    if (this.bEdit) {
      this.getInfos(this.$route.params.id)
    }
    this.listLoading = true
  },
  methods: {
    getInfos(id) {
      this.listLoading = true
      getInfo(this.path, { id }).then(response => {
        this.pageData = response.data.datas
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.divContent{
  background:#f3f7f9;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}
.delete{
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  font-size: 40px;
  line-height: 30px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  border: 1px solid gray;
  border-radius: 50%;
  transform: rotate(45deg);
  cursor: pointer;
}
.title{
  clear: both;
  font-size: 18px;
}
img{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid gray;
  object-fit: cover;
}
</style>

