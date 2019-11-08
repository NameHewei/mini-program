import uCharts from '../../../public/js/u-charts.min.js';

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
    canvasLine: null,
    canvasId: 'canvasId' + Math.ceil(Math.random() * 100),
    cWidth: '',
    cHeight: '',
    sliderMax: 20,
    //x轴单屏数据密度
    itemCount: 4,
  },

  lifetimes: {
    attached: function() {
      const width = wx.getSystemInfoSync().windowWidth;
      this.setData({
        cWidth: width,
        cHeight: 500 / 750 * width,
      }, () => {
        this.showLine();
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showRing() {

    },
    /**
     * @des 生成图表
     */
    showLine() {
      const {
        canvasId, cWidth, cHeight
      } = this.data;
      
      const tempObj = new uCharts({
        $this: this,
        canvasId: canvasId,
        type: 'line',
        title: {
          name: 'y轴标题'
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
            return v + '11'
          }
        },
        yAxis: {
          /* 是否要显示y轴标题 */
          showTitle: true,
          data: [{
            title: 'y1',
            position: 'left',
            format: (v) => {
              return v + '1=1'
            }
          }, {
            title: 'y2',
            position: 'right',
          }],
        },
        dataLabel: true,
        width: cWidth,
        height: cHeight,
        padding: [30, 15, 4, 15],
        extra: {
          line: {
            type: 'straight',
            width: 1
          }
        }
      });

      this.setData({
        canvasLine: tempObj 
      })
    },

    /**
     * @des 图表事件
     */
    touchStart(e) {
      this.data.canvasLine.scrollStart(e);
      this.data.canvasLine.touchLegend(e);
      this.data.canvasLine.showToolTip(e);
    },

    /**
     * @des 图表事件
     */
    touchMove(e) {
      this.data.canvasLine.scroll(e);
    },

    /**
     * @des 图表事件
     */
    touchEnd(e) {
      this.data.canvasLine.scrollEnd(e);
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
      this.data.canvasLine.zoom({
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
      this.data.canvasLine.zoom({
        itemCount: num
      });
    },
  }
})