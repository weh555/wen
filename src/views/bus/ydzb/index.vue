<template>
  <div class="container">
    <div class="left-panel">
      <div v-for="item in menu" :class="['menu', item.id == menuOpt ? 'menu-focus-color' : 'menu-unfocus-color']"
        @click="menuClick(item)">
        <!-- <i class="fa fa-camera-retro"></i> -->
        <font-awesome-icon :icon="item.icon"></font-awesome-icon>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="content">
      <!-- 指标分布 -->
      <div class="zbfb" v-show="menuOpt == 1">
        <div :class="['prj-data', isShowLeftTree ? 'prj-data-show' : 'prj-data-hide']">
          <div class="left-main-info">
            <!-- 顶部左侧搜索 -->
            <div class="top-search">
              <el-input placeholder="搜索项目名称" v-model="filterText" prefix-icon="el-icon-search" size="small">
              </el-input>
            </div>
            <div class="content-tree">

              <el-tree :props="props" :render-content="renderContentTree" :data="projectTree" node-key="level"
                :default-expanded-keys="['现状数据', '规划数据', '项目数据']" show-checkbox @check-change="handleCheckChange"
                :filter-node-method="filterNode" ref="tree" class="p-tree">

              </el-tree>


            </div>
          </div>
          <div class="map-right-control" @click="hideLeftTreeHandle">

            <i small class="el-icon-arrow-left" v-show="this.isShowLeftTree"></i>
            <i small class="el-icon-arrow-right" v-show="!this.isShowLeftTree"></i>

          </div>
        </div>
        <div class="map">
          <mapContainer />
        </div>
      </div>
      <!-- 指标监测 -->
      <div class="zbjc" v-show="menuOpt == 2">
        <!-- 指标分类统计 -->
        <div class="card-panel">
          <div class="card hvr-grow-shadow">
            <p class="title">增减挂钩结余指标</p>
            <div class="item-box" style="display: flex; flex-wrap: wrap;">
              <div class="item-div1">
                <span>存量结余指标：3271.3187亩</span>
              </div>
              <div class="item-div2">
                <span>预估转换价值：15327.23万元</span><br>
              </div>
              <div class="item-div1">
                <span>预计一年内新增结余指标：1521.5796亩</span>
              </div>
              <div class="item-div2">
                <span>预计三年内新增结余指标：1521.5796亩</span>
              </div>

            </div>
          </div>
          <div class="card hvr-grow-shadow" style="background: rgb(207, 109, 92)">
            <p class="title">新增耕地指标</p>
            <div class="item-box">
              <div class="item-div1">
                <span>存量占补平衡指标：3271.3187亩</span>

              </div>
              <div class="item-div2">
                <span>预估转换价值：15327.23万元</span><br>

              </div>
              <div class="item-div1">
                <span>预计一年内新增耕地指标：1521.5796亩</span>

              </div>
              <div class="item-div2">
                <span>预计三年内新增耕地指标：1521.5796亩</span>

              </div>
            </div>
          </div>
          <div class="card hvr-grow-shadow" style="background: rgb(57, 172, 144)">
            <p class="title">其中：新增水田指标</p>
            <div class="item-box">
              <div class="item-div1">
                <span>存量水田占补平衡指标：3271.3187亩</span>

              </div>
              <div class="item-div2">
                <span>预估转换价值：15327.23万元</span>
              </div>
              <div class="item-div1">
                <span>预计一年内新增水田指标：1521.5796亩</span>
              </div>
              <div class="item-div2">
                <span>预计三年内新增水田指标：1521.5796亩</span>
              </div>
            </div>
          </div>
          <!-- <div class="card hvr-grow-shadow" style="background: #E6A23C">
            <p class="title">新增旱地指标</p>
            <span>新增指标：3271.3187亩</span><br>
            <span>转换价值：15327.23万元</span><br>
            <span>存量指标：1521.5796亩</span>
          </div>
          <div class="card hvr-grow-shadow" style="background: rgb(107, 120, 152)">
            <p class="title">“旱改水”指标</p>
            <span>新增指标：3271.3187亩</span><br>
            <span>转换价值：15327.23万元</span><br>
            <span>存量指标：1521.5796亩</span>
          </div>
          -->
        </div>
        <!-- 指标分区整体情况 -->
        <div class="zbtj-content">
          <div class="header">
            <span>全域土地指标整体情况</span>
            <!-- 右侧下拉框 -->
            <el-select v-model="selectKey" placeholder="请选择" size="small">
              <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="chart-content">
            <!-- <div class="card">
              <p class="p-title">全域存量土地指标整体使用情况</p>
              <div class="desc">
                其中2022年使用存量建设用地指标<i>xx亩，xx亿元</i>；使用新增耕地指标<i>xx亩，xx亿元</i>；使用新增水田指标<i>xx亩，xx亿元</i>；使用“旱改水”指标<i>xx亩，xx亿元</i>
              </div>
              <div class="chart-panel">

                <div class="left-circle label-panel">
                  <p>下达指标：</p>
                  <p class="num">200,000<i>亩</i></p>
                </div>
                <div class="dashboard" ref="dashboard"></div>
                <div class="big-circle">
                  <div class="chart-title-div">
                    使用进度
                  </div>
                </div>
                <div class="right-circle label-panel">
                  <p>购买指标：</p>
                  <p class="num">200,000<i>亩</i></p>
                </div>
              </div>
            </div> -->
            <div class="card">
              <p class="p-title">增减挂钩结余指标 <span style="margin-left: 17em;">占补平衡指标</span></p>
              <div class="chart-box">
                <div style="width: 50%; height: 98%; float: left;">
                  <div style="width: 100%; line-height: 18px">
                    <div style="width: 100%; font-size:12px">年度指标任务：<span
                        style="color: red; font-weight: bold">689亩</span></div>
                    <div style="width: 100%; font-size:12px">
                      <div>年度增减挂钩结余指标转换价值：<span style="color: red; font-weight: bold">3741万元</span></div>
                      <div>年度增减挂钩结余指标外部购买：<span style="color: red; font-weight: bold">4451万元</span></div>
                    </div>
                  </div>
                  <div style="height: 78%;width: 100%;" ref="char11"></div>

                </div>
                <div style="width: 50%; height: 98%; float: left;">
                  <div style="width: 100%; line-height: 18px">
                    <div style="width: 100%; font-size:12px">年度指标任务：<span
                        style="color: red; font-weight: bold">287亩</span></div>
                    <div style="width: 100%; font-size:12px">
                      <div>年度增减挂钩结余指标转换价值：<span style="color: red; font-weight: bold">1821万元</span></div>
                      <div>年度增减挂钩结余指标外部购买：<span style="color: red; font-weight: bold">2131万元</span></div>
                    </div>
                  </div>
                  <div style="height: 78%;width: 100%;" ref="char12"></div>
                </div>
              </div>
            </div>
            <div class="card">
              <p class="p-title">下达指标和购买指标历史走势图</p>
              <div class="chart2" ref="chart2"></div>
            </div>
            <div class="card">
              <p class="p-title">全域年度指标供应结构分布图</p>
              <div class="chart3" ref="chart3"></div>
            </div>
            <div class="card">
              <p class="p-title">全域指标供应结构分布图 <span style="margin-left: 16em;">年度全域指标供应价值分布图</span></p>
              <div class="chart-box">
                <div class="chart4" ref="chart4"></div>
                <div class="chart5" ref="chart5"></div>
              </div>

            </div>

            <div class="card card-twice-width">
              <p class="p-title">国土整治指标构成</p>
              <div class="chart6" ref="chart6"></div>
            </div>

          </div>

        </div>

      </div>
      <!-- 指标台账 -->
      <div class="zbfx" v-show="menuOpt == 3">
        <div class="top-search-panel">
          <el-input size="small" class="search-input" v-model="zbtz.key" placeholder="请输入关键字"></el-input>
          <el-button size="small" class="search-btn" type="primary">搜索</el-button>
        </div>
        <div class="content-table-div">
          <el-tabs class="tab" v-model="zbtz.activeMenuName" @tab-click="zbfxTabsClick">
            <el-tab-pane v-show="zbtz.activeMenuName == 1" label="全部" name="1">
              <div class="opt-1">
                <div class="tb-panel">
                  <el-table height="100%" :data="zbtz.tableData" style="width: 100%">
                    <!-- <el-table-column fixed prop="id" label="id" width="100">
                    </el-table-column> -->
                    <el-table-column fixed type="index" width="50">
                    </el-table-column>
                    <el-table-column fixed prop="xmmc" label="项目名称" width="300">
                    </el-table-column>
                    <el-table-column prop="p1" align="center" label="新增耕地指标面积（亩）" width="200">
                    </el-table-column>
                    <el-table-column prop="p13" align="center" label="其中：新增水田面积（亩）" width="240">
                    </el-table-column>
                    <el-table-column prop="p2" align="center" label="指标耕地等级" width="200">
                    </el-table-column>
                    <el-table-column prop="p3" align="center" label="耕地指标单价（万/亩）" width="240">
                    </el-table-column>
                    <el-table-column prop="p4" align="center" label="粮食产能单价（万/亩）" width="240">
                    </el-table-column>
                    <el-table-column prop="p5" align="center" label="交易指导价格（万元）" width="200">
                    </el-table-column>
                    <el-table-column prop="p6" align="center" label="指标归属" width="120">
                    </el-table-column>
                    <el-table-column prop="p7" align="center" label="是否管护期" width="120">
                    </el-table-column>
                    <el-table-column prop="p8" align="center" label="位置查看" width="120">
                    </el-table-column>
                    <el-table-column prop="p9" align="center" label="新增耕地验收合格证书号" width="320">
                    </el-table-column>
                    <el-table-column prop="p10" align="center" label="全国耕地占卜平衡动态监管系统备案号" width="320">
                    </el-table-column>
                    <el-table-column prop="p11" align="center" label="备注" width="320">
                    </el-table-column>
                    <el-table-column prop="p12" align="center" label="操作" width="320">
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination class="page-size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="zbtz.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper" :total="40">
                </el-pagination>
              </div>

            </el-tab-pane>
            <el-tab-pane v-show="zbtz.activeMenuName == 2" label="新增耕地类项目列表" name="2">
              <div class="opt-1">
                <div class="tb-panel">
                  <el-table height="100%" :data="zbtz.tableData" style="width: 100%">
                    <!-- <el-table-column fixed prop="id" label="id" width="100">
                    </el-table-column> -->
                    <el-table-column fixed type="index" width="50">
                    </el-table-column>
                    <el-table-column fixed prop="xmmc" label="项目名称" width="300">
                    </el-table-column>
                    <el-table-column prop="p1" align="center" label="新增耕地指标面积（亩）" width="200">
                    </el-table-column>
                    <el-table-column prop="p13" align="center" label="其中：新增水田面积（亩）" width="240">
                    </el-table-column>
                    <el-table-column prop="p2" align="center" label="指标耕地等级" width="200">
                    </el-table-column>
                    <el-table-column prop="p3" align="center" label="耕地指标单价（万/亩）" width="240">
                    </el-table-column>
                    <el-table-column prop="p4" align="center" label="粮食产能单价（万/亩）" width="240">
                    </el-table-column>
                    <el-table-column prop="p5" align="center" label="交易指导价格（万元）" width="200">
                    </el-table-column>
                    <el-table-column prop="p6" align="center" label="指标归属" width="120">
                    </el-table-column>
                    <el-table-column prop="p7" align="center" label="是否管护期" width="120">
                    </el-table-column>
                    <el-table-column prop="p8" align="center" label="位置查看" width="120">
                    </el-table-column>
                    <el-table-column prop="p9" align="center" label="新增耕地验收合格证书号" width="320">
                    </el-table-column>
                    <el-table-column prop="p10" align="center" label="全国耕地占卜平衡动态监管系统备案号" width="320">
                    </el-table-column>
                    <el-table-column prop="p11" align="center" label="备注" width="320">
                    </el-table-column>
                    <el-table-column prop="p12" align="center" label="操作" width="320">
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination class="page-size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="zbtz.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper" :total="40">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane v-show="zbtz.activeMenuName == 2" label="增减挂钩项目列表" name="3">

              <div class="opt-1">
                <el-table height="88%" :data="zbtz.zjgTable" style="width: 100%" class="data-table">
                  <!-- <el-table-column fixed prop="id" label="id" width="100">
                  </el-table-column> -->
                  <el-table-column fixed type="index" width="50">
                  </el-table-column>
                  <el-table-column fixed prop="xmmc" label="项目名称" width="300">
                  </el-table-column>
                  <el-table-column prop="p1" align="center" label="归还挂钩周转指标（亩）" width="200">
                  </el-table-column>
                  <el-table-column prop="p2" align="center" label="自愿退出宅基地预留指标（亩）" width="240">
                  </el-table-column>
                  <el-table-column prop="p3" align="center" label="结余指标（亩）" width="120">
                  </el-table-column>
                  <el-table-column prop="p4" align="center" label="预计指标价值（万元）" width="200">
                  </el-table-column>
                  <el-table-column prop="p5" align="center" label="指标归属" width="120">
                  </el-table-column>
                  <el-table-column prop="p6" align="center" label="位置查看" width="120">
                  </el-table-column>
                  <el-table-column align="center" label="四川省城乡建设用地增减挂钩指标确认函" width="320">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <el-image style="width: 100px; height: 100px" src="http://localhost/file/zjg.jpg"
                          :preview-src-list="['http://localhost/file/zjg.jpg']">
                        </el-image>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.p7 }}</el-tag>
                        </div>
                      </el-popover>
                      <a style="color: blue;" href="http://localhost/file/zjg.jpg"></a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="p8" label="备注" width="320">
                  </el-table-column>
                  <el-table-column prop="p9" label="操作" width="320">
                    <!-- <template slot="header" slot-scope="scope">
                      <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                    </template> -->
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="handleTable3Edit(scope.$index, scope.row)">Edit</el-button>
                      <el-button size="mini" type="danger"
                        @click="handleTable3Delete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination class="page-size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="zbtz.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import data from '@/mock/data.js'
import mapContainer from '@/components/map/init.vue'
export default {
  name: '',

  data() {
    return {
      menu: [
        { id: 1, icon: 'fa-regular fa-file-lines', label: '指标分布' },
        { id: 2, icon: 'fa-regular fa-file-lines', label: '指标监测' },
        { id: 3, icon: 'fa-regular fa-file-lines', label: '指标台账' },
      ],
      menuOpt: 3,
      filterText: '', // 左侧面版搜索内容

      // 左侧树
      isShowLeftTree: true,
      projectTree: [
        {
          label: '储备项目', level: '1', url: '', children: [
            { label: '林地生态修复保护', level: '1-2', url: '', children: null },
            {
              label: '矿山生态修复', level: '1-3', url: '', children: [
                { label: '广安区关闭矿山生态修复项目', level: '1-3-1', url: '', children: null },
                { label: '前锋区关闭非煤矿山生态修复项目', level: '1-3-2', url: '', children: null },
                { label: '岳池县关闭非煤矿山生态修复项目', level: '1-3-3', url: '', children: null },
                { label: '武胜县关闭矿山生态修复项目', level: '1-3-4', url: '', children: null },
                { label: '邻水县关闭矿山生态修复项目 ', level: '1-3-5', url: '', children: null },
                { label: '华蓥市工矿废弃地复垦项目', level: '1-3-6', url: '', children: null },
                { label: '高顶山矿区生态修复和基础设施建设项目 ', level: '1-3-7', url: '', children: null },

              ]
            },
            {
              label: '农用地整理', level: '1-4', url: '', children: [
                { label: '广安区土地整理项目', level: '1-4-1', url: '', children: null },
                { label: '广安区高标准农田建设项目', level: '1-4-2', url: '', children: null },
                { label: '前锋区土地整理项目', level: '1-4-3', url: '', children: null },
                { label: '前锋区高标准农田建设项目', level: '1-4-4', url: '', children: null },
                { label: '岳池县土地整理项目 ', level: '1-4-5', url: '', children: null },
                { label: '岳池县高标准农田建设项目', level: '1-4-6', url: '', children: null },
                { label: '武胜县土地整理项目 ', level: '1-4-7', url: '', children: null },
                { label: '武胜县高标准农田建设项目 ', level: '1-4-8', url: '', children: null },
                { label: '邻水县高标准农田建设项目 ', level: '1-4-9', url: '', children: null },
                { label: '华蓥市高标准农田建设项目 ', level: '1-4-10', url: '', children: null },
              ]
            },
            { label: '土壤污染治理', level: '1-5', url: '', children: null },
            { label: '人居环境综合整治', level: '1-6', url: '', children: null },
            { label: '水土流失治理', level: '1-7', url: '', children: null },
            {
              label: '城乡建设用地增减挂钩', level: '1-8', url: '', children: [
                { label: '广安区城乡建设用地增减挂钩项目', level: '1-8-1', url: '', children: null },
                { label: '前锋区城乡建设用地增减挂钩项目', level: '1-8-2', url: '', children: null },
                { label: '岳池县城乡建设用地增减挂钩项目', level: '1-8-3', url: '', children: null },
                { label: '武胜县城乡建设用地增减挂钩项目', level: '1-8-4', url: '', children: null },
                { label: '邻水县城乡建设用地增减挂钩项目', level: '1-8-5', url: '', children: null },
                { label: '华蓥市城乡建设用地增减挂钩项目', level: '1-8-6', url: '', children: null },
              ]
            },
            { label: '水环境生态综合治理', level: '1-9', url: '', children: null },
            { label: '全域土地综合整治试点', level: '1-10', url: '', children: null },
          ]
        },
        {
          label: '在建项目', level: '2', url: '', children: [
            {
              label: '林地生态修复保护', level: '2-1', url: '', children: null
            }, {
              label: '矿山生态修复', level: '2-2', url: '', children: [
                { label: '广安区郑山乡、蒲莲乡工矿废弃地复垦利用试点项目', level: '2-2-1', url: '', children: null },
              ]
            }, {
              label: '农用地整理', level: '2-3', url: '', children: [
                { label: '广安区花桥镇龙盐村、竹林村、石鼓村土地整理项目', level: '2-3-1', url: '', children: null },
                { label: '华蓥市2022年第一批土地开发复垦项目', level: '2-3-2', url: '', children: null },
                { label: '岳池县裕民镇水井湾村、桥洞村、祖家院村、石佛寺村、土地堂村、石朝门村、山羊寺村土地整理项目', level: '2-3-3', url: '', children: null },
                { label: '岳池县裕民镇芝字坝村、樊家桥村、断桥沟村、陶家沟村、新桥村、古迹山村、彭家场村、丁家湾村土地整理项目', level: '2-3-4', url: '', children: null },
                { label: '岳池县白庙镇冬笋沟村、舞凤山村、安宁寺村、三溪口村、安家观村土地整理项目', level: '2-3-5', url: '', children: null },
                { label: '岳池县裕民镇广兴场村、石佛寺村、土地堂村、香炉嘴社区、羊山寺村、祖家院村土地整理项', level: '2-3-6', url: '', children: null },
                { label: '武胜县永胜乡碑湾村、黄角坪村、龙兴村、平桥村、西寨村土地整理项目', level: '2-3-7', url: '', children: null },
              ]
            },
            { label: '土壤污染治理', level: '2-4', url: '', children: null },
            { label: '人居环境综合治理', level: '2-5', url: '', children: null },
            { label: '水土流失治理', level: '2-6', url: '', children: null },
            {
              label: '城乡建设用地增减挂钩', level: '2-7', url: '', children: [
                { label: '邻水县城乡建设用地增减挂钩项目', level: '2-7-1', level: '2-7-1', url: '', children: null },
                { label: '华蓥市城乡建设用地增减挂钩项目', level: '2-7-2', url: '', children: null },
                { label: '前锋区城乡建设用地增减挂钩项目', level: '2-7-3', url: '', children: null },
              ]
            },
            { label: '其他行业专项规划', level: '2-8', url: '', children: null },
            {
              label: '水环境生态综合治理', level: '2-9', url: '', children: [
                { label: '全域土地综合整治试点', level: '2-9-1', url: '', children: null },
              ]
            },
          ]
        },
        {
          label: '入库项目', level: '3', url: '', children: [
            { label: '林地生态修复保护', level: '3-1', url: '', children: null },
            {
              label: '矿山生态修复', level: '3-2', url: '', children: [
                { label: '广安区兴平镇、悦来镇、杨坪乡工矿废弃地复垦利用试点项目', level: '3-2-1', url: '', children: null },
                { label: '广安区石笋镇、大安镇工矿废弃地复垦利用试点项目', level: '3-2-2', url: '', children: null },
                { label: '前锋区桂兴镇、虎城镇、龙塘街道工矿废弃地复垦利用试点项目', level: '3-2-3', url: '', children: null },
                { label: '华蓥市工矿废弃地复垦利用试点项目', level: '3-2-4', url: '', children: null },
              ]
            }, {
              label: '农用地整理', level: '3-3', url: '', children: [
                { label: '武胜县2021年高标准农田建设项目', level: '3-3-1', url: '', children: null },
                { label: '岳池县天平镇桥亭子等（7）个村土地整理项目', level: '3-3-2', url: '', children: null },
                { label: '前锋区小井乡双流村、优良村、骑龙村、优胜村土地整理项目', level: '3-3-3', url: '', children: null },
                { label: '广安市广安区龙台镇车堂村、小桥村、团结村、云龙村、高埝村、塔水村、三拱村土地整理项目', level: '3-3-4', url: '', children: null },
                { label: '广安市广安区协兴镇先锋村、春堡村土地整理项目', level: '3-3-5', url: '', children: null },
              ]
            },
            { label: '土壤污染治理项目', level: '3-4', url: '', children: null },
            { label: '人居环境综合整治项目', level: '3-5', url: '', children: null },
            { label: '水土流失治理', level: '3-6', url: '', children: null },
            {
              label: '城乡建设用地增减挂钩', level: '3-7', url: '', children: [
                { label: '广安区花桥镇城乡建设用地增减挂钩项目', level: '3-7-1', url: '', children: null },
                { label: '广安区广门乡与枣山镇伍佳村、三圣村城乡建设用地增减挂钩试点项目', level: '3-7-2', url: '', children: null },
                { label: '广安区枣山镇与枣山镇黑虎村城乡建设用地增减挂钩试点项目', level: '3-7-3', url: '', children: null },
                { label: '武胜县龙女镇青岩村、幸福村、马耳石村、袁家庙村城乡建设用地增减挂钩试点项目', level: '3-7-4', url: '', children: null },
                { label: '武胜县清平镇白果村、陈家寨村、石岭村、红东村、会云村城乡建设用地增减挂钩试点项目', level: '3-7-5', url: '', children: null },
                { label: '岳池县北城乡普庵寺村、石院墙村城乡建设用地增减挂钩试点项目', level: '3-7-6', url: '', children: null },
                { label: '岳池县九龙镇菊花山村、百步梯村、石庙子村城乡建设用地增减挂钩试点项目', level: '3-7-7', url: '', children: null },
              ]
            },
            { label: '水环境生态综合治理', level: '3-8', url: '', children: null },
            { label: '全域土地综合整治试点', level: '3-9', url: '', children: null },
          ]
        },
      ],
      props: {
        label: 'label',
        children: 'children'
      },
      selectOptions: [
        { id: 1, value: '1', label: '全市' },
        { id: 2, value: '2', label: '广安区' },
        { id: 3, value: '3', label: '前锋区' },
        { id: 4, value: '4', label: '岳池县' },
        { id: 5, value: '5', label: '武胜县' },
        { id: 6, value: '6', label: '邻水县' },
        { id: 7, value: '7', label: '华蓥市' },

      ],
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      chart5: null,
      chart6: null,
      selectKey: '',

      //  指标台账
      zbtz: {
        key: '',
        activeMenuName: '1',
        menuOpt: [
          { id: '1', name: '全部', label: '全部' },
          { id: '2', name: '新增耕地类项目列表', label: '新增耕地类项目列表' },
          { id: '3', name: '增减挂钩类项目列表', label: '增减挂钩类项目列表' },

        ],
        tableData: data.xzhdTable,
        zjgTable: data.zjgTable,
        tabActiveOpt: '1',
        currentPage: 1,
      }
    };
  },

  components: {
    mapContainer
  },

  computed: {},

  watch: {},

  beforeCreate() { },

  created() { },
  updated() {
    this.chart1.resize();
    this.chart12.resize();
    this.chart2.resize();
    this.chart3.resize();
    this.chart4.resize();
    this.chart5.resize();
    this.chart6.resize();
  },

  mounted() {
    console.log(data)
    this.initChart();
  },

  methods: {
    // 菜单点击事件
    menuClick(item) {
      this.menuOpt = item.id;
      console.log(this.menuOpt);
    },
    // 过滤树节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 左侧树节点点击事件
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      console.log(this.$refs.tree.getHalfCheckedKeys());
      console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
    },
    // 是否隐藏左侧树
    hideLeftTreeHandle(e) {
      this.isShowLeftTree = !this.isShowLeftTree;
    },
    // 渲染用地指标-指标分布的左侧树节点
    renderContentTree(h, { node, data }) {
      if (data.children) {
        return (
          <span style="width: 100%;display: flex;align-items: center;justify-content: space-between;font-size: 14px;">
            <span style="display: flex;align-items: center;justify-content: flex-start;width: 80%;font-size: 14px;">
              <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white;margin:0 10px 0 0;font-size: 14px;'>{node.level === 1 ? '一级' : node.level === 2 ? '二级' : '三级'}</span>

              {this.isToSimpleStr(node.label) ? this.strToSimpleStr(node.label) : node.label + '  ☛   ' +
                '(' + (node.level === 2 ? (node.childNodes || []).filter((i) => i.checked).length : (node.childNodes || []).reduce((prev, item) => {
                  return prev + (item.childNodes || []).filter((i) => i.checked).length
                }, 0)) + '/' + (node.level === 2 ? (node.childNodes || []).length : (node.childNodes || []).reduce((prev, item) => {
                  return prev + (item.childNodes || []).length
                }, 0)) + ')'}


            </span>
            <i class="el-icon-coin"></i>
          </span>
        )
      } else {
        return (
          <span style="width: 100%;display: flex;align-items: center;justify-content: space-between;font-size: 14px;">
            <span style="display: flex;align-items: center;justify-content: flex-start;width: 80%;font-size: 14px;">
              <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white;margin:0 10px 0 0;font-size: 14px;'>{node.level === 1 ? '一级' : node.level === 2 ? '二级' : '三级'}</span>

              {this.isToSimpleStr(node.label) ? this.strToSimpleStr(node.label) : node.label + '  ☛   ' +
                '(' + (node.level === 2 ? (node.childNodes || []).filter((i) => i.checked).length : (node.childNodes || []).reduce((prev, item) => {
                  return prev + (item.childNodes || []).filter((i) => i.checked).length
                }, 0)) + '/' + (node.level === 2 ? (node.childNodes || []).length : (node.childNodes || []).reduce((prev, item) => {
                  return prev + (item.childNodes || []).length
                }, 0)) + ')'}


            </span>
            <i class="el-icon-s-data"></i>
          </span>
        )
      }
      //三级时样式调整
      let classname = ''
      if (node.level === 3) {
        classname = 'levename'
      }
      return <p class={classname}> <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white'>三级</span>&nbsp;&nbsp;&nbsp;{node.label}</p>
    },
    // 树节点渲染时判断是否需要缩写
    isToSimpleStr(s) {
      // console.log(s.length)
      return s.length >= this.lenSimpleWrite;
    },
    // 长字符缩写成短字符
    strToSimpleStr(s) {
      return this.isToSimpleStr(s) ? s.substr(0, this.lenSimpleWrite) + "..." : s
    },
    // 树节点是否有子节点
    hasChildren(ie) {
      return ie.children != null;
    },
    // 指标分析-切换tab
    zbfxTabsClick(e) {

    },
    // 每页显示的页数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 初始化图表
    initChart() {
      // this.chart1 = echarts.init(this.$refs["char1-1"]);
      // this.chart1.setOption({
      //   series: [
      //     {
      //       type: 'gauge',
      //       startAngle: 180,
      //       endAngle: 0,
      //       center: ['50%', '80%'],
      //       radius: '120%',
      //       axisLine: {
      //         lineStyle: {
      //           width: 20,
      //           color: [
      //             [0.25, '#FF6E76'],
      //             [0.5, '#FDDD60'],
      //             [0.75, '#58D9F9'],
      //             [1, '#7CFFB2']
      //           ]
      //         }
      //       },
      //       pointer: {
      //         itemStyle: {
      //           color: 'auto'
      //         }
      //       },
      //       axisTick: {
      //         // distance: -10,
      //         length: 8,
      //         lineStyle: {
      //           color: 'auto',
      //           width: 2
      //         }
      //       },
      //       axisLabel: {
      //         color: 'inherit',
      //         distance: 40,
      //         fontSize: 12
      //       },
      //       detail: {
      //         valueAnimation: true,
      //         formatter: '{value} %',
      //         color: 'inherit',
      //         fontSize: 18,
      //       },
      //       data: [
      //         {
      //           value: 70,
      //           // name: '使用进度'
      //         }
      //       ]
      //     }
      //   ]
      // });

      this.chart1 = echarts.init(this.$refs["char11"]);
      this.chart1.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          selectedMode: false
        },
        series: [
          {
            name: '增减挂钩结余指标',
            type: 'pie',
            startAngle: 180,
            center: ['40%', '80%'],
            radius: ['40%', '60%'],
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                const labelV = param.name + ' (' + param.percent * 2 + '%)';
                let half = labelV.length / 2;
                if (Number.isInteger(half)) {
                  half = Math.trunc(half);
                }
                console.log(labelV, half)
                return labelV.substring(0, half) + '\n' + labelV.substring(half, labelV.length);
              }
            },
            data: [
              { value: 1048, name: '项目使用指标' },
              { value: 735, name: '指标出让使用' },
              { value: 580, name: '指标外部购买' },
              {
                // make an record to fill the bottom 50%
                value: 1048 + 735 + 580,
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ]
          }
        ]
      });

      this.chart12 = echarts.init(this.$refs["char12"]);
      this.chart12.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          selectedMode: false
        },
        series: [
          {
            name: '增减挂钩结余指标',
            type: 'pie',
            startAngle: 180,
            center: ['42%', '80%'],
            radius: ['40%', '70%'],
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                const labelV = param.name + ' (' + param.percent * 2 + '%)';
                let half = labelV.length / 2;
                if (Number.isInteger(half)) {
                  half = Math.trunc(half);
                }
                // console.log(labelV, half)
                return labelV.substring(0, half) + '\n' + labelV.substring(half, labelV.length);
              }
            },
            data: [
              { value: 432, name: '项目使用指标' },
              { value: 131, name: '指标出让使用' },
              { value: 245, name: '指标外部购买' },
              {
                // make an record to fill the bottom 50%
                value: 432 + 131 + 245,
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ]
          }
        ]
      });

      this.chart2 = echarts.init(this.$refs.chart2);
      this.chart2.setOption({
        // title: {
        //   text: 'Stacked Line'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['下达指标', '购买指标']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '下达指标',
            type: 'line',
            smooth: true,
            data: [3500, 2000, 2900, 4600, 2900, 3300, 3100]
          },
          {
            name: '购买指标',
            type: 'line',
            smooth: true,
            data: [1000, 1800, 2000, 3200, 1800, 2300, 2100],
          }
        ]
      });

      this.chart3 = echarts.init(this.$refs.chart3, null, { renderer: 'svg' });

      this.chart3.setOption({
        title: {
          text: ""
        },
        legend: {
          left: 'right'
        },
        xAxis: {
          type: "category",
          data: ["广安市区", "广安区", "前锋区", "岳池县", "武胜县", "邻水县", "华蓥市"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {},

        series: [
          {
            name: '新增耕地指标',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          }, {
            name: '增减挂钩结余指标',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          }, {
            name: '其中：新增水田指标',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 210, 310]
          }
        ],
      });

      this.chart4 = echarts.init(this.$refs.chart4, null, { renderer: 'svg' });

      this.chart4.setOption({
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '全域指标供应结构分布图',
            type: 'pie',
            radius: ['20%', '50%'],
            center: ['40%', '60%'],
            data: [
              { value: 1048, name: '增减旱地指标' },
              { value: 735, name: '新增耕地指标' },
              { value: 580, name: '新增水田指标' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

      this.chart5 = echarts.init(this.$refs.chart5, null, { renderer: 'svg' });

      this.chart5.setOption({
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '全域指标供应总价分布图',
            type: 'pie',
            radius: '50%',
            center: ['40%', '60%'],
            data: [
              { value: 1048, name: '增减旱地指标' },
              { value: 735, name: '新增耕地指标' },
              { value: 580, name: '新增水田指标' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });

      this.chart6 = echarts.init(this.$refs.chart6, null, { renderer: 'svg' });

      this.chart6.setOption({
        title: {
          text: ""
        },
        legend: {
          left: 'right'
        },
        xAxis: {
          type: "category",
          data: ["广安市区", "广安区", "前锋区", "岳池县", "武胜县", "邻水县", "华蓥市"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {},

        series: [
          {
            name: '农用地复垦规模',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          }, {
            name: '未利用地开发规模',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          }, {
            name: '农村建设用地复垦规模',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }, {
            name: '城镇低效用地复垦规模',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }, {
            name: '合计总规模',
            type: 'line',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
        ],
      });

    },
    handleTable3Edit(index, row) {
      console.log(index, row);
    },
    handleTable3Delete(index, row) {
      console.log(index, row);
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~@/styles/variables.scss";
$headerHeight: 4em;
$spaceWidth: 12em;
$treeWidth: calc(100% - 4em);

// $backColorContent: 
.container {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  // font-family: "SF Pro SC","SF Pro Display","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;

  .left-panel {
    width: 4em;
    height: 100%;
    position: absolute;
    float: left;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(119, 114, 114, 0.2);
    box-shadow: 0 6px 12px 0 rgba(119, 114, 114, 0.2);
    z-index: 611;
    background-color: #fff;

    .menu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4px;
      margin: 6px 0 6px 0;
      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
      }

      span {
        font-size: 12px;
        padding-top: 5px;
      }

    }

    .menu-focus-color {
      color: rgb(25, 73, 204);
    }

    .menu-unfocus-color {
      color: rgba(138, 138, 138, 1.0);
    }

  }

  .content {
    width: calc(100% - #{$headerHeight});
    height: 100%;
    // background-color: rgba(246, 246, 248, 1);
    background-color: $contentColor;
    float: right;
    position: absolute;
    left: 4em;
    z-index: 601;

    // 指标分布
    .zbfb {
      width: 100%;
      height: 100%;

      .prj-data {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        height: 100%;
        width: calc(20em + 8px);
        transition: left 1s;
        z-index: 120;

        // 左边栏上侧搜索框
        .left-main-info {

          $left: calc(10% / 2);
          width: 20em;
          height: 100%;
          background-color: #fff;

          .top-search {
            width: 100%;
            z-index: 610;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

            .el-input {
              width: 90%;
              margin: $left;
            }
          }


          // 左边栏下侧书
          .content-tree {
            top: 70px;
            width: 100%;
            margin: 20px 0 0 0;

            .p-tree {
              margin: 0 10px 0 0;
            }


          }
        }

        .map-right-control {
          width: 8px;
          height: 50px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 12px;
          background-color: rgba(119, 114, 114, 0.6);
          border-radius: 0 10px 10px 0;
          z-index: 609;
          cursor: pointer;

          i {
            transform: translate(-2px, 0);
          }
        }
      }

      .prj-data-show {
        left: 0em !important;
      }

      .prj-data-hide {
        left: -20em !important;
      }

      // 右侧地图
      .map {
        width: 100%;
        height: 100%;
      }
    }

    // 指标监测
    .zbjc {
      width: 100%;
      height: 100%;
      padding: 12px;
      // background-color: #fff;

      .card-panel {
        width: 100%;
        height: 6.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // 上侧card
        .card {
          width: 32%;
          height: 100%;
          background-color: rgb(62, 150, 186);
          border-radius: 6px;
          color: #fff;
          padding: 10px 20px;
          font-weight: bold;
          letter-spacing: 2px;
          cursor: default;

          .title {
            font-size: 26px;
            margin-block-start: 6px;
            margin-block-end: 6px;
            white-space: normal;
          }

          .item-box {
            display: flex;
            flex-wrap: wrap;

            .item-div1 {
              width: 52%;
            }

            .item-div2 {
              width: 48%;
            }

            span {
              letter-spacing: 1.5px;
              font-size: 12px;
              font-weight: 200;
              margin-block-start: 2px;
              margin-block-end: 2px;
            }
          }
        }
      }

      .zbtj-content {
        width: 100%;
        height: calc(100% - 8em - 12px);
        background-color: #fff;
        margin-top: 12px;
        padding: 12px;
        box-shadow: 0 6px 12px 0 rgba(119, 114, 114, 0.2);

        .header {
          width: 100%;
          height: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        //选择chart-content层级下的第奇数个div元素
        .chart-content>div:nth-child(even) {
          margin-left: 16px;
        }

        .chart-content {
          width: 100%;
          height: calc(100% - 32px);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: start;
          color: #444;
          overflow-y: auto;
          padding-top: 12px;


          .card {
            width: calc(50% - 20px);
            height: 20em;
            margin-bottom: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 3px 3px rgba(119, 114, 114, 0.3);
            padding: 0 10px;
            flex: 0 0 auto;

            .p-title {
              border-bottom: 2px solid red;
              margin-block-end: 2px;
              letter-spacing: 2px;
              margin-bottom: 10px;
            }

            i {
              color: rgb(242, 192, 133);
            }

            .desc {
              width: 70%;
              margin-left: 15%;
              border: 1px solid rgba(177, 177, 177, 0.5);
              padding: 10px;
            }

            .chart-panel {
              width: 100%;
              height: 100%;
              margin-top: 12px;
              display: flex;



              .left-circle {
                flex: 0 0 auto;

                width: 300px;
                height: 192px;
                /* float: left; */
                // background-color: rgb(220, 223, 230)
                border: 1.2px solid rgba(190, 184, 184, 0.6);

                -webkit-transform: translate(0px, 0px);
                transform: translate(0px, 0px);
                padding: 32px 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                // box-shadow: 0 0 12px 6px rgba(119, 114, 114, 0.3);
              }

              .label-panel {
                p {
                  letter-spacing: 1px;
                  font-weight: bold;
                }

                .num {
                  font-size: 20px;

                  i {
                    font-size: 14px;
                  }
                }
              }

              .dashboard {
                flex: 0 0 auto;
                width: 500px;
                height: 240px;
                /* float: left; */
                transform: translate(-32%, 0px);
                z-index: 20;
              }

              .big-circle {
                flex: 0 0 auto;
                width: 340px;
                height: 170px;
                background-color: #fff;
                border-radius: 170px 170px 0 0;
                transform: translate(-171%, 20px);
                z-index: 19;
                border-left: 1.2px solid rgb(190, 184, 184, 1);
                border-right: 1.2px solid rgba(190, 184, 184, 1);
                border-top: 1.2px solid rgba(190, 184, 184, 1);
                display: flex;
                justify-content: center;
                align-items: start;

                .chart-title-div {
                  width: 170px;
                  height: 50px;
                  transform: translate(-3px, -27px);
                  flex: 0 0 auto;
                  background-color: #fff;
                  z-index: 21;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-weight: bold;
                  letter-spacing: 1px;
                }
              }

              .right-circle {
                flex: 0 0 auto;
                width: 300px;
                height: 192px;

                -webkit-transform: translate(-223%, 0px);
                transform: translate(-223%, 0px);
                padding: 32px 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border: 1.2px solid rgba(190, 184, 184, 0.6);
                // box-shadow: 0 0 12px 6px rgba(119, 114, 114, 0.3);
              }

            }

            .chart2 {
              width: 100%;
              height: 80%;
            }

            .chart3 {
              width: 100%;
              height: 100%;
            }

            .chart-box {
              width: 100%;
              height: 90%;

              .card-child {
                width: 50%;
                height: 100%;
                float: left;
              }

              .chart4 {
                width: 50%;
                height: 100%;
                float: left;
              }

              .chart5 {
                width: 50%;
                height: 100%;
                float: right;
              }
            }

            .chart6 {
              width: 100%;
              height: 90%;
            }
          }

          .card-twice-width {
            width: calc(100% - 30px) !important;
          }

        }
      }
    }

    // 指标分析
    .zbfx {
      width: 100%;
      height: 100%;
      padding: 0 12px;

      .top-search-panel {
        height: 56px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: rgba(239, 239, 239, 1.0);

        .search-input {
          width: 320px;
          margin: 12px;

        }

        .search-btn {
          width: 100px;
          height: 34px;
          margin-left: 12px;
        }
      }

      .content-table-div {
        width: 100%;
        height: calc(100% - 56px);
        background-color: #fff;
        padding: 12px;

        .tab {

          .el-tabs__content {

            .opt-1 {
              overflow: auto;

              .data-table {
                width: 100%;
                // height: 88%;
              }

              .page-size {
                height: 5%;
                margin-top: 5px;
              }
            }
          }


        }
      }
    }
  }
}
</style>
<style lang="scss">
.content-table-div {
  width: 100%;
  height: calc(100% - 56px);
  background-color: #fff;
  padding: 12px;

  .tab {
    height: 100%;

    .el-tabs__content {
      height: 100%;

      .el-tab-pane {
        height: 100%;

        .opt-1 {
          height: 100%;

          .tb-panel {
            height: 90%;
            // overflow: auto;
          }
        }
      }
    }


  }
}
</style>