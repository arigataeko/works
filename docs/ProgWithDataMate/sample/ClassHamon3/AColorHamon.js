
class AColorHamon extends AHamon {

  constructor(limit, v1, v2, v3) {
    super(limit);  //superは親クラスを意味する。AHamonクラスのコンストラクタを実行
    this.value1 = v1;  //引数で渡された色情報を設定
    this.value2 = v2;
    this.value3 = v3;
  }

  display() {
    stroke(this.value1, this.value2, this.value3);  //描画色を設定
    super.display();  //親クラスのdisplay()を実行
  }
}
