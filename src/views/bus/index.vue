
<template>
  <!-- <div style="background-color: red; width:100px; height: 100px;">
    
  </div> -->
  <div class="main">
    <!-- <div id="mapContainer" ref="map" class="map-container">
      <div class="point-panel">
        <span>{{ pstr }}</span>
      </div>

      <el-tooltip class="item" effect="dark" content="跳转到原点" placement="top-start">
        <span class="my-position" @click="flyCenter">
          <svg-icon icon-class="position" />
        </span>
      </el-tooltip>
    </div> -->
    <div class="arcgis-map">
      <childMap />
    </div>
    <!-- 地图弹出的蒙板 -->
    <div class="mask" @click="clickMask" v-show="isShowMask">

    </div>
    <!-- 地图点击弹出事件 -->
    <div class="info" @click="clickInfo" v-show="isShowInfo">
      <div class="info-header">
        <p>枣山园区市政道路景观绿化改造工程项目</p>
      </div>
      <div class="info-content">
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">开工前田坎（公顷）：313131</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">立项申请单位：广安市广安区自然资源局</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">建设规模（公顷）：13131</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">固定序号：13</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">申请文号：3113423131</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">项目阶段：<span class="yello-font">立项</span></div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">项目状态：<span class="yello-font">待接件</span></div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">立项确认号</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">填报人员：张xx</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">联系方式：135xxxxxxxx</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">新增耕地（公顷）：13131</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">新增水田（公顷）：313131</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">新增产能（公斤）：13131</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">新增耕地率：10%</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">立项批准单位：四川省xxxxx</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">立项文号：AVFXFGZ</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">立项批准时间：2021-5-19</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">设计单位：四川恒立工程勘察设计有限公司</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">测量单位：四川恒立工程勘察设计有限公司</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">项目批次：</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">优选文号：</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">投资类型：省投资</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">预算投资（万元）：3021.00</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">幅员面积（公顷）：1913.86</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">现有耕地（公顷）：893.00</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">规划后耕地（公顷）：941</div>
            </ul>
          </el-col>
          <el-col :span="12">
            <ul>
              <div class="li-red-point">耕地质量等别提高：0.3</div>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <ul>
              <div class="li-red-point">农村土地整治监测监管系统备案编号：941</div>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 一张图-左侧树列表 -->
    <div :class="['prj-data', isShowLeftTree ? 'prj-data-show' : 'prj-data-hide']">
      <div class="left-main-info">
        <!-- 顶部左侧搜索 -->
        <div class="top-search">
          <el-input placeholder="搜索项目名称" v-model="filterText" prefix-icon="el-icon-search" size="small">
          </el-input>
        </div>
        <!-- <ul v-for="item in projectTree">
        {{ item.name }}
        <li v-for="itm in item.item">
          {{ itm.name }}
        </li>content-tree
        </ul> -->
        <div class="content-tree">
          <!-- <el-tree :data="projectTree" shouw-checkbox @check-change="handleCheckChange">
        </el-tree> -->
          <!-- <el-tree :props="props" :data="projectTree" node-key="label" :default-expanded-keys="['现状数据', '规划数据', '项目数据']" show-checkbox @check-change="handleCheckChange"
            :filter-node-method="filterNode" ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(0/{{ data.children == null ? 0 : data.children.length }})</span>
              <i v-show="data.children == null" class="el-icon-s-data"></i>
              <i v-show="data.children != null" class="el-icon-coin"></i>
            </span>
          </el-tree> -->

          <prjTree/>

        </div>
      </div>
      <div class="map-right-control" @click="hideLeftTreeHandle">

        <i small class="el-icon-arrow-left" v-show="this.isShowLeftTree"></i>
        <i small class="el-icon-arrow-right" v-show="!this.isShowLeftTree"></i>

      </div>
    </div>
  </div>
</template>

<script>
// import { area, testd } from './shp.js'
import prjTree from '@/components/tree'
import childMap from '@/components/map/childMap.vue'
import { store } from "@/store/store.js"


export default {
  name: '',
  data() {
    return {
      // arcgis api map对象
      eMap: null,
      eSelectLayers: [],
      // leaflet map对象
      map: null,
      pstr: '0,0',
      L: window.L,
      isShowInfo: false, // 展示信息
      isShowMask: false, // 展示蒙板
      isShowLeftTree: true,
      filterText: '', // 左侧面版搜索内容
      mapData: {
        center: [30.464821, 106.651953],
        zoom: 14,
      },
      props: {
        label: 'label',
        children: 'children'
      },
      projectTree: [
        {
          label: '现状数据', level: '1', url: '', children: [
            { label: '基础测绘', level: '1-2', url: '', children: null },
            { label: '国土调查', level: '1-3', url: '', children: null },
            { label: '耕地资源', level: '1-4', url: '', children: null },
            { label: '矿产资源', level: '1-5', url: '', children: null },
            { label: '森林资源', level: '1-6', url: '', children: null },
            { label: '湿地资源', level: '1-7', url: '', children: null },
            { label: '水资源', level: '1-8', url: '', children: null },
            { label: '自然与历史文化资源', level: '1-9', url: '', children: null },
            { label: '不动产登记', level: '1-10', url: '', children: null },
            { label: '自然资源确权登记', level: '1-11', url: '', children: null },
          ]
        },
        {
          label: '规划数据', level: '2', url: '', children: [
            {
              label: '重要控制线', url: '', children: [
                { label: '永久基本农田', url: '', children: null },
                { label: '生态保护红线', url: '', children: null },
                { label: '城镇开发边界', url: '', children: null },
                { label: '历史文化保护红线', url: '', children: null },
                { label: '洪涝风险控制线', url: '', children: null },
                { label: '战略性水资源管控范围', url: '', children: null },
                { label: '矿产资源控制线', url: '', children: null },
                { label: '支撑图层', url: '', children: null },

              ]
            }, {
              label: '分析评价', url: '', children: [
                { label: '生态保护重要性评价等级', url: '', children: null },
                { label: '生态脆弱性等级', url: '', children: null },
                { label: '生态问题评价', url: '', children: null },
                { label: '生态环节状况指数等级', url: '', children: null },
                { label: '生态系统水资源平衡评价', url: '', children: null },
                { label: '生态系统演替规律评价', url: '', children: null },
                { label: '生态系统恢复力等级', url: '', children: null },

              ]
            }, {
              label: '国土空间生态修复规划成果', url: '', children: [
                { label: '国土空间生态修复格局', url: '', children: null },
                { label: '国土空间生态修复分区', url: '', children: null },
                { label: '国土空间生态修复重点区域', url: '', children: null },
                { label: '水土流失防治重点区', url: '', children: null },
                { label: '石漠化综合治理重点区', url: '', children: null },
                { label: '土地综合整治重点区', url: '', children: null },
                { label: '生物多样性保护维护重点区', url: '', children: null },
                { label: '废弃矿山治理重点区', url: '', children: null },
                { label: '国土空间生态修复重点工程', url: '', children: null },
              ]
            },
            { label: '自然资源行业专项规划', url: '', children: null },
            { label: '其他行业专项规划', url: '', children: null },
          ]
        },
        {
          label: '项目数据', level: '3', url: '', children: [
            {
              label: '森林生态系统和生物多样性保护工程', url: '', children: [
                { label: '平行岭谷森林生态系统修复项目', url: '', children: null },
                { label: '西部天然林保护项目', url: '', children: null },
                { label: '生态多样性保护项目', url: '', children: null },

              ]
            }, {
              label: '矿山地质环境保护与修复工程', url: '', children: [
                { label: '废弃矿山治理项目', url: '', children: null },
                { label: '矿山景观利用项目', url: '', children: null },

              ]
            }, {
              label: '国土综合整治工程', url: '', children: [
                {
                  label: '农用地整理项目', url: '', children: [
                    { label: '广安区土地整理项目', url: '', children: null },
                    { label: '广安区高标准农田建设项目', url: '', children: null },
                    { label: '前锋区土地整理项目', url: '', children: null },
                    { label: '前锋区高标准农田建设项目', url: '', children: null },
                    { label: '岳池县土地整理项目', url: '', children: null },
                    { label: '岳池县高标准农田建设项目', url: '', children: null },
                    { label: '武胜县土地整理项目', url: '', children: null },
                    { label: '武胜县高标准农田建设项目', url: '', children: null },
                    { label: '邻水县高滩镇全域土地综合整治项目', url: '', children: null },
                    { label: '邻水县高标准农田建设项目', url: '', children: null },
                    { label: '华蓥市高标准农田建设项目', url: '', children: null },
                  ]
                },
                { label: '土壤污染治理项目', url: '', children: null },
                { label: '农村人居环境综合整治项目', url: '', children: null },
                { label: '水土流失、石漠化综合治理项目', url: '', children: null },
                {
                  label: '其他国土综合整治配套项目', url: '', children: [
                    { label: '广安区城乡建设用地增减挂钩项目', url: '', children: null },
                    { label: '前锋区城乡建设用地增减挂钩项目', url: '', children: null },
                    { label: '岳池县城乡建设用地增减挂钩项目', url: '', children: null },
                    { label: '武胜县城乡建设用地增减挂钩项目', url: '', children: null },
                    { label: '邻水县城乡建设用地增减挂钩项目', url: '', children: null },
                    { label: '华蓥市城乡建设用地增减挂钩项目', url: '', children: null },
                    { label: '武胜县土地整理项目', url: '', children: null },
                    { label: '武胜县高标准农田建设项目', url: '', children: null },
                    { label: '邻水县高滩镇全域土地综合整治项目', url: '', children: null },
                  ]
                },
              ]
            }, {
              label: '水环境综合治理工程', url: '', children: [
                { label: '流域水生态修复和治理项目', url: '', children: null },
                { label: '湿地保护与建设项目', url: '', children: null },
                { label: '水资源保护项目', url: '', children: null },
              ]
            }, {
              label: '城镇空间品质提升工程', url: '', children: [
                { label: '城市人居环境综合整治项目', url: '', children: null },
                { label: '城市公园绿地建设项目', url: '', children: null },
                { label: '工业园区生态治理项目', url: '', children: null },
                { label: '其他城市空间品质提升配套项目', url: '', children: null },
              ]
            },
            {
              label: '生态保护修复支撑体系建设重点工程', url: '', children: [
                { label: '生态环境监测管理水平提升项目', url: '', children: null }
              ]
            },
          ]
        },
      ]

      //#region 
      /*
      projectTree: [
        {
          label: '现状数据', level: 1, url: '', children: [
            { label: '地形数据', url: '', children: null },
            { label: '三调数据', url: '', children: null },
            { label: '2022年变更数据', url: '', children: null },

          ]
        },
        {
          label: '规划数据', level: 1, url: '', children: [
            { label: '国土空间生态修复规划数据', url: '', children: null },
            { label: '重要控制线数据', url: '', children: null },
          ]
        },
        {
          label: '生态修复项目数据', level: 1, url: '', children: [
            { label: '平行岭谷森林生态系统修复项目', url: '', children: null },
            { label: '西部天然林保护项目', url: '', children: null },
            { label: '生态多样性保护项目', url: '', children: null },
            { label: '废弃矿山治理项目', url: '', children: null },
            { label: '矿山景观利用项目', url: '', children: null },
            { label: '农用地整理项目', url: '', children: null },
            { label: '土壤污染治理项目', url: '', children: null },
            { label: '农村人居环境综合整治项目', url: '', children: null },
            { label: '水土流失、石漠化综合治理项目', url: '', children: null },
            { label: '其他国土综合整治配套项目', url: '', children: null },
            { label: '流域水生态修复和治理项目', url: '', children: null },
            { label: '湿地保护与建设项目', url: '', children: null },
            { label: '水资源保护项目', url: '', children: null },
            { label: '城市人居环境综合整治项目', url: '', children: null },
            { label: '城市公园绿地建设项目', url: '', children: null },
            { label: '工业园区生态治理项目', url: '', children: null },
            { label: '其他城市空间品质提升配套项目', url: '', children: null },
            { label: '生态环境监测管理水平提升项目', url: '', children: null },
            { label: '信息化平台建设重点项目', url: '', children: null }
          ]
        },
      ]
      
      */
      //#endregion
    };
  },

  components: {
    prjTree,
    childMap,
  },

  computed: {},

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    eMap(newV, oldV) {
      console.log(newV, oldV)
    }
  },

  beforeCreate() { },

  created() {

  },

  mounted() {
    console.log(store.state.eSelectLayers)
    // this.initLeafletMap();
  },

  methods: {
    initLeafletMap() {
      console.log(window)
      var crs4325 = new window.L.Proj.CRS("EPSG:4523", "+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs", {
        // bounds: window.L.bounds([35345643.07, 2489167.32], [35655386.14, 4676066.76]),
        // origin: [35655386.14, 4676066.76]
      })

      var normalm = window.L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
        maxZoom: 18,
        minZoom: 5
      }),
        normala = window.L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
          maxZoom: 18,
          minZoom: 5
        }),
        imgm = window.L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
          maxZoom: 18,
          minZoom: 5
        }),
        imga = window.L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
          maxZoom: 18,
          minZoom: 5
        });


      var normal = window.L.layerGroup([normalm, normala]),
        image = window.L.layerGroup([imgm, imga]);

      var baseLayers = {
        "地图": normalm,
        "影像": imgm,
      }

      var overlayLayers = {

      }

      this.map = window.L.map("mapContainer", {
        center: this.mapData.center,
        zoom: this.mapData.zoom,
        layers: [imgm],
        zoomControl: false,
        // crs: window.L.CRS.EPSG900913
        // crs: crs4325
      });
      console.log(this.map, imgm)

      // var myIcon = this.L.icon({
      //   iconUrl: '@/icons/';
      // })

      // 添加点位信息
      window.L.marker([30.447209996139776, 106.6102742120487]).addTo(this.map).on('click', e => {
        // console.log(111111)
        console.log(this.map.scrollWheelZoom)
        this.isShowInfo = true;
        this.isShowMask = true;
        this.map.scrollWheelZoom.disable();
      });

      // 第一个参数是底图图层，第二个参数是覆盖图层
      window.L.control.layers(baseLayers, overlayLayers).addTo(this.map);
      window.L.control.zoom({
        zoomInTitle: '放大',
        zoomOutTitle: '缩小'
      }).addTo(this.map);


      // 获取鼠标坐标
      // this.map.on('mousemove', e => {
      //   this.pstr = e.latlng.lng.toFixed(3) + ',' + e.latlng.lat.toFixed(3);
      //   // console.log(e)
      //   // console.log(window.L.CRS.latLngToPoint(e.latlng, 12))
      //   console.log(this.getMeter(e.latlng))
      // })

      // this.L.tileLayer.wms("http://localhost:6080/arcgis/rest/services//STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer", {
      //   layers: [0,3],
      //   format: 'image/png',
      //   transparent: true
      // }).addTo(this.map);
      console.log()
    },
    getMeter(point) {
      return point.lng / 360 * (2 * Math.PI * 6371004) + ',' + point.lat / 360 * (2 * Math.PI * 6371004);
    },
    clickMask(e) {
      // console.log(111111)

      console.log(this.map.scrollWheelZoom)
      this.map.scrollWheelZoom.enable();
      this.isShowInfo = false;
      this.isShowMask = false;
    },
    clickInfo(e) {
      console.log(11111)
    },
    // 飞回到原点
    flyCenter() {
      this.map.setView(this.mapData.center, this.mapData.zoom);
    },
    // 左侧树节点点击事件
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
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
    // 获取childmap的map对象
    getMap(value) {
      console.log(value)
      this.eMap = value
    }
  }
}
</script>
<style lang='scss' scoped>
$fontSize: 16px;

.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  position: absolute !important;

  .point-panel {
    position: absolute;
    right: 1px;
    bottom: 1px;
    opacity: 1;
    z-index: 600;
    color: #fff;
    font-size: 14px;

    background-color: rgba(0, 0, 0, 0.8)
  }

  .leaflet-control-attribution {
    display: none;
  }

  .my-position {
    width: 2em;
    height: 2em;
    display: block;
    position: absolute;
    right: 40px;
    bottom: 40px;
    z-index: 601;
    background-color: rgba($color: #fff, $alpha: 0.2);
    cursor: pointer;
    border-radius: 6px;

    .svg-icon {
      width: 2em;
      height: 2em;
    }
  }

}

.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 605;
}

.info {
  height: 80%;
  width: 60%;
  display: block;
  position: absolute;
  left: 20%;
  top: 10%;
  z-index: 610;
  background-color: #fff;
  border-radius: 20px;
  padding: 6px;


  .info-header {
    width: 100%;
    height: 30px;
    margin-top: -10px;
    // background-color: yellow;

    p {
      font-size: 22px;
      text-align: center;
      font-family: "仿宋";
      font-weight: bold;

      span {
        font-size: 48px;
        color: red;
      }
    }
  }

  .info-content {
    height: calc(100% - 30px - 12px);
    width: 100%;
    font-size: $fontSize;
    overflow-y: auto;

    .yello-font {
      color: rgba(255, 165, 0, 1);
      font-family: 'KaiTi';
      font-weight: bold;
    }
  }
}

// 左侧树
.prj-data {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: calc(20em + 8px);
  transition: left 1s;
  z-index: 2;

  // 左边栏上侧搜索框
  .left-main-info {

    $left: calc(10% / 2);
    width: 22em;
    height: 100%;
    background-color: #fff;
    // z-index: 100;
    // box-shadow: 4px 4px 3px 1px rgb(209, 204, 204), -3px -3px 3px 1px rgb(209, 204, 204);


    .top-search {
      width: 100%;
      // z-index: 610;
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
      height: calc(100% - 70px);
      // margin: 20px 0 0 0;
      padding: 10px 10px;
      overflow-y: auto;

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
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
    background-color: rgba(59, 57, 57, 0.8);
    border-radius: 0 10px 10px 0;
    z-index: 100;
    cursor: pointer;

    i {
      transform: translate(-2px, 0);
    }
  }

  // @keyframes hideLeftPanel {
  //   from 
  // }
}

.prj-data-show {
  left: 0em !important;
  // box-shadow: 0;
}

.prj-data-hide {
  left: -20em !important;
  // box-shadow: 0;
}

// .prj-data::after {
//   content: '';
//   width: 8px;
//   height: 40px;
//   left: 20em;
//   top: 50%;
//   position: absolute;
//   background-color: red;
//   border-radius: 0 10px 10px 0;
// }

.li-red-point {
  padding-left: 10px;
  display: flex;

  &::before {
    content: "";
    display: block;
    position: relative;
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    margin-right: 6px;
    top: $fontSize / 2 - 2;
  }
}

.li-green-point {
  padding-left: 10px;
  display: flex;

  &::before {
    content: "";
    display: block;
    position: relative;
    width: 5px;
    height: 5px;
    background-color: green;
    border-radius: 50%;
    margin-right: 6px;
    top: $fontSize / 2 - 3;
  }
}
.arcgis-map {
  width: 100%;
  height: 100%;
  position: absolute !important;
}
</style>
<style lang='scss'>
.leaflet-control-attribution {
  display: none;
}

.leaflet-control-zoom {
  display: none;
}</style>