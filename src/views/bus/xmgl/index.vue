<!-- 项目管理 -->
<template>
  <div class="container">
    <!-- title -->
    <div class="left-panel">
      <div v-for="item in projectManageMenu"
        :class="['menu', 'hvr-icon-float', item.id == xmglMenuOpt ? 'menu-focus-color' : 'menu-unfocus-color']"
        @click="xmglMenuClick(item)">
        <!-- <i class="fa fa-camera-retro"></i> -->
        <font-awesome-icon class="hvr-icon" :icon="item.icon"></font-awesome-icon>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <!-- 内容栏 -->
    <div class="content">
      <!-- 项目分布 -->
      <div class="xmfb" v-if="xmglMenuOpt == 1">
        <!-- 一张图-左侧树列表 -->
        <div :class="['prj-data', isShowLeftTree ? 'prj-data-show' : 'prj-data-hide']">
          <div class="left-main-info">
            <!-- 顶部左侧搜索 -->
            <div class="top-search">
              <el-input placeholder="搜索项目名称" v-model="filterText" prefix-icon="el-icon-search" size="small">
              </el-input>
            </div>
            <div class="content-tree">
              <!-- <el-tree :data="projectTree" shouw-checkbox @check-change="handleCheckChange">
        </el-tree> -->
              <el-tree :props="props" :render-content="renderContentTree" :data="projectTree" node-key="level"
                :default-expanded-keys="['现状数据', '规划数据', '项目数据']" show-checkbox @check-change="handleCheckChange"
                :filter-node-method="filterNode" ref="tree" class="p-tree">
                <!-- 此为html渲染，改为renderContentTree进行dom渲染 -->
                <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                <el-tooltip class="item" effect="dark" :content="node.label" placement="top-start" :disabled="!isToSimpleStr(node.label)">
                  <span>
                    {{ strToSimpleStr(node.label) }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ !hasChildren(data) ? '' : '(' + 0 + '/' + getChildrenCount(data) + ')' }}
                  </span>
                </el-tooltip>

                <i v-show="!hasChildren(data)" class="el-icon-s-data"></i>
                <i v-show="hasChildren(data)" class="el-icon-coin"></i>
              </span> -->
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

      <!-- 储备项目 and 在建项目-->
      <div class="cbxm" v-if="xmglMenuOpt == 2 || xmglMenuOpt == 3">
        <div class="cbxm-search">

          <!-- 项目搜索框 -->
          <el-input v-if="xmglMenuOpt == 2" size="small" class="search-input" v-model="cbxm.key"
            placeholder="请输入关键字"></el-input>
          <el-button v-if="xmglMenuOpt == 2" size="small" class="search-btn" type="primary">搜索</el-button>

          <!-- 项目卡片展示框 -->
          <div class="prj-num-box" v-if="xmglMenuOpt == 3">
            <div class="box" v-for="item in cbxm.menuOpt">
              <div class="card-icon-wrapper">
                <font-awesome-icon :icon="item.icon" />
              </div>
              <div class="card-description">
                <span style="font-size: 16px; color: rgba(0,0,0,.45);">{{ item.label }}</span><br />
                <span class="prj-num-count">{{ item.num }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 储备项目-项目表 -->
        <div class="cbxm-tab-div" v-show="xmglMenuOpt == 2">
          <el-tabs class="cbxm-tab" v-model="cbxm.activeMenuName" @tab-click="cbxmTabsClick">
            <el-tab-pane v-for="item in cbxm.menuOpt" :label="item.label" :name="item.id">
              <div class="opt-1">
                <el-table :data="cbxm.tableData" border stripe style="width: 100%">
                  <el-table-column fixed prop="id" label="id" width="100">
                  </el-table-column>
                  <el-table-column fixed prop="xmmc" label="项目名称" width="300">
                  </el-table-column>
                  <el-table-column prop="tzgm" label="项目规模（公顷）" width="220">
                  </el-table-column>
                  <el-table-column prop="cjdw" label="计划投资（万元）" width="200">
                  </el-table-column>
                  <el-table-column prop="lxsj" label="项目类型" width="120">
                  </el-table-column>
                  <el-table-column prop="xmlx" label="项目所在地" width="300">
                  </el-table-column>
                  <el-table-column prop="xmdz" label="位置查看" width="320">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" disable-transitions>位置查看</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="data1" label="实施期限" width="120">
                  </el-table-column>
                  <el-table-column prop="data2" label="重点任务" width="120">
                  </el-table-column>
                </el-table>
                <el-pagination class="page-size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="cbxm.currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 在建项目-项目表 -->
        <div class="cbxm-tab-div" v-show="xmglMenuOpt == 3">
          <el-tabs class="cbxm-tab" v-model="zjxm.activeTabIndex" @tab-click="cbxmTabsClick">
            <el-tab-pane v-for="item in cbxm.menuOpt" :label="item.label" :name="item.id">
              <div class="opt-1">
                <el-table :data="cbxm.tableData" border stripe style="width: 100%">
                  <el-table-column fixed prop="id" label="id" width="100">
                  </el-table-column>
                  <el-table-column fixed prop="xmmc" label="项目名称" width="300">
                  </el-table-column>
                  <el-table-column prop="tzgm" label="计划项目建设总规模（公顷）" width="220">
                  </el-table-column>
                  <el-table-column prop="cjdw" label="计划项目总投资（万元）" width="200">
                  </el-table-column>
                  <el-table-column prop="lxsj" label="立项批复日期" width="120">
                  </el-table-column>
                  <el-table-column prop="xmlx" label="项目投资主体" width="300">
                  </el-table-column>
                  <el-table-column prop="xmdz" label="项目实施单位" width="320">
                  </el-table-column>
                  <el-table-column prop="data1" label="项目所在地" width="120">
                  </el-table-column>
                  <el-table-column prop="data2" label="位置查看" width="120">
                    <template slot-scope="scope">
                      <el-button type="primary" size="mini" disable-transitions>位置查看</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="data2" label="详细资料" width="120">
                    <template slot-scope="scope">
                      <el-button type="primary" @click="zjxmDetail()" size="mini" disable-transitions>详细资料</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination class="page-size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="cbxm.currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
              </div>
            </el-tab-pane>


          </el-tabs>
        </div>

      </div>
      <!-- 入库项目 -->
      <div class="cggl" v-show="xmglMenuOpt == 4">
        <div class="chart-top">
          <div class="chart-panel chart-panel-1">
            <!-- <Bar :data="chart1Data" /> -->
            <p>项目成果上报</p>
            <div class="chart-svg" ref="chart1"></div>
          </div>
          <div class="chart-panel chart-panel-2">
            <p>上报项目统计</p>
            <span>已归档数据<i style="color: rgb(243, 192, 9);">150</i>个，补充归档数据<i
                style="color: rgb(243, 192, 9)">50</i>个</span>
            <div class="chart-svg" ref="chart2"></div>
          </div>
        </div>
        <div class="tree-panel">
          <p>项目成果归档</p>
          <div class="prj-table">
            <el-table height="88%" :data="cbxm.tableData" border stripe style="width: 100%">
              <el-table-column fixed type="index" width="50">
              </el-table-column>
              <el-table-column fixed prop="xmmc" label="项目名称" width="500">
              </el-table-column>
              <el-table-column prop="tzgm" align="center" label="项目规模（公顷）" width="120">
              </el-table-column>
              <el-table-column prop="cjdw" align="center" label="项目投资（万元）" width="200">
              </el-table-column>
              <el-table-column prop="lxsj" align="center" label="验收日期" width="120">
              </el-table-column>
              <el-table-column prop="xmlx" align="center" label="项目投资主体" width="300">
              </el-table-column>
              <el-table-column prop="xmdz" align="center" label="项目实施单位" width="320">
              </el-table-column>
              <el-table-column prop="xmdz" align="center" label="项目所在地" width="320">
              </el-table-column>
              <el-table-column prop="xmdz" align="center" label="位置查看" width="320">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" disable-transitions>位置查看</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="xmdz" align="center" label="详细资料" width="320">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" disable-transitions>详细资料</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="page-size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="cbxm.currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
              layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 统计分析 -->
      <div class="tjfx" v-show="xmglMenuOpt == 5">
        <!-- 卡片 -->
        <div class="xmgl-stastics-card-panel">
          <div class="xmgl-stastics-card hvr-glow" v-for="item in tjfx.cardData">
            <div class="icon-wrapper">
              <font-awesome-icon class="hvr-icon" :icon="item.icon" />
            </div>
            <div class="card-description">
              <span style="font-size: 16px; color: rgba(0,0,0,.45);">{{ item.label }}</span><br />
              <span class="prj-num-count">{{ item.num }}</span>
            </div>
          </div>
        </div>
        <div class="statistcs-chart">
          <div class="static-panel-left">
            <div class="static-panel-left-top">
              <span class="chart-title">国土整治指标构成</span>
              <div class="chart-svg" ref="tjfxChart1"></div>
            </div>
            <div class="static-panel-left-bottom">
              <div class="static-panel-left-bottom-box">
                <span class="chart-title">现状突破情况</span>
                <div class="chart-svg" ref="tjfxChart2"></div>
              </div>
              <div class="static-panel-left-bottom-box">
                <span class="chart-title">现状突破情况</span>
                <div class="chart-svg" ref="tjfxChart3"></div>
              </div>
            </div>
          </div>
          <div class="static-panel-right">
            <div class="static-panel-right-box">
              <span class="chart-title">国土整治指标排行榜</span>
              <div class="chart-svg" ref="tjfxChart4"></div>
            </div>
            <div class="static-panel-right-box">
              <span class="chart-title">现状突破情况排行榜</span>
              <div class="chart-svg" ref="tjfxChart5"></div>
            </div>
          </div>
        </div>
      </div>


    </div>
    <!-- 在建项目详细信息弹窗 -->
    <div class="zjxm-dialog" v-show="zjxm.showDetailDialog">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>项目详细资料</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div class="text-title">
          项目基本信息：
        </div>
        <div class="text item">
          项目名称: 岳池县北城乡普庵寺村、石院墙村城乡建设用地增减挂钩试点项目
        </div>
        <div class="text item">
          立项备案编号: 川511062-ddcacnadkncmfjfajfsjfsajfasfj
        </div>
        <div class="text item">
          项目类型：xxxx
        </div>
        <div class="text item">
          项目所在地：xxxxx
        </div>
        <div class="text item">
          项目投资主体：xxxxx
        </div>
        <div class="text item">
          项目立项批复日期：xxxxxxxxx
        </div>
        <div class="text item">
          项目立项批复文号：xxxxxxxxx
        </div>
        <div class="text item">
          项目立项批复文件：xxxxxxxxxxxx
        </div>
        <div class="text item">
          计划竣工时间：xxxxxxxxxx
        </div>
        <div class="text item">
          计划项目总投资（万元）：
        </div>
        <div class="text item">
          计划项目建设总规模（公顷）：
        </div>
        <div class="text-title">
          补充耕地情况：
        </div>
        <div class="text item">
          计划新增耕地面积（公顷）：xxxxxxxxxxxx
        </div>
        <div class="text item">
          计划新增水田面积（公顷）：xxxxxxxxxx
        </div>
        <div class="text item">
          计划提质改造耕地面积（公顷）：xxxxxxxxxxx
        </div>
        <div class="text item">
          计划提质改造水田面积（公顷）：xxxxxxx
        </div>
        <div class="text-title">
          计划入库补充耕地情况：
        </div>
        <div class="text item">
          计划项目建设总规模（公顷）：
        </div>
        <div class="text item">
          计划新增数量指标：xxxxxxxxxxxxxx
        </div>
        <div class="text item">
          计划新增水田指标：xxxxxxxxxxx
        </div>
        <div class="text item">
          是否完成招投标: <el-tag size="mini">是</el-tag>
        </div>
        <div class="text item">
          是否签署合同：<el-tag size="mini">是</el-tag>
        </div>
        <div class="text item">
          是否完成招投标: <el-button size="mini" type="primary">附件查阅</el-button>
        </div>
        <div class="text item">
          是否签署合同：<el-button size="mini" type="primary">项目进度</el-button>
        </div>
      </el-card>
    </div>
    <div class="mask" @click="clickMask()" v-show="zjxm.showDetailDialog">

    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import mapContainer from "@/components/map/init.vue"

export default {
  name: 'xmgl',

  data() {
    return {
      // 左侧树
      isShowLeftTree: true,
      filterText: '', // 左侧面版搜索内容

      // 超过x长度简写字符串
      lenSimpleWrite: 10,

      projectManageMenu: [
        { id: 1, icon: 'fa-regular fa-file-lines', label: '项目分布' },
        { id: 2, icon: 'fa-regular fa-file-lines', label: '储备项目' },
        { id: 3, icon: 'fa-regular fa-file-lines', label: '在建项目' },
        { id: 4, icon: 'fa-regular fa-file-lines', label: '入库项目' },
        { id: 5, icon: 'fa-solid fa-chart-line', label: '统计分析' },

      ],
      props: {
        label: 'label',
        children: 'children'
      },
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
      // 储备项目
      cbxm: {
        key: '',
        activeMenuName: '1',
        menuOpt: [
          { id: '1', label: '全部', icon: ['fas', 'border-all'], num: 114 },
          { id: '2', label: '土地整治', icon: ['fas', 'solar-panel'], num: 12 },
          { id: '3', label: '增减挂钩', icon: ['fas', 'calculator'], num: 6 },
          { id: '4', label: '矿山生态修复', icon: ['fas', 'mountain-city'], num: 25 },
          { id: '5', label: '全域土地综合整治', icon: ['fas', 'mountain'], num: 39 },
          { id: '6', label: '其它', icon: ['fas', 'layer-group'], num: 29 },
        ],
        tableData: [
          //id 项目名称 投资规模 承建单位  立项时间 项目类型 项目地址
          { id: 1, xmmc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', tzgm: 'xxxxxxxx', cjdw: 'xxxxxxxxxxx', xmlx: 'xxxxxxxxxxxxxxxxxxx', xmdz: 'xxxxxxxxxxxxxxxxxxxx', data1: '', data2: '' },
          { id: 2, xmmc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', tzgm: 'xxxxxxxx', cjdw: 'xxxxxxxxxxx', xmlx: 'xxxxxxxxxxxxxxxxxxx', xmdz: 'xxxxxxxxxxxxxxxxxxxx', data1: '', data2: '' },
          { id: 3, xmmc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', tzgm: 'xxxxxxxx', cjdw: 'xxxxxxxxxxx', xmlx: 'xxxxxxxxxxxxxxxxxxx', xmdz: 'xxxxxxxxxxxxxxxxxxxx', data1: '', data2: '' },
          { id: 4, xmmc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', tzgm: 'xxxxxxxx', cjdw: 'xxxxxxxxxxx', xmlx: 'xxxxxxxxxxxxxxxxxxx', xmdz: 'xxxxxxxxxxxxxxxxxxxx', data1: '', data2: '' },
          { id: 5, xmmc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', tzgm: 'xxxxxxxx', cjdw: 'xxxxxxxxxxx', xmlx: 'xxxxxxxxxxxxxxxxxxx', xmdz: 'xxxxxxxxxxxxxxxxxxxx', data1: '', data2: '' },
          { id: 6, xmmc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', tzgm: 'xxxxxxxx', cjdw: 'xxxxxxxxxxx', xmlx: 'xxxxxxxxxxxxxxxxxxx', xmdz: 'xxxxxxxxxxxxxxxxxxxx', data1: '', data2: '' },
        ],
        currentPage4: 4,
      },
      // 在建项目
      zjxm: {
        // tab菜单
        activeTabIndex: '1',
        // 是否显示详细信息弹窗
        showDetailDialog: true,
      },
      // 项目管理的左侧选择栏model
      xmglMenuOpt: 1,
      // 入库项目数据
      cggl: {
        chart1Data: {
          labels: ['已完成', '待完成', '已退回'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 20, 12]
            }
          ]
        },
        chart1: null,
        chart2: null,
      },
      tjfx: {
        cardData: [
          { id: 1, label: '国土综合整治规模（公顷）', num: '60,860', icon: ['fas', 'border-all'] },
          { id: 2, label: '矿山地质环境保护与修复（公顷）', num: '1,690', icon: ['fas', 'solar-panel'] },
          { id: 3, label: '水环境综合治理工程（个）', num: '80', icon: ['fas', 'calculator'] },
          { id: 4, label: '城镇空间品质提升工程（个）', num: '26', icon: ['fas', 'mountain-city'] },
          { id: 5, label: '支撑体系建设重点工程（个）', num: '26', icon: ['fas', 'mountain'] },

        ],
        chart1: null,
        chart2: null,
        chart3: null,
        chart4: null,
        chart5: null,

      }
    };
  },
  props: {

  },

  components: {
    mapContainer
  },

  computed: {},

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  beforeCreate() { },

  created() { },

  updated() {
    this.cggl.chart1.resize();
    this.cggl.chart2.resize();
    this.tjfx.chart1.resize();
    this.tjfx.chart2.resize();
    this.tjfx.chart3.resize();
    this.tjfx.chart4.resize();
    this.tjfx.chart5.resize();

  },

  mounted() {
    this.initChart();
  },

  methods: {
    // 左侧树节点点击事件
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      console.log(this.$refs.tree.getHalfCheckedKeys());
      console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
    },
    // 渲染树节点
    renderContentTree(h, { node, data }) {
      console.log(node, data)
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
    // 过滤树节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 显示或隐藏左侧树节点
    hideLeftTreeHandle(e) {
      this.isShowLeftTree = !this.isShowLeftTree;
    },
    // 判断字符是否简写
    isToSimpleStr(s) {
      // console.log(s.length)
      return s.length >= this.lenSimpleWrite;
    },
    strToSimpleStr(s) {
      return this.isToSimpleStr(s) ? s.substr(0, this.lenSimpleWrite) + "..." : s
    },
    hasChildren(ie) {
      return ie.children != null;
    },
    fuck(ie) {
      console.log(ie)
    },
    cbxmTabsClick(tab, event) {
      console.log(tab, event)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    xmglMenuClick(item) {
      this.xmglMenuOpt = item.id;
      console.log(this.xmglMenuOpt);
    },
    initChart() {
      this.cggl.chart1 = echarts.init(this.$refs.chart1);

      this.cggl.chart1.setOption({
        title: {
          text: ""
        },
        legend: {
        },
        xAxis: {
          type: "category",
          data: ["立项申报", "项目审查", "验收备案"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '已完成', '待完成', '已退回'],
            ['立项申报', 43.3, 85.8, 93.7],
            ['项目审查', 83.1, 73.4, 55.1],
            ['验收备案', 86.4, 65.2, 82.5],
          ]
        },
        series: [
          {
            // data: [150, 230, 224],
            // name: "已完成",
            type: "bar",
          }, {
            // data: [110, 130, 124],
            // name: "待完成",
            type: "bar",
          }, {
            // data: [50, 30, 24],
            // name: "已退回",
            type: "bar",
          },
        ],
      });

      this.cggl.chart2 = echarts.init(this.$refs.chart2);

      this.cggl.chart2.setOption({
        title: {
          text: ""
        },
        legend: {
          left: 'right'
        },
        xAxis: {
          type: "category",
          // data: ["已归档", "未归档"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {},

        series: [
          {
            name: '上报项目数量',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 50, name: '已归档' },
              { value: 150, name: '未归档' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
      });

      this.tjfx.chart1 = echarts.init(this.$refs.tjfxChart1);

      this.tjfx.chart1.setOption({
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

      this.tjfx.chart2 = echarts.init(this.$refs.tjfxChart2);

      this.tjfx.chart2.setOption({
        title: {
          text: ""
        },
        legend: {
        },
        xAxis: {
          type: "category",
          data: ["广安市", "广安区", "前锋区", "岳池县", "武胜县", "邻水县", "华蓥市"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '规划建设用地总规划', '现状建设用地面积', '现状突破面积'],
            ['广安市', 243.3, 285.8, 293.7],
            ['广安区', 83.1, 73.4, 55.1],
            ['前锋区', 86.4, 65.2, 82.5],
            ['岳池县', 52.4, 73.1, 51.3],
            ['武胜县', 72.4, 53.9, 39.1],
            ['邻水县', 65.1, 61.2, 46.1],
            ['华蓥市', 48.1, 78.2, 65.1],
          ]
        },
        series: [
          {
            // data: [150, 230, 224],
            // name: "已完成",
            type: "bar",
          }, {
            // data: [110, 130, 124],
            // name: "待完成",
            type: "bar",
          }, {
            // data: [50, 30, 24],
            // name: "已退回",
            type: "line",
          },
        ],
      });

      this.tjfx.chart3 = echarts.init(this.$refs.tjfxChart3);

      this.tjfx.chart3.setOption({
        title: {
          text: ""
        },
        legend: {
        },
        xAxis: {
          type: "category",
          data: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {},
        series: [
          {
            data: [1000, 1200, 1180, 1270, 1260, 1290, 1210],
            type: "line",
            smooth: true
          }
        ],
      });

      this.tjfx.chart4 = echarts.init(this.$refs.tjfxChart4);

      this.tjfx.chart4.setOption({
        title: {
          text: ""
        },
        legend: {
        },
        xAxis: {
          type: "value",

        },
        yAxis: {
          type: "category",
          data: ["广安市", "广安区", "前锋区", "岳池县", "武胜县", "邻水县", "华蓥市"].reverse(),
        },
        tooltip: {},
        series: [
          {
            data: [24900, 20289, 19780, 16493, 10500, 9812, 9461].reverse(),
            type: "bar",
            smooth: true
          }
        ],
      });

      this.tjfx.chart5 = echarts.init(this.$refs.tjfxChart5);

      this.tjfx.chart5.setOption({
        title: {
          text: ""
        },
        legend: {
        },
        xAxis: {
          type: "value",

        },
        yAxis: {
          type: "category",
          data: ["广安市", "广安区", "前锋区", "岳池县", "武胜县", "邻水县", "华蓥市"].reverse(),
        },
        tooltip: {},
        series: [
          {
            data: [2900, 2767, 2001, 900, 876, 851, 812].reverse(),
            type: "bar",
            smooth: true
          }
        ],
      });
    },
    zjxmDetail() {
      this.zjxm.showDetailDialog = true;
    },
    clickMask() {
      this.zjxm.showDetailDialog = false;
    },
  }
}
</script>
<style lang='scss' scoped>
$headerHeight: 4em;
$spaceWidth: 12em;
$treeWidth: calc(100% - 4em);

.container {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  .left-panel {
    width: 4em;
    height: 100%;
    position: absolute;
    float: left;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(119, 114, 114, 0.2);
    // box-shadow: 0 6px 12px 0 rgba(119, 114, 114, 0.2);
    box-shadow: 6px 6px 12px 0 rgb(209, 204, 204), -1px -1px 6px 0 rgb(209, 204, 204);
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
    background-color: #f0f2f5;
    float: right;
    position: absolute;
    left: 4em;
    z-index: 601;

    .xmfb {
      width: 100%;
      height: 100%;

      .map {
        width: 100%;
        height: 100%;
      }
    }

    .prj-data {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      height: 100%;
      width: calc(20em + 8px);
      transition: left 1s;
      background-color: #fff;
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
        z-index: 612;
        cursor: pointer;

        i {
          transform: translate(-2px, 0);
        }
      }
    }

    // 储备项目
    .cbxm {
      height: 100%;
      padding: 12px;
      background-color: rgba(239, 239, 239, 1.0);

      .cbxm-search {
        // height: 60px;
        width: 100%;
        margin-bottom: 12px;
        background-color: #fff;

        .search-input {
          width: 320px;
          margin: 12px;

        }

        .search-btn {
          width: 100px;
          margin-bottom: 12px;
        }

        // 上侧图标标注框
        .prj-num-box {
          height: 56px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          background-color: rgba(239, 239, 239, 1.0);

          .box {
            width: 240px;
            height: 100%;
            // display: inline-flex;
            // margin: 0 12px;
            border-radius: 3px;
            background-color: #fff;
            cursor: pointer;
            box-shadow: 6px 6px 12px 0 rgb(209, 204, 204), -1px -1px 6px 0 rgb(209, 204, 204);

            .card-icon-wrapper {
              height: 40px;
              width: 40px;
              padding: 5px;
              margin: 8px 10px;
              float: left;
              border-radius: 6px;

              svg {
                width: 30px;
                height: 30px;
                color: #15458f;
              }

            }

            .card-icon-wrapper:hover {
              background-color: #15458f;

              svg {
                color: #fff;
              }
            }

            // 卡片后面的描述
            .card-description {
              color: #666;
              float: right;
              font-size: 14px;
              padding: 5px;
              margin: 1px 10px;
              line-height: 1.5em;

              .prj-num-count {
                float: right;
              }
            }

          }
        }
      }

      .cbxm-tab-div {
        width: 100%;
        height: calc(100% - 56px - 12px);
        background-color: #fff;
        padding: 12px;
        box-shadow: 6px 6px 12px 0 rgb(209, 204, 204), -1px -1px 6px 0 rgb(209, 204, 204);

        .cbxm-tab {
          height: 100%;

          .el-tabs__content {

            .opt-1 {

              .page-size {
                display: block;
                position: absolute;
                z-index: 611;
                bottom: 1px;
              }
            }
          }
        }
      }

    }

    .prj-data-show {
      left: 0em !important;
    }

    .prj-data-hide {
      left: -20em !important;
    }

    // 成果管理
    .cggl {
      width: 100%;
      height: 100%;
      padding: 12px;
      display: flex;
      flex-direction: column;

      .chart-top {
        display: flex;

        .chart-panel {
          width: calc(50% - 6px);
          height: 24em;
          background-color: #fff;

          p {
            margin-left: 10px;
            padding-left: 10px;
            border-left: 4px solid rgb(143, 201, 115);
            font-size: 18px;
          }

          span {
            padding-left: 30px;
            font-size: 14px;
            letter-spacing: 1px;
          }

          .chart-svg {
            height: 95%;
          }
        }

        .chart-panel-1 {
          // float: left;
          margin-right: 12px;
        }

        .chart-panel-2 {
          // float: right;

        }
      }

      .tree-panel {
        width: 100%;
        height: calc(100% - 24em - 12px);
        margin-top: 12px;
        background-color: #fff;
        padding: 10px;

        p {
          padding-left: 10px;
          border-left: 4px solid rgb(143, 201, 115);
          font-size: 18px;
        }

        .prj-table {
          width: 100%;
          height: calc(100% - 60px);
          overflow: auto;
        }
      }
    }

    // 统计分析
    .tjfx {
      width: 100%;
      height: 100%;
      padding: 12px;

      // 上方卡片组
      .xmgl-stastics-card-panel {
        background-color: transparent;
        width: 100%;
        height: 5em;
        display: flex;
        align-items: top;
        justify-content: space-between;

        // 卡片
        .xmgl-stastics-card {
          width: 20em;
          background-color: #fff;
          display: flex;
          justify-content: left;
          align-items: center;
          cursor: default;

          // icon图标
          .icon-wrapper {
            height: 50px;
            width: 50px;
            padding: 5px;
            margin: 8px 10px;
            float: left;
            border-radius: 6px;

            svg {
              width: 40px;
              height: 40px;
              color: #15458f;
            }
          }

          // .icon-wrapper:hover {
          //   background-color: #15458f;

          //   svg {
          //     color: #fff;
          //   }
          // }

          .card-description {
            line-height: 20px;
            font-family: 'PingFang SC';
            color: #333;
            font-weight: bold;

            .prj-num-count {
              margin-top: 3px;
              color: rgb(254, 174, 78);
            }
          }
        }
      }

      .statistcs-chart {
        width: 100%;
        height: calc(100% - 12px - 5em);
        display: flex;
        flex-wrap: wrap;
        margin: 12px 0 0 0;
        justify-content: space-between;
        align-items: center;

        .chart-title {
          margin-left: 10px;
          padding-left: 10px;
          border-left: 4px solid rgb(143, 201, 115);
          font-size: 18px;
        }

        .chart-svg {
          width: 95%;
          height: 100%;
        }

        .static-panel-left {
          height: calc(100% - 12px);
          width: calc((100% - 12px) * 2 / 3);
          // background-color: red;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .static-panel-left-top {
            width: 100%;
            height: calc((100% - 12px) / 2);
            background-color: #fff;

          }

          .static-panel-left-bottom {
            width: 100%;
            height: calc((100% - 12px) / 2);
            display: flex;
            justify-content: space-between;

            .static-panel-left-bottom-box {
              width: calc((100% - 12px) / 2);
              height: 100%;
              background-color: #fff;

            }
          }
        }

        .static-panel-right {
          height: calc(100% - 12px);
          width: 33%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          // background-color: red;
          .static-panel-right-box {
            width: 100%;
            height: calc((100% - 12px) / 2);
            background-color: #fff;

          }
        }
      }

    }

  }
}

// 在建项目详细信息弹窗
.zjxm-dialog {
  z-index: 1000;
  left: 10%;
  top: 0;
  width: 60%;
  height: 95%;
  position: absolute;
  background-color: #fff;
  padding: 6px;

  .box-card {
    width: 50%;
    border-radius: 6px;

    .text-title {
      color: red;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 12px;
    }
  }
}

.mask {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 999;
  background-color: rgba(32, 30, 30, 0.8);
}
</style>
<style lang='scss'>
.cbxm-tab {
  .el-tabs__content {
    height: 92%;
  }
}
.zjxm-dialog {
  .el-card__header {
    padding: 12px;
  }
}
</style>