<template>
  <div class="main">
    <el-row>
      <el-col :span="12">
        <div class="pic">
          <ZEchart 
            height="350px"
            width="100%"
            :data="barData"
            :option="{reverse: false, xData:['一月', '二月', '三月', '四月'], title: 'SKU销售日报'}"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="pic">
          <ZEchart 
            height="350px"
            width="100%"
            type="Pie"
            :data="pieData"
            :option="{title: '菜品售出统计'}"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang='ts'>
import ZEchart from '../../components/ZEchart/ZEchart.vue';
import { reactive } from 'vue';

const barData = reactive({
  '小份': [156,299,368,488,522],
  '中份': [545,467,387,332,451],
  '大份': [756,445,229,672,245]
})

const pieData = reactive({
  seriesName: '菜品统计',
  seriesData: [
    { value: 730, name: '小炒肉' },
    { value: 210, name: '番茄炒鸡蛋' },
    { value: 330, name: '清蒸鲈鱼' },
    { value: 530, name: '小龙虾' },
    { value: 600, name: '蒜蓉青菜' }
]
})
</script>
<style lang='scss' scoped>
.main {
  padding: 16px;
}
.pic {
  height: 300px;
  margin-right: 16px;
}
</style>