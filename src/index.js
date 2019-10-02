// index.VueをインポートしてVueインスタンスに組み込み、index.htmlに組み込む。
// 必要なパッケージをインストールするためのファイル。

import Vue from 'vue';
import uuid from 'vue-uuid';
// App.vueがデフォルトエクスポートしたVueインスタンスをインポートし、変数MyAppに代入。
import MyApp from 'Components/App';
// 引数にインポートしたモジュールを指定することで、単一ファイルコンポーネント内で利用できる。
// this.$uuidで使用することができる。
import store from './store';

Vue.use(uuid);

new Vue({ // Vueインスタンスの作成。このインスタンスがindex.htmlに組み込まれる。
  el: '#app', // index.htmlのbody直下のdivにマウント
  store, // storeインスタンス内のstateを使用可能に。
  components: {
    MyApp // key(カスタムタグ名):value(vueインスタンス名)の省略形。keyはケバブケースに変換。
  },
  // カスタムタグ（htmlタグとして自身で作ったもの）でindex.htmlのどこに組み込むか指定
  template: '<my-app></my-app>',
});
