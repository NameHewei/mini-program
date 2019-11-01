import uCharts from '../../../public/js/u-charts.min.js';
// var canvasLine = null;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // data: {
    //   canvasId: 'canvasColumn',
    //   series: [{
    //     name: '成交量A',
    //     data: [35, 20, 25, 37, 4, 20],
    //     color: '#000000'
    //   }, {
    //     name: '成交量B',
    //     data: [70, 40, 65, 19, 44, 68]
    //   }, {
    //     index: 1,
    //     name: '成交量C',
    //     data: [100, 80, 95, 150, 112, 132]
    //   }]
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasLine: null,
    cWidth: '',
    cHeight: '',
    sliderMax: 20,
    //x轴单屏数据密度
    itemCount: 4,
  },

  lifetimes: {
    attached: function() {
      this.cWidth = wx.getSystemInfoSync().windowWidth;
      this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;

      this.showLine();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @des 生成图表
     */
    showLine() {
      this.canvasLine = new uCharts({
        $this: this,
        canvasId: 'canvasLine',
        type: 'line',
        title: {
          name: '222222'
        },
        legend: true,
        fontSize: 11,
        background: '#FFFFFF',
        animation: true,
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
        series: [{
          name: '成交量A',
          data: [35, 20, 25, 37, 4, 20],
          color: '#000000'
        }, {
          name: '成交量B',
          data: [70, 40, 65, 19, 44, 68]
        }, {
          index: 1,
          name: '成交量C',
          data: [100, 80, 95, 150, 112, 132]
        }],
        enableScroll: true, //开启图表拖拽功能
        xAxis: {
          type: 'grid',
          gridColor: '#CCCCCC',
          gridType: 'dash',
          itemCount: 4, //x轴单屏显示数据的数量，默认为5个
          scrollShow: true, //新增是否显示滚动条，默认false
          scrollAlign: 'left', //滚动条初始位置
          scrollBackgroundColor: '#F7F7FF', //默认为 #EFEBEF
          scrollColor: '#DEE7F7', //默认为 #A6A6A6
          disableGrid: false,
          format: (v) => {
            console.log(v);
            return v + '11'
          }
        },
        yAxis: {
          data: [{
            title: 'y1',
            position: 'left',
            format: (v) => {
              return v + '1=1'
            }
          }, {
            position: 'right',
          }]
        },
        dataLabel: true,
        width: this.cWidth,
        height: this.cHeight,
        padding: [30, 15, 4, 15],
        extra: {
          line: {
            type: 'straight',
            width: 1
          }
        }
      });
    },

    /**
     * @des 图表事件
     */
    touchStart(e) {
      this.canvasLine.scrollStart(e);
      this.canvasLine.touchLegend(e);
      this.canvasLine.showToolTip(e);
    },

    /**
     * @des 图表事件
     */
    touchMove(e) {
      this.canvasLine.scroll(e);
    },

    /**
     * @des 图表事件
     */
    touchEnd(e) {
      this.canvasLine.scrollEnd(e);
    },

    /**
     * @des 缩小
     */
    reduce(e) {
      let num = this.data.itemCount + 1;
      const max = this.data.sliderMax;
      if (num >= max) {
        num = max;
      }
      this.setData({
        itemCount: num
      })
      console.log('reduce', num)
      this.canvasLine.zoom({
        itemCount: num
      });
    },

    /**
     * @des 放大
     */
    enlarge(e) {
      let num = this.data.itemCount - 1;
      if (num <= 1) {
        num = 1;
      }
      this.setData({
        itemCount: num
      })
      console.log('enlarge', num)
      this.canvasLine.zoom({
        itemCount: num
      });
    },
  }
})