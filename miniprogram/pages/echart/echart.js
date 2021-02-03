import * as echarts from '../../components/ec-canvas/echarts';

const charts = [];

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  charts.push(chart);
  canvas.setChart(chart);

  const option = {
    title: {
      text: 'title',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['A', 'B', 'C'],
      top: 25,
      left: 'center',
      backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    dataZoom: [
      { 
        type: 'inside',
        start: 0,
        end: 100,
        xAxisIndex: 0
       }, {
         type: 'inside'
       }
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7'],
    },
    yAxis: [{
      name: 'y1',
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },{
        name: 'y2',
        type: 'value',
    }],
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      yAxisIndex: 1,
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10],
      type: 'line',
    }]
  };

  chart.setOption(option);
  return chart;
}

// pages/echart/echart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  enlarge() {
    charts[0].dispatchAction({
      type: 'dataZoom',
      start: 20,
      end: 30
    });
  }
})