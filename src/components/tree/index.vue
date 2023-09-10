<template>
  <div>
    <el-tree :props="treeProps" :render-content="renderContentTree" :data="projectTree" node-key="level"
      :default-expanded-keys="['现状数据', '规划数据', '项目数据']" show-checkbox @check-change="handleCheckChange"
      :filter-node-method="filterNode" ref="tree" class="p-tree">
    </el-tree>
    <el-dialog :visible.sync="dialogVisible" title="图层加载提示" width="30%">
      <span>加载图层过多，等待时间较长，是否确定加载？</span>
      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmBtnclick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { store } from "@/store/store.js"
import data from '@/mock/data.js'
import { loadModules } from 'esri-loader';
export default {
  name: 'prjTree',

  data() {
    return {
      projectTree: data.projectTree,
      // 超过x长度简写字符串
      lenSimpleWrite: 8,
      // 弹窗属性
      dialogVisible: false,
    };
  },
  props: {
    treeProps: {
      label: 'label',
      children: 'children'
    },
    // projectTree: data.projectTree
  },

  components: {},

  computed: {},

  watch: {},

  beforeCreate() { },

  created() { },

  mounted() {
    console.log(this.projectTree)
    // console.log(store.addSelectLayer({ name: 'sd', label: 'dadad' }))
  },

  methods: {
    // 左侧树节点点击事件
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      loadModules([
        "esri/layers/FeatureLayer",
      ]).then(([FeatureLayer]) => {
        if (data.children != null) {
          if (checked) {
            if (data.children.length > 6) {
              this.dialogVisible = true;
            } else {

            }
          }
        } else {
          if (data.url != "") {
            if (checked) {
              // 选中了无根的节点
              var fl = new FeatureLayer(data.url, {
                id: data.label,
                // infoTemplate: template
              });
              console.log(store.state.eMap)

              store.state.eMap.addLayer(fl);

              store.addSelectLayer(fl)
              console.log(store.state.eMap)
            } else {
              console.log(store.state.eSelectLayers)
              if (store.state.eSelectLayers.length > 0) {
                store.state.eSelectLayers.forEach(item => {
                  if (item.id == data.label) {
                    const delLayer = item;
                    store.removeSelectLayer(delLayer.id)
                    store.state.eMap.removeLayer(delLayer);

                  }
                })
              }
              // removeLayer(layer)
            }
          }
        }
      })

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 渲染树节点
    renderContentTree(h, { node, data }) {
      console.log(node, data)

      return (
        <span style="width: 100%;display: flex;align-items: center;justify-content: space-between;font-size: 14px;">
          <span style="display: flex;align-items: center;justify-content: flex-start;width: 80%;font-size: 14px;">
            <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white;margin:0 10px 0 0;font-size: 14px;'>{node.level === 1 ? '一级' : node.level === 2 ? '二级' : '三级'}</span>

            {this.isToSimpleStr(node.label) ? this.strToSimpleStr(node.label) + this.getEndStr(node) : node.label + this.getEndStr(node)}


          </span>
          {data.children ? <i class="el-icon-coin"></i> : <i class="el-icon-s-data"></i>}
        </span>
      )

      if (data.children) {
        return (
          <span style="width: 100%;display: flex;align-items: center;justify-content: space-between;font-size: 14px;">
            <span style="display: flex;align-items: center;justify-content: flex-start;width: 80%;font-size: 14px;">
              <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white;margin:0 10px 0 0;font-size: 14px;'>{node.level === 1 ? '一级' : node.level === 2 ? '二级' : '三级'}</span>

              {this.isToSimpleStr(node.label) ? this.strToSimpleStr(node.label) + this.getEndStr(node) : node.label + this.getEndStr(node)}


            </span>
            <i class="el-icon-coin"></i>
          </span>
        )
      } else {
        console.log('qqqqqqqqqqqqqq')
        return (
          <span style="width: 100%;display: flex;align-items: center;justify-content: space-between;font-size: 14px;">
            <span style="display: flex;align-items: center;justify-content: flex-start;width: 80%;font-size: 14px;">
              <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white;margin:0 10px 0 0;font-size: 14px;'>{node.level === 1 ? '一级' : node.level === 2 ? '二级' : '三级'}</span>

              {this.isToSimpleStr(node.label) ? this.strToSimpleStr(node.label) + this.getEndStr(node) : node.label + this.getEndStr(node)}


            </span>
            <i class="el-icon-s-data"></i>
          </span>
        )
        if (node.level == 3) {
          return (
            <span style="width: 100%;display: flex;align-items: center;justify-content: space-between;font-size: 14px;">
              <span style="display: flex;align-items: center;justify-content: flex-start;width: 80%;font-size: 14px;">
                <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white;margin:0 10px 0 0;font-size: 14px;'>{node.level === 1 ? '一级' : node.level === 2 ? '二级' : '三级'}</span>

                {this.isToSimpleStr(node.label) ? this.strToSimpleStr(node.label) : node.label}


              </span>
              <i class="el-icon-s-data"></i>
            </span>
          )
        } else {

        }
      }
      //三级时样式调整
      let classname = ''
      if (node.level === 3) {
        classname = 'levename'
      }
      return <p class={classname}> <span style='background-color:#409EFF;font-size:12px;padding:2px;color:white'>三级</span>&nbsp;&nbsp;&nbsp;{node.label}</p>

    },
    isToSimpleStr(s) {
      // console.log(s.length)
      return s.length >= this.lenSimpleWrite;
    },
    strToSimpleStr(s) {
      return this.isToSimpleStr(s) ? s.substr(0, this.lenSimpleWrite) + "..." : s
    },
    getEndStr(node) {
      // return '  ☛   ' + '(' + (node.level === 2 ? (node.childNodes || []).filter((i) => i.checked).length : (node.childNodes || []).reduce((prev, item) => {
      //     return prev + (item.childNodes || []).filter((i) => i.checked).length
      //   }, 0))
      //   + '/' + (node.level === 2 ? (node.childNodes || []).length : (node.childNodes || []).reduce((prev, item) => {
      //     return prev + (item.childNodes || []).length
      //   }, 0))
      //   + ')';
      console.log(node)
      // 根据有没有子节点生成后缀
      if (node.childNodes.length > 0) {
        return '  ☛   ' + '(' + this.countChildWithoutChildren(node.childNodes, true)
          + '/' + this.countChildWithoutChildren(node.childNodes)
          + ')';
      } else {
        return '';
      }

    },
    // 计数子节点children的数据
    countChildWithoutChildren(array, isCheck = false) {
      console.log(isCheck)
      let count = 0;
      for (var obj of array) {
        if (obj.isLeaf) {
          // 不管节点是否选中都计数
          if (!isCheck) count++;
          else {
            // 只计数选中节点
            if (obj.checked) {
              count++;
              console.log(obj)
            }
          }
        } else {
          count += this.countChildWithoutChildren(obj.childNodes, isCheck)
        }
      }
      return count
    },
    handleConfirmBtnclick(e) {
      this.dialogVisible = false;
    }
  }
}
</script>
<style lang='scss'>
// .v-model {
//   display: none;
// }
</style>
<style lang="scss" scoped>
.content-tree {
  .el-dialog__wrapper {}
}
</style>