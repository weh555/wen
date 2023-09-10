<!-- 规划管理模块 -->
<template>
  <div id="mapContainer" class="mapContainer" ref="mapContainer">
    <div id="legend-div" class="legend-div" v-if="legendData != null">
      <div class="legend-box" v-for="item in legendData.layers">
        <img :src="getLegendImgUrl(item.layerId, item.legend[0].url)" alt="">
        <span>{{ item.layerName }}</span>
      </div>
      <!-- <div class="legend-box">
        <img
          src="http://localhost:6080/arcgis/rest/services/STXF/三线及自然保护地/MapServer/0/images/e21312c2229f2087848b491e040db26d"
          alt="">
        <span>永久基本农田</span>
      </div> -->
    </div>

    <!-- 卷帘分析div -->
    <!-- <div id="swipeDiv" ref="swipeDiv"></div> -->
    <div id="tool-div" class="tool-div draggable">
      <div class="toolbar">
        <!-- 放大 -->
        <font-awesome-icon @click="zoomIn" :icon="['fas', 'magnifying-glass-plus']" />
        <!-- 缩小 -->
        <!-- <font-awesome-icon :icon="['fas', 'magnifying-glass-minus']" /> -->
        <!-- 全图 -->
        <font-awesome-icon @click="centerAndZoom" :icon="['fas', 'earth-asia']" />
        <font-awesome-icon @click="generateSwipe" icon="fas fa-arrows-alt-h" />
        <!-- 移动地图 -->
        <!-- <font-awesome-icon :icon="['fas', 'up-down-left-right']" /> -->
        <!-- 移动地图 -->
        <!-- <font-awesome-icon :icon="['fas', 'hand']" /> -->
        <!-- 属性查询 -->
        <font-awesome-icon :icon="['fas', 'circle-info']" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { loadModules } from 'esri-loader';
import { getLegned } from '@/utils/map/getGisMapJson';
import { store } from "@/store/store.js";
import interact from "interactjs";
export default {
  name: 'childMap',
  // model: {
  //   prop: 'eMap',
  //   event: 'parent-event'
  // },

  data() {
    return {
      map: this.eMap,
      slipeWidget: null,
      zoom: 11,
      center: [106.63, 30.47],
      view: null,
      fl: null,
      showSwipeDiv: false,
      legendData: null,
      selectedUrl: null,
      layer: null,
      // mapServerUrl: 'http://localhost:6080/arcgis/rest/services/STXF/三线及自然保护地/MapServer'
      // mapServerUrl: 'https://localhost:6443/arcgis/rest/services/SampleWorldCities/MapServer/0'
    };
  },
  props: {
    // mapServerUrlProp: 'http://localhost:6080/arcgis/rest/services/STXF/三线及自然保护地/MapServer'
    mapServerUrl: {
      type: String,
      // default: 'http://localhost:6080/arcgis/rest/services/STXF/三线及自然保护地/MapServer/0'
      default: 'http://{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=e6a9b80c18eafdcf6c090e14c0ca3f1d'
    },
    eMap: {
      type: Object,
      default: null,
    },
  },

  components: {},

  computed: {},

  watch: {
    // mapServerUrlProp(newData, oldData) {

    // },
  },

  beforeCreate() {

  },
  beforeDestroy() {
    // if (this.view) {
    //   // destroy the map view
    //   this.view.container = null
    // }
  },

  created() { },

  mounted() {
    // console.log(this.mapServerUrl)
    this.initMap();
    this.initDragDiv();
    // this.getLegendData();
  },

  methods: {
    // 初始化arcgis地图
    initMap() {
      loadModules([
        "dojo/dom-construct",
        "esri/map",
        "esri/layers/FeatureLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/WebTiledLayer",
        "esri/layers/TileInfo",
        "esri/geometry/Extent",
        "esri/InfoTemplate",
        // "dojo/domReady!",
        "dojo/ready",
        "dojo/parser"
      ])
        .then(([
          domConstruct,
          Map,
          FeatureLayer,
          ArcGISDynamicMapServiceLayer,
          ArcGISTiledMapServiceLayer,
          WebTiledLayer,
          TileInfo,
          Extent,
          InfoTemplate,
          ready,
          parser
        ]) => {

          // var bounds = new Extent({
          //     "xmin": 35596520.872600004,
          //     "ymin": 3324654.6285999995,
          //     "xmax": 35711493.656,
          //     "ymax": 3409415.674900001,
          //   "spatialReference":{"wkid":4523}
          // });

          // this.map = new Map(this.$refs.mapContainer, {
          //   extent: bounds,
          //   sliderPosition: 'top-right'
          // });
          // let template = new InfoTemplate("属性表", "行政区代码: ${XZQDM}");

          // parser.parse(); // 用于使用div的id来代指网页元素
          var tiledLayer = new WebTiledLayer(this.mapServerUrl, {
            id: "tdtMap",
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          });
          // tiledLayer.on("load", e => {
          //   console.log("load layers")
          // })
          store.state.eMap = new Map(this.$refs.mapContainer, {
            zoom: this.zoom,
            center: this.center,
            sliderPosition: 'top-right'
          });
          const layer11 = new ArcGISDynamicMapServiceLayer('http://localhost:6080/arcgis/rest/services/STXF/行政区划/MapServer');
          const layerArea = new ArcGISDynamicMapServiceLayer('http://localhost:6080/arcgis/rest/services/STXF/国土空间生态修复重点区域/MapServer', {
            id: 'da',
          })
          var f2 = new ArcGISDynamicMapServiceLayer('http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer', {
            id: "child-map1",
          });
          const tileLayerMine = new ArcGISDynamicMapServiceLayer('https://localhost:6443/arcgis/rest/services/STXF/MapServiceTile/MapServer')
          // store.state.eMap.addLayer(tiledLayer)
          // store.state.eMap.addLayer(layer11);
          // store.state.eMap.addLayer(layerArea);
          // store.state.eMap.addLayer(f2);
          // store.state.eMap.addLayer(tileLayerMine);


          store.state.eMap.on("load", e => {
            console.log('map load!!!!!!!!!!!!!!!');

            var layers = f2.layerInfos;
            console.log(layers.length)
            // 打印图层信息
            for (var i = 0; i < layers.length; i++) {
              console.log("Layer ID: " + layers[i].id);
              console.log("Layer Name: " + layers[i].name);
              console.log("Layer Visibility: " + layers[i].defaultVisibility);
              console.log("---");
            }
            // f2.setVisibleLayers([0, 1], true);
          })

          store.state.eMap.addLayer(tiledLayer)
          store.addSelectLayer(tiledLayer)

          // const layer11 = new ArcGISDynamicMapServiceLayer('http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer');
          // store.state.eMap.addLayer(layer11);



          this.fl = new FeatureLayer('http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer/1', {
            id: "child-map",
          });
          // store.state.eMap.addLayer(this.fl);
          // store.addSelectLayer(this.fl)
          
          // 图版点击的属性表查询功能
          // this.getMapServerChildLayerUrl(layerUrl).then(res1 => {
          //   console.log(res1)
          //   res1.forEach(item => {
          //     this.getMapAttributeJsonByUrlAndRender(this.getJsonUrlByMapUrl(item));
          //   })
          // });


        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });


    },
    addLayerToMap(layer, id) {
      console.log(layer, id)
    },
    // 生成swipe div
    generateSwipe() {
      // div未显示，则生成
      loadModules(["esri/dijit/LayerSwipe", "esri/layers/FeatureLayer", "dojo/parser"]).then(([LayerSwipe, FeatureLayer, parser]) => {
        parser.parse();
        console.log(this.slipeWidget, document.getElementById("swipeDiv"))
        if (this.slipeWidget == null && document.getElementById("swipeDiv") == null) {
          // store.state.eSelectLayers.forEach(item => {
          //   if (item.id == "tdtMap") {
          //     store.removeSelectLayer(item);
          //     store.state.eMap.removeLayer(item)
          //   }
          // })
          console.log(2222222222)
          var e = document.createElement("div");
          e.id = "swipeDiv";
          // document.getElementById("mapDiv").appendChild(e)
          document.getElementById("mapContainer").insertBefore(e, document.getElementById("tool-div"))

          this.slipeWidget = new LayerSwipe({
            type: "vertical", //Try switching to "scope" or "horizontal"  
            map: store.state.eMap,
            left: 600,
            layers: [this.fl]
          }, "swipeDiv")

          this.slipeWidget.startup()
        } else {
          console.log(this.slipeWidget)
          if (this.slipeWidget)
            this.slipeWidget.destroy();
          this.slipeWidget == null;
        }
      })
    },
    initDragDiv() {
      interact('.draggable')
        .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ],
          // enable autoScroll
          autoScroll: true,

          listeners: {
            // call this function on every dragmove event
            move: this.dragMoveListener,

            // call this function on every dragend event
            end(event) {
            }
          }
        })
    },
    // 拖拽移动div 
    dragMoveListener(event) {
      var target = event.target
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    },

    // ---------------工具条-------------------
    // 框选放大
    zoomIn() {
      console.log("放大")
      loadModules(["esri/toolbars/draw"]).then(([Draw]) => {
        var draw = new Draw(store.state.eMap);
        draw.activate(Draw.EXTENT);

        draw.on('draw-end', e => {
          draw.deactivate();
          var geometry = e.geometry;
          console.log(store.state.eMap.extent, geometry.getExtent())
          // 缩放到框选范围
          store.state.eMap.setExtent(geometry.getExtent().expand(1.2)); // 修改放大倍数，例如 expand(2) 表示放大两倍
        })
      })
    },
    // 全图
    centerAndZoom() {
      store.state.eMap.centerAndZoom(this.center, this.zoom)
    },

  },


}
</script>
<style lang='scss' scoped>
// @import "https://js.arcgis.com/3.44/esri/themes/calcite/esri/esri.css";
// @import "http://js.arcgis.com/3.15/dijit/themes/tundra/tundra.css";
@import "http://js.arcgis.com/3.44/esri/css/esri.css";
// @import "http://localhost:6080/arcgis/rest/static/jsapi.css";

.mapContainer {
  width: 100%;
  height: 100%;

  .tool-div {
    width: 160px;
    height: 30px;
    position: absolute;
    top: 12px;
    left: 405px;
    font-size: 16px;
    background-color: #66666669;
    z-index: 1;
    color: #fff;

    touch-action: none;
    user-select: none;
    transform: translate(0px, 0px);

    .toolbar {
      padding: 0 6px;
      width: 85%;
      height: calc(100% - 12px);
      margin: 6px 0;
      display: flex;
      box-sizing: border-box;
      flex: 1;
      // align-items: center;
      justify-content: space-around;
      border-right: 2px solid #fff;



      svg {
        cursor: pointer;
      }
    }
  }
}

.legend-div {
  width: 160px;
  height: 200px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  background-color: #fff;
  overflow-y: auto;
  padding: 10px;
  box-shadow: 6px 6px 6px 1px rgb(209, 204, 204), -3px -3px 6px 1px rgb(209, 204, 204);


  .legend-box {
    width: 100%;
    height: 20px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    color: #666;

    img {
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.mapContainer {
  .logo-med {
    display: none;
  }

  // 已通过设置map参数改变放大缩小位置
  // .esriSimpleSlider {
  //   position: absolute;
  //   left: calc(100% - 45px);
  //   top: 15px;
  // }
}
</style>