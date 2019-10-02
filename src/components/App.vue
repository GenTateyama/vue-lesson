<template>
  <div>
    <h1
      v-html='leads.message'
      :class="classObject"
    ></h1>
    <p>{{ leads.description }}</p>
    <button @click="changeTextSize">large</button>
    <button
      @click="addDescription"
    >
      add description
    </button>
    <hr>
    <child-component
      v-if="isShow"
    >
      <template #head> <!--値で結びつけるslotを指定-->
        <p>head slot</p>
      </template>
      <template #default> <!--あえてdefaultスロットを指定することも可能-->
        <p>main slot</p>
        <p>main slot2</p>
      </template>
      <template #foot> <!--値で結びつけるslotを指定-->
        <p>foot slot</p>
      </template>
    </child-component>
    <button @click="toggleShow">toggle isShow</button>
    <hr>
    <p v-if="id === 1">1</p>
    <template v-else-if="id === 2">
      <p>2-1</p>
      <p>2-2</p>
      <p>2-3</p>
    </template>
    <p v-else>other</p>
    <hr>
      <template v-for="item in items">
        <child-component
          :key="item.id"
          :title="item.title"
        >
          <span>slot content</span>
        </child-component>
      </template>
    <hr>

<!-- 下記をCounter.vueというコンポーネントにする -->
    <counter></counter>
    <!-- :count（子で識別するための属性名）="count"（バウンドすることで送信可能にするプロパティ） 　-->
    <!--@カスタムイベント="子の影響で発火させたいメソッド"-->
    <hr>
    <input type="text" v-model="inputText"> <!-- const upperCaseText に紐づける-->
    <p>computed: {{ getUpperCaseText }}</p> <!--プロパティなので()は必要ない。-->
    <p>methods: {{ showUpperCaseText() }}</p> <!--関数の呼び出しなので()が必要。再描画のたびに実行される-->
    <hr>
    <form>
      <div>
        <span>名前：</span>
        <!-- v-model="inputTextは以下を省略している。
        <input-text
        :value="form.name"　　　　　　　　　　　　 ⓵まずvalue属性の値をvueインスタンス内のプロパティと紐づける。
        @input="form.name = $event.target.value" ⓶inputと名付けたイベントを定義。発火時に子から渡された値とvueインスタンス内のプロパティを紐づける。
        >
      -->
        <input-text v-model="form.name"></input-text> <!--InputText.vueに結び付いたカスタムタグ -->
        <p>名前：{{ getInputName }}</p> <!--computed(監視を行う算出プロパティ)内のメソッド。入力された値を返す-->
      </div>
      <div>
        <span>性別:</span>
        <label>
          男性
          <input type="radio" value="male" v-model="form.sex">
        </label>
        <label>
          女性
          <input type="radio" value="female" v-model="form.sex">
        </label>
        <p>性別: {{ getRadioValue }}</p>
      </div>
      <div>
        <select v-model="form.selected">
<!-- disabled属性とは、その属性が付いているoptionタグをユーザーが選択することができない無効な値として指定したいときに使用します。 -->
          <option disabled value="">--出身地を選択してください--</option>
          <option v-for="option in form.options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.value }}
          </option>
        </select>
        <p>出身地:{{ getSelectValue }}</p>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="form.checked">
          20際以上です
        </label>
        <p>チェックボックス: {{ getCheckBoxValue }}</p>
      </div>
    </form>
    <hr>
    <template v-for="category in categories"> <!--categories: ['Javascript', 'jQuery'],  -->
    <p :key="$uuid.v4()">
      {{ category }}
    </p>
    </template>
    <!-- this.categories[1] = 'Vue.js' というインデックス指定の変更はできない。 -->
    <button @click="updateText">update text</button>
    <hr>
    <!--        ここからarticle                -->
    <article v-for="post in posts"
      :key="$uuid.v4()"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </article>
  </div>
</template>

<script>
//
import ChildComponent from 'Components/ChildComponent';
import Counter from 'Components/Counter';
import InputText from 'Components/InputText';
// axios: HTTP通信を簡単に扱えることができるJavaScriptライブラリ。HTTPリクエストを送ったり、JSONを取得したりするのがより簡単になる。
import axios from 'axios';

export default {
  beforeCreate() {
    console.log('beforecreate');
    console.log(this.leads); //undefined
  },
  created() {
     console.log('created');
     console.log(this.posts);
     axios.get('/data.json').then(res => { // axios.get(リクエスト先のurl, params)にthenをメソッドチェーンでつなぎ、「成功時の処理」を書いている。
       this.posts = res.data.posts;
     });
   },
   beforeMount() {
     console.log("beforemount");
     console.log(this.$el);//undefined
   },
   mounted() {
     console.log('mounted');
     console.log(this.$el);
   },
   beforeUpdate() {
     console.log('beforeupdate');
   },
   updated() {
     console.log('updated');
   },

// es6のメソッド記法
  data() { // Vueインスタンスの作成時にプロパティがリアクティブになる。その後の"リアクティブ"プロパティの追加は不可。
    return {
      leads: {
        message: '<span>Hello Vue</span>',
        description: '',
      },
      isShow:true,
      classObject:{
        'is-green':true,
      },
      id: 2,
      // count: 0,　← storeで管理しているため。
      inputText: "",
      items: [
        {
          id: this.$uuid.v4(),
          title: "1番目のリスト"
        },
        {
          id: this.$uuid.v4(),
          title: "2番目のリスト"
        },
        {
          id: this.$uuid.v4(),
          title: "3番目のリスト"
        }
      ],
      form: {
        name: "",
        sex: "", // 入力されたボタンに関連したvalueがv-modelによって送られる。メソッドの戻り値へ送られ、マスタッシュへ
        selected: "",
        options: [
          {
            id: this.$uuid.v4(),
            value: '東京都',
          },
          {
            id: this.$uuid.v4(),
            value: '埼玉県',
          },
          {
            id: this.$uuid.v4(),
            value: '神奈川県',
          },
          {
            id: this.$uuid.v4(),
            value: '千葉県',
          },
        ],
        checked: false,
      },
      categories: ['Javascript', 'jQuery'],
      posts: [], // data.jsonで取得したデータを入れる。
    }
  }, // data終了
  methods: { // 画面の再描画のたびに実行される →ボタンのクリックなどと連動している！
    incrementCount(){ // mutationで定義しているため不要。
      this.count++; // thisはvueインスタンスを指している。
    },
    showUpperCaseText(){
      const upperCaseText = this.inputText.toUpperCase();
      // console.log('method: ${upperCaseText}');
      return upperCaseText;
    },
    addDescription(){
// descriptionというプロパティが定義されていなければ、追加してもリアクティブプロパティに追加されず、エラーが表示される。→""; と定義しておく。
      this.leads.description = "Vue-lesson"
      // console.log(this);
      console.log(this.leads.description);
    },
    changeTextSize() { // h1のclassにバインディングしている既存のclassObjectを変更
// 空のオブジェクトに既存のオブジェクトと新たなプロパティを組み込み、オブジェクトの更新をしている　
// $set の場合：changeTextSize() { this.$set(this.classObject, 'is-large', true); }
// スプレッド演算子の場合: changeTextSize() {  this.classObject = {...this.classObject, 'is-large': true}; }
      this.classObject = Object.assign({}, this.classObject, {
        'is-large': true, // is-large:true を組み込んだオブジェクトに更新する
      });
    },
    toggleShow () {
      this.isShow = !this.isShow; // booleanの反転
    },
    updateText() { // 配列の値の変更
// this.categories[1] = 'Vue.js';　←インデックスへの直接指定のため不可。
      this.$set(this.categories, 1, 'Vue.js');
    },
  }, // methods終了
  watch: { // 前回と現在の値を参照した処理が主な役割
    inputText(value, oldValue) {
      console.log(`value -> ${value}`);
      console.log(`oldValue -> ${oldValue}`);
    },
    leads: { // dataで定義したleadsオブジェクトを監視対象に
      handler(){
        console.log('add description'); // 値変化時の通知のようなもの
      },
      deep: true, // 対象のオブジェクト内の値の変更を監視。値が変化したときのみ関数実行。
    }
  },
  computed: { // 依存しているプロパティの値に変化があったときのみ実行
    getUpperCaseText(){
      const upperCaseText = this.inputText.toUpperCase(); // 小文字のアルファベットを大文字にに変換
      // console.log(`computed: ${upperCaseText}`); // テンプレートリテラル
      return upperCaseText; // getUpperCaseTextに戻り値として、大文字にしたinputTextを返す。
    },
    getInputName() {
      return this.form.name;
    },
    getRadioValue() {
      return this.form.sex;
    },
    getSelectValue() {
      return this.form.selected;
    },
    getCheckBoxValue() {
      return this.form.checked;
    }
  },
  components: { // inportしたコンポーネンツを紐づけている
    ChildComponent,
    Counter,
    InputText,
  }
} // vueインスタンス終了
</script>

<style scoped>
  .is-green {
    color: green;
  }
  .is-large {
    font-size: 48px;
  }
  hr {
    margin: 16px 0;
  }
</style>
