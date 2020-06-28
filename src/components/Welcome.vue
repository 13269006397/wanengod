<template>
  <div>
      <div class="echarts-div" id="myChart" :style="{width: this.width, height: '300px'}"></div>
      <div class="echarts-div" id="myChart5" :style="{width: this.width, height: '300px'}"></div>
      <div class="echarts-div" id="myChart2" :style="{width: this.width, height: '300px'}"></div>
      <div class="echarts-div" id="myChart1" :style="{width: this.width, height: '300px'}"></div>
      <div class="echarts-div" id="myChart8" :style="{width: this.Swidth, height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      width: '425px',
      Swidth: '660px'
    }
  },
  mounted () {
    this.creatE()
    this.creatB()
    this.creatC()
    this.creatZ()
    this.creatN()
  },
  methods: {
    creatE () {
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        // title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    creatB () {
      const myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart.setOption({
        angleAxis: {
        },
        radiusAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四'],
          z: 10
        },
        polar: {
        },
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a'
        }, {
          type: 'bar',
          data: [2, 4, 6, 8],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a'
        }, {
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a'
        }],
        legend: {
          show: true,
          data: ['A', 'B', 'C']
        }
      })
    },
    creatC () {
      const myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      myChart.setOption({
        xAxis: {},
        yAxis: {},
        series: [{
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68],
            [1.0, 1.0],
            [3.0, 8.0],
            [4.5, 10.0],
            [7.5, 10.0],
            [9.0, 8.0],
            [6.0, 8.0],
            [3.5, 6.0],
            [4.0, 4.0],
            [6.0, 2.5]
          ],
          type: 'scatter'
        }]
      })
    },
    creatZ () {
      const myChart = this.$echarts.init(document.getElementById('myChart5'))
      // 绘制图表
      myChart.setOption({
        // 当前插件的背景图
        backgroundColor: '#DFE9FB',
        title: {
          text: '登录方式',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#874429'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              color: '#874429'
            },
            labelLine: {
              lineStyle: {
                color: '#874429'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      })
    },
    creatN () {
      const myChart = this.$echarts.init(document.getElementById('myChart8'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直达', selected: true },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 335, name: '直达' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1048, name: '百度' },
              { value: 251, name: '谷歌' },
              { value: 147, name: '必应' },
              { value: 102, name: '其他' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.echarts-div {
  float: left;
  display: inline;
}
</style>
