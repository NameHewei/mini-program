const computedBehavior = require('miniprogram-computed');

// pages/component/computed/computed.js
Component({
  behaviors: [computedBehavior],
  options: {
    styleIsolation: 'apply-shared'
  },
  data: {
    score: 88,
    name: 'hewitt',
    score1: 1,
    score2: 2,
    score3: 3,
    total: 0
  },

  computed: {
    student(data) {
      return (data.name + ':' + data.score);
    },
  },

  watch: {
    'score1,score2,score3': function(v1,v2,v3) {
      this.setData({
        total: v1+v2+v3
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addScoree() {
      this.setData({
        score: this.data.score + 2
      })
    },

    changeScore1() {
      this.setData({
        score1: Math.ceil(Math.random()*10)
      })
    },

    changeScore2() {
      this.setData({
        score2: Math.ceil(Math.random()*10)
      })
    },

    changeScore3() {
      this.setData({
        score3: Math.ceil(Math.random()*10)
      })
    }
  } 
})
