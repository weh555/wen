<!-- 规划管理模块 -->
<template>
  <div class="mapContainer" ref="mapContainer">
    <div class="legend-div" v-if="legendData != null">
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
  </div>
</template>

<script>
import axios from 'axios';
import { loadModules } from 'esri-loader';
import { getLegned } from '@/utils/map/getGisMapJson';
export default {
  name: 'mapContainer',

  data() {
    return {
      view: null,
      legendData: null,
      selectedUrl: null,
      map: null,
      layer: null,
    };
  },
  props: {

  },

  components: {},

  computed: {},

  watch: {},

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
    this.initMap();
    this.getLegendData();
  },

  methods: {
    // 初始化arcgis地图
    initMap() {
      loadModules([
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/map",
        "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/lang",
        "esri/Color", "dojo/number", "dojo/dom-style",
        "dijit/TooltipDialog", "dijit/popup",
        "dojo/parser",
        "dojo/domReady!",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"
      ])
        .then(([
          ArcGISDynamicMapServiceLayer,
          ArcGISTiledMapServiceLayer,
          Map,
          FeatureLayer, SimpleFillSymbol,
          SimpleLineSymbol,
          SimpleRenderer,
          graphic,
          esriLang,
          Color,
          number,
          domStyle,
          TooltipDialog,
          dijitPopup,
          parser]) => {


          parser.parse();
          const layerUrl = "http://localhost:6080/arcgis/rest/services/STXF/三线及自然保护地/MapServer";
          this.map = new Map(this.$refs.mapContainer, {
            sliderPosition: "top-right",
          });
          this.layer = new ArcGISDynamicMapServiceLayer(layerUrl);
          this.map.addLayer(this.layer);

          // 图版点击的属性表查询功能
          this.getMapServerChildLayerUrl(layerUrl).then(res1 => {
            // console.log(res1)
            res1.forEach(item => {
              this.getMapAttributeJsonByUrlAndRender(this.getJsonUrlByMapUrl(item));
            })
          });
        })
        .catch(err => {
          // handle any errors
          console.error(err);
        });
      this.selectedUrl = 'http://localhost:6080/arcgis/rest/services/STXF/三线及自然保护地/MapServer'

    },
    getLegendImgUrl(layerLevel, legendUrl) {
      return this.selectedUrl.concat("/", layerLevel, "/images/", legendUrl)
    },
    initWork() {
      // console.log(this.legendData.layers)
      console.log(this.getLegendImgUrl(this.legendData.layers[0].layerId, this.legendData.layers[0].legend[0].url))
    },
    getLegendData() {
      let url = "STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer/legend?f=pjson";
      getLegned(url).then((res) => {
        // console.log(res.data);
        this.legendData = res.data;

        this.initWork();
      })
    },

    // 根据arcmap server的json地址获取json对象
    getMapAttributeJsonByUrlAndRender(url) {
      axios.get(url).then(res => {
        if (res.status == 200) {
          // console.log(res.data);
          this.showDataDialog(url, res.data)
        }
      })
    },
    // 根据mapserver地图服务的地址获取其子图层的url数组
    async getMapServerChildLayerUrl(url) {
      let rs = []
      await this.getMapServerJson(url).then(res => {
        if (res.layers.length > 0) {
          const num = res.layers.length;
          for (let i = 0; i < num; i++) {
            rs.push(`${url}/${i}`);
          }
          // console.log(rs)
        }
      })
      return rs
    },
    // 根据url获取图层的json数据
    getJsonUrlByMapUrl(url) {
      return `${url}?f=pjson`;
    },
    // 根据地图服务的地址url获取地图服务的json地址url
    getMapServerJson(url) {
				// console.log(`${url}?f=pjson`)
				return new Promise((resolve, reject) => {
					axios.get(`${url}?f=pjson`).then(res => {
						// console.log(res);
						resolve(res.data)
					}).catch(err => {
						reject(err.data)
					}).then(() => {
						
					})
				})
			},
    // 显示属性字段弹窗
    showDataDialog(url, configJson) {
      loadModules(["esri/dijit/PopupTemplate",
        "esri/layers/FeatureLayer",
      ]).then(([PopupTemplate, FeatureLayer]) => {
        // console.log(configJson.fields)
        var list = [];
        var listFields = [];
        configJson.fields.forEach((item) => {
          if (!(item.name == "OBJECTID" || item.name == "SHAPE")) {
            listFields.push(item.name)
            list.push({
              "fieldName": item.name,
              "label": item.alias,
              "visible": true,
              "format": {
                places: 0,
                digitSeparator: true
              }
            })
          }
        })
        let popupTemplate = new PopupTemplate({
          title: "属性表字段",
          fieldInfos: list,
        });
        let featureLayer = new FeatureLayer(url.split('?')[0], {
          "infoTemplate": popupTemplate,
          "outFields": listFields,
          "opacity": 0.8
        })
        this.map.addLayer(featureLayer);
      })

    }
  },

}
</script>
<style lang='scss' scoped>
// @import "https://js.arcgis.com/3.15/esri/themes/calcite/esri/esri.css";
// @import "http://js.arcgis.com/3.15/dijit/themes/tundra/tundra.css";
@import "http://js.arcgis.com/3.44/esri/css/esri.css";
// @import "http://localhost:6080/arcgis/rest/static/jsapi.css";

.mapContainer {
  width: 100%;
  height: 100%;
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