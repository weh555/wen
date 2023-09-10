<template>
  <div class="zwfw-content">
    <div class="left-menu">
      <div class="menu1" v-if="!isShowDetail">
        <el-input placeholder="请输入关键词搜索" size="small" v-model="searchKey">
          <i slot="prepend" class="el-icon-search"></i>
        </el-input>
        <el-button type="primary" class="hvr-float-shadow">
          全部</el-button>
        <el-button class="hvr-float-shadow">计划书</el-button>
        <el-button class="hvr-float-shadow">报告</el-button>
        <el-button class="hvr-float-shadow">方案</el-button>
        <el-button class="hvr-float-shadow">总结</el-button>
        <el-button class="hvr-float-shadow">心得体会</el-button>
        <el-button class="hvr-float-shadow">合同</el-button>
      </div>
      <div class="menu2" v-if="isShowDetail">
        <el-button icon="el-icon-back" class="return-button" @click="hideDetailBtnClick">返回</el-button>
        <el-input placeholder="请输入关键词搜索" size="small" v-model="searchKey">
          <i slot="prepend" class="el-icon-search"></i>
        </el-input>
        <el-button class="hide-btn">全部收起</el-button>
        <i class="el-icon-arrow-down hide-icon"></i>
        <div class="menu-btn">
          <svg-icon class="btn-icon" icon-class="card1" />
          文章一键写作
        </div>
        <i class="el-icon-arrow-down hide-icon"></i>
        <div class="menu-btn" v-for="item in cardInfoList">
          <svg-icon class="btn-icon" :icon-class="item.icon" />
          {{ item.title }}
        </div>
      </div>

    </div>
    <div class="content">
      <div class="menu-panel" v-if="!isShowDetail">
        <div class="title">全部</div>
        <div class="card-panel">
          <div class="card hvr-float-shadow" v-for="item in cardInfoList" @click="detailBtnClick">
            <div class="card-title">
              <svg-icon :icon-class="item.icon" class="card-svg" />
              <span>{{ item.title }}</span>
            </div>
            <div class="card-content">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
      <div class="generate-panel" v-if="isShowDetail">
        <div class="generate-form-panel">
          <p>文章一键写作</p>
          <div class="xzyd">
            <p><span>*</span>写作类型和用途</p>
            <el-select class="select" v-model="selectTypeValue" placeholder="请选择">
              <el-option
                v-for="item in dropMenu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <p><span>*</span>写作用途</p>
            <el-input class="input" v-model="xzyt"> -->
            <!-- </el-input> -->
          </div>
          <div class="wztm">
            <p><span>*</span>关键词设定:</p>
            <el-input class="input" v-model="wztm">
            </el-input>
            <el-button type="primary" @click="generate">立即生成</el-button>
          </div>
        </div>

        <div class="generate-view-panel" v-if="showResult">
          <p>生成文案</p>
          <div class="word-panel">
            <div class="opt-panel">
              <div class="word">
                <span>编辑</span>
                <span>查看</span>
                <span>格式</span>
              </div>
              <div class="word">
                <svg-icon class="icon" icon-class="word1"></svg-icon>
                <svg-icon class="icon" icon-class="word2"></svg-icon>
                <select name="type" id="de">
                  <option value="1" selected>段落</option>
                </select>
                <span class="bold">B</span>
                <span class="italic">I</span>
                <svg-icon class="icon" icon-class="word3"></svg-icon>
                <svg-icon class="icon" icon-class="word4"></svg-icon>
                <svg-icon class="icon" icon-class="word5"></svg-icon>
                
                <svg-icon class="icon" icon-class="word6"></svg-icon>
                <svg-icon class="icon" icon-class="word7"></svg-icon>

              </div>
              <el-button type="primary" size="small" class="export-btn">立即导出</el-button>
            </div>
            <div contenteditable="true" class="word-content">
              <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 400 }" placeholder="" v-model="textarea">
              </el-input> -->
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:黑体; font-size:24pt; font-weight:bold">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:center; widows:0">
                <span style="font-family:黑体; font-size:24pt; font-weight:bold">市自然资源和规划局</span>
                <span style="font-family:黑体; font-size:24pt; font-weight:bold">2022年工作总结及2023年工作重点</span>
              </p>
              <br />
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:等线; font-size:10.5pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:等线; font-size:10.5pt">&#xa0;</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span
                  style="font-family:宋体; font-size:16pt">2022年，我局在市委、市政府的坚强领导下，积极主动作为，尽职尽责保护自然资源、节约集约利用资源、尽心尽力维护群众权益,为全市经济社会发展提供坚实的要素支撑。现将2022年工作总结暨2023年工作</span>
                <span style="font-family:宋体; font-size:16pt">计划汇报</span>
                <span style="font-family:宋体; font-size:16pt">如下:</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:黑体; font-size:16pt; font-weight:bold">一、</span>
                <span style="font-family:黑体; font-size:16pt; font-weight:bold">2022年工作完成情况</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">（</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">一</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">）</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">聚焦规划引领，积极谋划全域发展</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">一是国土空间规划体系积极推进。</span>
                <span style="font-family:宋体; font-size:16pt">市级层面</span>
                <span
                  style="font-family:宋体; font-size:16pt">:完成了“三区三线”成果划定，通过了国家首批审核并正式启用。《全市共划定生态保护红线
                  <span style="font-family:宋体; font-size:16pt; color: red;  text-decoration: underline">1331</span>
                  平方公里，永久基本农田红线</span>
                <span style="font-family:宋体; font-size:16pt; color: red;  text-decoration: underline">7231</span>
                <span
                  style="font-family:宋体; font-size:16pt">平方公里，城镇开发边界<span style="font-family:宋体; font-size:16pt; color: red;  text-decoration: underline">2981</span>平方公里。永久基本农田的优化调整使得一批全市重大项目得以开工，有力地促进了社会经济的发展。县级层面:3</span>
                <span style="font-family:宋体; font-size:16pt">个</span>
                <span style="font-family:宋体; font-size:16pt">县</span>
                <span style="font-family:宋体; font-size:16pt">《</span>
                <span style="font-family:宋体; font-size:16pt">市、区)同步推进编制工作开展，目前均已形成中间成果。乡镇层面:目前全市23</span>
                <span style="font-family:宋体; font-size:16pt">个</span>
                <span style="font-family:宋体; font-size:16pt">乡镇正在编制中，已有6</span>
                <span style="font-family:宋体; font-size:16pt">个</span>
                <span style="font-family:宋体; font-size:16pt">乡镇形成国土空间规划初步成果。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">二是村庄规划工作成效显著。</span>
                <span style="font-family:宋体; font-size:16pt">按照省厅指示，重点推进村庄规划编制工作，目前全市</span>
                <span style="font-family:宋体; font-size:16pt">39</span>
                <span style="font-family:宋体; font-size:16pt">个</span>
                <span style="font-family:宋体; font-size:16pt">村庄规划正在编制中，13</span>
                <span style="font-family:宋体; font-size:16pt">个</span>
                <span style="font-family:宋体; font-size:16pt">村庄已形成初步成果。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">三</span>
                <span style="font-family:楷体; font-size:16pt">是积极推进专项规划工作。</span>
                <span style="font-family:宋体; font-size:16pt"></span>
                <span style="font-family:宋体; font-size:16pt">科创新</span>
                <span style="font-family:宋体; font-size:16pt">城总体规划方案</span>
                <span style="font-family:宋体; font-size:16pt">编制邀请国内知名专家进行指导、评审，确保</span>
                <span style="font-family:宋体; font-size:16pt">科创新城达到</span>
                <span style="font-family:宋体; font-size:16pt">国内一流水准，积极编制中小学及幼儿园专项规划</span>
                <span style="font-family:宋体; font-size:16pt">《</span>
                <span style="font-family:宋体; font-size:16pt">2020-2035)目前已形成初步成果，开展</span>
                <span style="font-family:宋体; font-size:16pt">《</span>
                <span style="font-family:宋体; font-size:16pt">城市更新专项规划及三年行动计划</span>
                <span style="font-family:宋体; font-size:16pt">》</span>
                <span style="font-family:宋体; font-size:16pt">编制工作，补齐城市基础配套设施和公共服务设施短板，推动城区结构优化调整，不断提升人居环境品质。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">四是规划管理水平全面提升。</span>
                <span
                  style="font-family:宋体; font-size:16pt">改革市规划审批制度，建立专家评审制度，规范规划程序和质量，严格控制违法违规建设。加强与相关部门的协同配合，加强规划宣传，提高社会各界对规划的认同和理解程度。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">（</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">二</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">）</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">坚持生态优先，推进城市绿化建设</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">一是推进城市绿化提质增效。</span>
                <span style="font-family:宋体; font-size:16pt">通过落实“绿化行动计划”，加强城市绿化建设，新建绿地</span>
                <span style="font-family:宋体; font-size:16pt">281公顷，提升公园、广场绿化质量，增加市民休闲娱乐空间，提高城市品质。同时，加强绿化养护，提</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">二是</span>
                <span style="font-family:楷体; font-size:16pt">提</span>
                <span style="font-family:楷体; font-size:16pt">高绿化覆盖率和绿化质量。</span>
                <span
                  style="font-family:宋体; font-size:16pt">二是推进生态修复。积极推进湿地、水源地、山地等生态修复工作，加大生态环境保护力度加强重点区域生态环境监测，及时发现和解决环境问题。同时，加强生态文明宣传，提高公众环保意识。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">（</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">三</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">）</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">推进土地利用集约化，加强土地管理监管</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">一</span>
                <span style="font-family:楷体; font-size:16pt">是推进土地利用总体规划编制。</span>
                <span style="font-family:宋体; font-size:16pt">全面推进城乡空间管控规划，加强土地利用总体规划编制指导城乡用地布局和土</span>
                <span style="font-family:宋体; font-size:16pt">地利用结构调整，实现土地资源的高效利用和保护。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">二是加强土地管理监管。</span>
                <span style="font-family:宋体; font-size:16pt">加强土地出让管理，规范土地流转，完善土地监管体系，加强对违法违规用地的查处，保护土地资源安全。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">三是推进农村土地整治。</span>
                <span style="font-family:宋体; font-size:16pt">加强农村土地整治，推进农村土地集约利用，提高农村土地资源的保护和利用效益。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">（</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">四</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">）</span>
                <span style="font-family:宋体; font-size:16pt; font-weight:bold">优化城市空间布局，推进城市建设提质增效</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">一是推进城市更新。</span>
                <span style="font-family:宋体; font-size:16pt">加强城市更新规划和实施，推进老旧小区改造和城市更新项目建设，提升城市品质和功能，改善居民居住环境。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">二是推进城市基础设施建设。</span>
                <span
                  style="font-family:宋体; font-size:16pt">全面推进城市基础设施建设，加强水、电、气、路、桥等基础设施建设，提高城市基础设施水平，为城市发展提供强有力的支撑。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">二是推进城市交通建设。</span>
                <span style="font-family:宋体; font-size:16pt">加强城市交通规划和建设，优化城市交通布局，推进地铁、公交等公共交通建设，提高城市交通便捷度和流动性。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; widows:0">
                <span style="font-family:黑体; font-size:16pt; font-weight:bold">二、</span>
                <span style="font-family:黑体; font-size:16pt; font-weight:bold">2023年工作重点</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">（</span>
                <span style="font-family:楷体; font-size:16pt">一</span>
                <span style="font-family:楷体; font-size:16pt">）</span>
                <span style="font-family:楷体; font-size:16pt">推进国土空间规划体系建设。</span>
                <span
                  style="font-family:宋体; font-size:16pt">加强国土空间规划编制和管理，完善国土空间规划体系指导城乡用地布局和土地利用结构调整，实现土地资源的高效利用和保护。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">（</span>
                <span style="font-family:楷体; font-size:16pt">二</span>
                <span style="font-family:楷体; font-size:16pt">）</span>
                <span style="font-family:楷体; font-size:16pt">推进城市绿化建设。</span>
                <span style="font-family:宋体; font-size:16pt">加强城市绿化建设和管理，提高城市绿化覆盖率和质量，</span>
                <span style="font-family:宋体; font-size:16pt">推进生杰修复</span>
                <span style="font-family:宋体; font-size:16pt">和保护，打造美</span>
                <span style="font-family:宋体; font-size:16pt">丽城市。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">（</span>
                <span style="font-family:楷体; font-size:16pt">三</span>
                <span style="font-family:楷体; font-size:16pt">）</span>
                <span style="font-family:楷体; font-size:16pt">加强土地管理监管。</span>
                <span style="font-family:宋体; font-size:16pt">加强土地出让管理，规范土地流转，完善土地监管体系，加强对违法违规用地的查处，保护土地资源安全。</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">（</span>
                <span style="font-family:楷体; font-size:16pt">四</span>
                <span style="font-family:楷体; font-size:16pt">）</span>
                <span style="font-family:楷体; font-size:16pt">推进城市建设提质增效。</span>
                <span style="font-family:宋体; font-size:16pt">加强城市更新和基础设施建设，优化城市空间布局，提高城市品质和功能，改善居民居住环境</span>
              </p>
              <p style="margin:0pt; orphans:0; text-align:justify; text-indent:20pt; widows:0">
                <span style="font-family:楷体; font-size:16pt">（</span>
                <span style="font-family:楷体; font-size:16pt">五</span>
                <span style="font-family:楷体; font-size:16pt">）</span>
                <span style="font-family:楷体; font-size:16pt">加强规划管理和宣传。</span>
                <span style="font-family:宋体; font-size:16pt">加强规划管理和监督，规范规划程序和质量，提高规划宣传和公众参与度，推动城市可持续发展。</span>
              </p>
            </div>
          </div>
        </div>
        <div class="generate-view-panel wait-panel" v-if="showWait">
          <div>
            <i class="el-icon-loading"></i>
            <p>文章生成中</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      // 关键字搜索
      searchKey: '',
      cardInfoList: [
        // { id: '1', icon: 'card1', title: '文章一键写作', desc: '请输入您需要写作的【文章】题目，或【文章】材料需求，也可' },
        { id: '2', icon: 'card2', title: '按大纲写文章', desc: '请编入文章的[大纲]，也可以加入其他写作要求，要求越详细，' },
        { id: '3', icon: 'card3', title: '文章纠错', desc: '请编入您要纠错的[文章] 内客段落，也可以加入其他写作要求' },
        { id: '4', icon: 'card4', title: '做数据分析', desc: '请想制贴贴纳入需要分析的数据也可以提出具体要求，以便我能' },
        { id: '5', icon: 'card5', title: '生成数据图表', desc: '请复制粘贴输入器要分析的数据也可以提出具体要求，以便我能' },
        { id: '6', icon: 'card6', title: '智能降重', desc: '请复制输入需要障业的[内容段落]。每次复制内容建议低于60.' },
        { id: '7', icon: 'card7', title: '文献综述', desc: '请输入文献综述的题目，也可以加入其他写作要求，要求越详细' },
        { id: '8', icon: 'card8', title: '研究背景及目的', desc: '请输入题目。也可以加入其他写代要求。要求越详细，写作更能达' },
        { id: '9', icon: 'card9', title: '国内外研究动态', desc: '请输入题目，也可以加入其他写作要求，要求越详相，写作更能达' },
      ],
      isShowDetail: false,
      textarea: "",
      showWait: false,
      showResult: false,
      dropMenu:[
        { value: '1', label: '计划书' },
        { value: '2', label: '报告' },
        { value: '3', label: '方案' },
        { value: '4', label: '总结' },
        { value: '5', label: '心得体会' },
        { value: '6', label: '合同' },

      ],
      selectTypeValue: '',
      // 写作用途
      // xzyt: '',
      // 文章题目
      wztm: '',

    };
  },

  components: {},

  computed: {},

  watch: {},

  beforeCreate() { },

  created() { },

  mounted() { },

  methods: {
    detailBtnClick() {
      this.isShowDetail = true;
    },
    hideDetailBtnClick() {
      this.isShowDetail = false;
    },
    // 生成文档
    generate() {
      this.showWait = true;
      setTimeout(() => {
        this.showWait = false;
        this.showResult = true;
      }, 2000)
    }
  }
}
</script>

<style lang='scss' scoped>
.zwfw-content {
  width: 100%;
  height: 100%;
  background-color: #DCDFE6;

  .left-menu {
    width: 12em;
    height: 100%;
    background-color: #fff;
    float: left;

    .menu1 {
      width: 100%;
      height: 100%;

      .el-input {
        width: 86%;
        margin: 6px 7%;
      }

      .el-button {
        width: 86%;
        margin: 6px 7%;
        border: 1.5px solid #DCDFE6;

        box-shadow: 0 3px 6px 0 rgb(209, 204, 204);
      }
    }

    .menu2 {
      width: 100%;
      height: 100%;

      .return-button {
        border: 0px;
        cursor: pointer;
      }

      .el-input {
        width: 90%;
        margin: 10px 5%;

      }

      .hide-btn {
        border: 0;
        font-weight: bold;
        float: right;
        color: rgb(101, 201, 225);
        cursor: pointer;
      }

      .hide-icon {
        float: right;
        clear: both;
        margin: 20px 20px;
        cursor: pointer;
      }

      .menu-btn {
        width: 90%;
        margin: 10px 5%;
        padding: 6px 0;
        clear: both;
        border: 1px solid rgba($color: #DCDFE6, $alpha: 1.0);
        box-shadow: 4px 4px 12px 0 rgb(209, 204, 204);
        display: flex;
        align-items: center;
        border-radius: 4px;
        font-size: 15px;
        cursor: pointer;

        .btn-icon {
          width: 28px;
          height: 28px;
          margin-right: 8px;
        }
      }
    }
  }

  .content {
    width: calc(100% - 12em);
    height: 100%;
    padding: 16px;
    float: left;

    .menu-panel {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding: 12px;

      .title {
        width: 100%;
        font-size: 14px;
      }

      .card-panel {
        width: calc(100% - 20px);
        height: calc(100% - 60px);
        margin: 20px 10px;
        display: flex;
        align-content: start;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        box-sizing: border-box;

        .card {
          cursor: pointer;
          width: 15.6em;
          height: 8em;
          margin: 8px 8px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 6px 6px 12px 0 rgb(209, 204, 204), -1px -1px 6px 0 rgb(209, 204, 204);
          padding: 8px 12px;

          .card-title {
            font-size: 20px;
            display: flex;
            align-items: center;
            padding: 10px 0;
            letter-spacing: 1px;
            font-weight: bold;

            .card-svg {
              width: 40px;
              height: 40px;
              margin-right: 20px;
            }
          }

          .card-content {
            line-height: 22px;
            color: #666;
            font-size: 15px;
          }
        }
      }
    }
    // 文章一键写作
    .generate-panel {
      width: 100%;
      height: 100%;
      // padding: 12px;

      .generate-form-panel {
        width: 18em;
        height: 100%;
        background-color: #fff;
        float: left;
        padding: 12px;

        // 写作用途
        .xzyd {
          p {
            font-size: 14px;

            span {
              margin-right: 4px;
              transform: translateY(2px);
              color: red;
            }
          }

          .select {
            width: 100%;
          }

          .input {
            width: 100%;
          }
        }
        // 写作题目
        .wztm {
          p {
            font-size: 14px;

            span {
              margin-right: 4px;
              transform: translateY(2px);
              color: red;
            }
          }
          .el-button {
            width: 100%;
            transform: translateY(100%);
          }
        }
      }

      .generate-view-panel {
        width: calc(100% - 18em - 12px);
        height: 100%;
        margin-left: 12px;
        background-color: #fff;
        float: left;
        padding: 12px;

        p {
          font-weight: bold;
        }

        .word-panel {
          width: 100%;
          height: calc(100% - 52px);
          background-color: rgb(236, 227, 227);
          border: 1.5px solid #DCDFE6;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgb(209, 204, 204);

          .opt-panel {
            width: 100%;
            height: 80px;
            border-radius: 12px 12px 0 0;
            box-shadow: 3px 3px 6px 0 rgb(209, 204, 204);
            font-family: 'YAHEI';

            .word {
              width: 80%;
              height: 50%;
              display: flex;
              padding: 12px 12px;
              float: left;
              color: #666;

              span {
                margin-right: 16px;
                font-size: 14px;
              }

              .icon {
                margin: 0 10px 0 0;
                cursor: pointer;
              }

              select {
                width: 100px;
                margin-right: 20px;
                font-size: 8px;
                // background-color: rgb(229 221 221)
              }
              .bold {
                font-weight: bold;
              }
              .italic {
                font-style: italic;
              }
            }

            .export-btn {
              float: right;
              margin: 2px 10px;
            }
          }

          .word-content {
            width: 100%;
            height: calc(100% - 80px);
            overflow: auto;
            padding: 12px;
            line-height: 28px;
            color: #666;
          }
        }
      }
      .wait-panel {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          font-family: 'fangsong';
          color: #666;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.menu2 {
  .el-input {
    div {
      padding: 0 12px;
    }
  }
}

.el-input {
  border: 1.8px solid rgba(153,153,153,0.4);
  border-radius: 4px;
}
</style>