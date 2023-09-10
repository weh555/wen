// 用地指标-指标台账
const data = {
  // 新增耕地指标
  xzhdTable: [
    //id 项目名称 投资规模 承建单位  立项时间 项目类型 项目地址
    // type 1增减挂  2新增耕地 3其它
    {
      id: 2,
      xmmc: '岳池县天平续桥亭子等(7)个村土地整理项目',
      p1: '171.33',
      p2: '8.2',
      p3: '1.5',
      p4: '5.46',
      p5: '1192.46',
      p6: '岳池县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '13'
    },
    {
      id: 3,
      xmmc: '前锋区小井乡双流村、优良村、骑龙村、优胜村土地整理项目',
      p1: '92.38',
      p2: '7.8',
      p3: '1.5',
      p4: '5.46',
      p5: '668.83',
      p6: '前锋区人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '33'
    },
    {
      id: 4,
      xmmc: '广安区龙台镇车堂村、小桥村、团结村、云龙村、高烩村、塔水村、三拱村土地整理项目',
      p1: '25.32',
      p2: '8.4',
      p3: '1.5',
      p4: '5.32',
      p5: '172.68',
      p6: '广安区人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '11'
    },
    {
      id: 5,
      xmmc: '广安区协兴镇先锋村、春堡村土地整理项目',
      p1: '152.36',
      p2: '7.7',
      p3: '1.5',
      p4: '5.81',
      p5: '1113.75',
      p6: '广安区人民人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '113'
    },
    {
      id: 6,
      xmmc: '邻水县两河乡、华家镇、城北镇、高滩镇4个士地整理项目',
      p1: '46',
      p2: '7.6',
      p3: '1.5',
      p4: '5.88',
      p5: '339.48',
      p6: '邻水县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '21'
    },
    {
      id: 7,
      xmmc: '邻水县九龙镇关堂村、华光村土地整理项目',
      p1: '101.51',
      p2: '7.6',
      p3: '1.5',
      p4: '5.88',
      p5: '749.14',
      p6: '邻水县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '73'
    },
    {
      id: 8,
      xmmc: '邻水县石永镇镇山村和石合场村土地整理项目',
      p1: '66.28',
      p2: '7.3',
      p3: '1.5',
      p4: '6.09',
      p5: '503.07',
      p6: '邻水县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '42'
    },
    {
      id: 9,
      xmmc: '武胜县胜利镇八角村等九个村土地整理项目',
      p1: '83.67',
      p2: '8.0',
      p3: '1.5',
      p4: '5.6',
      p5: '594.06',
      p6: '武胜县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '69'
    },
    {
      id: 10,
      xmmc: '武胜县沿口镇等4个土地整理项目',
      p1: '185.2',
      p2: '7.8',
      p3: '1.5',
      p4: '5.74',
      p5: '1340.85',
      p6: '武胜县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '158'
    },
    {
      id: 11,
      xmmc: '岳池县裕民镇广兴场村、石佛寺村、土地堂村、香炉嘴社区、羊山寺村、祖家院村土地整理项目',
      p1: '55.63',
      p2: '7.5',
      p3: '1.5',
      p4: '5.95',
      p5: '414.44',
      p6: '岳池县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '20'
    },
    {
      id: 12,
      xmmc: '岳池县新场镇、平安乡2个土地整理项目',
      p1: '78.93',
      p2: '7.7',
      p3: '1.5',
      p4: '5.81',
      p5: '576.98',
      p6: '岳池县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '63'
    },
    {
      id: 13,
      xmmc: '华蓥市阳和镇龙山寨村土地整理项目',
      p1: '59.87',
      p2: '8.2',
      p3: '1.5',
      p4: '5.46',
      p5: '416.70',
      p6: '华蓥市人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '26'
    },
    {
      id: 14,
      xmmc: '岳池县西板乡、镇裕镇2个土地整理项目',
      p1: '201.56',
      p2: '8.1',
      p3: '1.5',
      p4: '5.53',
      p5: '1416.97',
      p6: '岳池县人民政府',
      p7: '否',
      p8: '位置导航',
      p9: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p10: '|||||||||||||||||||||||||||||||||||||||||||||||||',
      p11: '备注',
      p12: '',
      p13: '152'
    },
  ],
  // 增减挂项目
  zjgTable: [
    //id 项目名称 投资规模 承建单位  立项时间 项目类型 项目地址
    {
      id: 1,
      xmmc: '广安区花桥镇城乡建设用地增减挂钩项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 2,
      xmmc: '广安区广门乡村、与枣山镇伍佳村、三圣村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 3,
      xmmc: '广安区枣山镇与枣山镇黑虎村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 4,
      xmmc: '武胜县龙女镇青岩村、幸福村、马耳石村、袁家庙村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 5,
      xmmc: '武胜县清平镇白果村、陈家寨村、石岭村、红东村、会云村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 6,
      xmmc: '岳池县北城乡普庵寺村、石院墙村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 7,
      xmmc: '岳池县九龙镇菊花山村、百步梯村、石庙村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 8,
      xmmc: '邻水县城北镇等七个城乡建设用地增减挂钩项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 9,
      xmmc: '邻水县石勇镇等8个城乡建设用地增减挂钩项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 10,
      xmmc: '邻水县御临镇茅白村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 11,
      xmmc: '华蓥市禄市镇走马岭村等11个增减挂钩项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 12,
      xmmc: '华蓥市禄市镇大石坝村、六水沟村、山门口村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 13,
      xmmc: '邻水县椿木乡、华蓥乡、高滩镇城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 14,
      xmmc: '华蓥市阳和镇、庆华镇3个增减挂钩项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
    {
      id: 15,
      xmmc: '岳池县北城乡普庵寺村、石院墙村城乡建设用地增减挂钩试点项目',
      p1: '183.2745',
      p2: '50.04',
      p3: '130.6725',
      p4: '3658.83',
      p5: '广安区人民政府',
      p6: '位置导航',
      p7: '附件下载',
      p8: '备注',
      p9: '3'
    },
  ],
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
        { label: '自然与历史文化资源', level: '1-9', url: 'http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer/3', children: null },
        { label: '不动产登记', level: '1-10', url: '', children: null },
        { label: '自然资源确权登记', level: '1-11', url: '', children: null },
      ]
    },
    {
      label: '规划数据', level: '2', url: '', children: [
        {
          label: '重要控制线', url: '', children: [
            { label: '永久基本农田', url: 'http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer/1', children: null },
            { label: '生态保护红线', url: 'http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer/2', children: null },
            { label: '城镇开发边界', url: 'http://localhost:6080/arcgis/rest/services/STXF/%E4%B8%89%E7%BA%BF%E5%8F%8A%E8%87%AA%E7%84%B6%E4%BF%9D%E6%8A%A4%E5%9C%B0/MapServer/0', children: null },
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
  ],
  
}
export default data