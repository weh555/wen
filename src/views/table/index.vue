<template>
  <div class="app-container">
    <el-cascader
      placeholder="选择类别"
      v-model="projectTypeValue"
      :options="optionsProjectType"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
    >
    </el-cascader>
    <el-select v-model="value" filterable placeholder="选择区域">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="valueZBDW" filterable placeholder="中标单位">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-date-picker
      v-model="dateZb1"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="招标开始日期"
      end-placeholder="招标结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <el-date-picker
      v-model="dateZb2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="招标开始日期"
      end-placeholder="招标结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
    <el-button type="primary" @click="addBiddingInfo">添加招投标信息</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目名称" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属项目大类" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属项目小类" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目编号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="招标人" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属区域" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="资质要求" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="控制价" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增招投标信息弹窗 -->
    <el-dialog :visible.sync="isAddBiddingInfo" width="60%">
        <el-form ref="addBiddingInfoForm" :model="biddingDetail" label-width="100px">
          <el-row :gutter="0">
            <el-col :span="24">
              <el-form-item label="项目名称">
                <el-input
                  placeholder="请输入项目名称"
                  v-model="biddingDetail.name"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目类别">
                <el-cascader
                  placeholder="选择类别"
                  v-model="biddingDetail.type1"
                  :options="optionsProjectType"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="项目编号">
                <el-input
                  placeholder="请输入项目编号"
                  v-model="biddingDetail.number"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="所属区域">
                <el-select v-model="biddingDetail.area" filterable placeholder="选择区域">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招标人">
                <el-input
                  placeholder="请输入招标人姓名"
                  v-model="biddingDetail.bidder"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资质要求">
                <el-input
                  placeholder="请输入资质要求"
                  v-model="biddingDetail.qualifications"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="控制价">
                <el-input
                  placeholder="请输入控制价"
                  v-model="biddingDetail.controlPrice"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中标金额">
                <el-input
                  placeholder="请输入中标金额"
                  v-model="biddingDetail.biddingMoney"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招标日期">
                <el-input
                  placeholder="请输入招标日期"
                  v-model="biddingDetail.biddingDate"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="开标日期">
                <el-input
                  placeholder="请输入开标日期"
                  v-model="biddingDetail.biddingStartDate"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招标公告链接">
                <el-input
                  placeholder="请输入招标公告链接"
                  v-model="biddingDetail.biddingStarUrl"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中标公告链接">
                <el-input
                  placeholder="请输入中标公告链接"
                  v-model="biddingDetail.biddingUrl"
                  clearable>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="项目分析">
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="biddingDetail.analyze"
                  maxlength="200"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      lb: [],
      projectTypeValue: null,
      optionsProjectType: [
        {
          value: "1",
          label: "国土空间总体规划类项目",
          children: [
            { value: "1-1", label: "县国土空间规划总体规划" },
            { value: "1-2", label: "镇国土空间规划总体规划" },
            { value: "1-3", label: "产业发展规划" },
            { value: "1-4", label: "旅游发展规划" },
            { value: "1-5", label: "其它专项规划" },
          ],
        },
        {
          value: "2",
          label: "详细规划与村规划类项目",
          children: [
            { value: "2-1", label: "控制性详细规划" },
            { value: "2-2", label: "修建性详细规划" },
            { value: "2-3", label: "村规划" },
            { value: "2-4", label: "园区规划" },
          ],
        },
        {
          value: "3",
          label: "国土管理类项目",
          children: [
            { value: "3-1", label: "成片开发" },
            { value: "3-2", label: "国土变更调查" },
            { value: "3-3", label: "耕地后备资源调查" },
            { value: "3-4", label: "选址论证与用地预审" },
            { value: "3-5", label: "调入调出与报件" },
          ],
        },
        {
          value: "4",
          label: "工程类项目",
          children: [
            { value: "4-1", label: "全域土地综合整治" },
            { value: "4-2", label: "生态修复" },
            { value: "4-3", label: "土地整理" },
            { value: "4-4", label: "增减挂钩" },
            { value: "4-5", label: "高标准农田建设" },
          ],
        },
        {
          value: "5",
          label: "乡村振兴类项目",
          children: [
            {
              value: "5-1",
              label: "（农民合作社质量提升整县推进、农业面源污染治理等）",
            },
          ],
        },
        {
          value: "6",
          label: "其它类项目",
          children: [
            {
              value: "6-1",
              label:
                "（数据处理与建库、不动产登记、自然灾害综合风险普查应急综合调查、历史建筑调查、航飞等）",
            },
          ],
        },
      ],
      options: [
        {
          value: "成都市",
          label: "成都市",
        },
        {
          value: "绵阳市",
          label: "绵阳市",
        },
        {
          value: "自贡市",
          label: "自贡市",
        },
        {
          value: "攀枝花市",
          label: "攀枝花市",
        },
        {
          value: "泸州市",
          label: "泸州市",
        },
        {
          value: "德阳市",
          label: "德阳市",
        },
        {
          value: "广元市",
          label: "广元市",
        },
        {
          value: "遂宁市",
          label: "遂宁市",
        },
        {
          value: "乐山市",
          label: "乐山市",
        },
        {
          value: "资阳市",
          label: "资阳市",
        },
        {
          value: "内江市",
          label: "内江市",
        },
        {
          value: "宜宾市",
          label: "宜宾市",
        },
        {
          value: "南充市",
          label: "南充市",
        },
        {
          value: "达州市",
          label: "达州市",
        },
        {
          value: "雅安市",
          label: "雅安市",
        },
        {
          value: "广安市",
          label: "广安市",
        },
        {
          value: "巴中市",
          label: "巴中市",
        },
        {
          value: "眉山市",
          label: "眉山市",
        },
        {
          value: "甘孜州",
          label: "甘孜州",
        },
        {
          value: "阿坝州",
          label: "阿坝州",
        },
        {
          value: "凉山州",
          label: "凉山州",
        },
      ],
      value: "",
      valueZBDW: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dateZb1: "",
      dateZb2: "",
      isAddBiddingInfo: false,
      // 招投标详细信息
      biddingDetail: {
        name: '',
        type1: '',
        type2: '',
        number: '',
        bidder: '', //
        area: '', // 区域
        qualifications: '', // 资质要求
        biddingDate: '', // 招标日期
        biddingStartDate: '', // 开标日期
        biddingCompany: '', // 中标单位
        controlPrice: '', // 控制价格
        biddingMoney: null,
        biddingStarUrl: '',
        biddingUrl: '',
        analyze: '',
        participatingUnit: [] //参与单位
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      console.log(1)
      getList().then((response) => {
        console.log(response)
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    addBiddingInfo() {
      this.isAddBiddingInfo = !this.isAddBiddingInfo;
    },
    handleChange() {
      console.log('handleChange')
    }
  },
};
</script>

<style scoped>
.addBiddingInfo {
  width: 70rem;
  height: 40rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: bisque;
}
</style>
