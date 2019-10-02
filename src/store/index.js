import Vue from 'vue';
import Vuex from 'vuex';
import count from './modules/count';
// import actions from './actions';
// import mutations from './mutations';

Vue.use(Vuex);
// storeの第1引数＝リアクティブプロパティの初期値
export default new Vuex.Store({ // storeインスタンスをsrc直下のindex.htmlでインポートする
/* モジュール化する前（各ファイルで定義し、呼び出し。）
  state: {
    count: 0,
  },
  actions,
  mutations,
*/
  modules: {
    count, // 分割したモジュールcount.jsのstateを指定。
  }
});
