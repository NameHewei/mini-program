import uCharts from '../../../public/js/u-charts.min.js';
var _self;
var canvaRing = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    cWidth: '',
    cHeight: '',
    pixelRatio: 1,
    serverData: '',
  },

  lifetimes: {
    attached() {
      _self = this;
      const width = wx.getSystemInfoSync().windowWidth;
      this.setData({
        cWidth: width,
        cHeight: 500 / 750 * width,
      }, () => {
        this.showRing();
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showRing() {
      canvaRing = new uCharts({
        $this: this,
        canvasId: 'canvasId',
        type: 'ring',
        fontSize: 11,
        legend: true,
        title: {
          name: '70%',
          color: '#7cb5ec',
          fontSize: 25,
          offsetY: 0,
        },
        subtitle: {
          name: '收益率',
          color: '#666666',
          fontSize: 15,
          offsetY: 3,
        },
        extra: {
          pie: {
            offsetAngle: -45,
            ringWidth: 40,
            labelWidth: 15
          }
        },
        background: '#FFFFFF',
        pixelRatio: 1,
        series: [{
          "name": "一班",
          "data": 50
        }, {
          "name": "二班",
          "data": 30
        }, {
          "name": "三班",
          "data": 20
        }, {
          "name": "四班",
          "data": 18
        }, {
          "name": "五班",
          "data": 8
        }],
        animation: true,
        width: this.data.cWidth,
        height: this.data.cHeight,
        disablePieStroke: true,
        dataLabel: true,
      });
    }
  }
})