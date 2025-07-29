/*
 * 三山くずしゲーム
 */
import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.*;  // Button etc.
import javafx.scene.layout.*;  // VBox, HBox 
import javafx.scene.paint.*; //Color
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.geometry.*;   //  Pos
import javafx.scene.input.*; //MouseEvent
import java.awt.Toolkit;

//画面コントロール用のクラス
public class Bargame extends Application {

    Button doB, newB, cancelB; //操作用ボタン
    Yama ba;
//    BarPlay listener; 
//    Container content;
    private int state[][];     //ワーク用 0:なし、1:あり、2:チェック済 3:未確定状態の選択
    private int can[][];     //選択できる棒のリスト
							//can[][0]:どの山か(0,1,2), can[][1]何番目の棒か
    private int canNum;        //選択できる棒の数
    private int cnt[] = new int[] {0,0,0,0};    // バイナリデータの１の個数
    private boolean first = true; // 最初の選択を待つ状態
    private byte over = 0; // ０：ゲーム中 １：コンピュータ勝ち ２：人間勝ち

    //public void init() {           //初期化メソッド
	@Override
    public void start(Stage pstage) {
		//ボタンをのせる
		HBox lowerPane = new HBox(); 
		lowerPane.setAlignment(Pos.CENTER);
		lowerPane.setPadding(new Insets(15, 10, 15, 10));
		lowerPane.setSpacing(20);
		lowerPane.setStyle("-fx-background-color: white;");
		doB = new Button("棒の選択終了");
		lowerPane.getChildren().add(doB);

		cancelB = new Button("棒の選択やり直し");    //
		lowerPane.getChildren().add(cancelB);

		newB = new Button("ゲームの開始");
		lowerPane.getChildren().add(newB);

		//上部コンテナ
		FlowPane upperPane = new FlowPane();
		upperPane.setAlignment(Pos.CENTER);
		upperPane.setStyle("-fx-background-color: #fff;");
		//canvas = new Canvas(W, H);
		
		//山オブジェクトを生成
		ba = new Yama();
		upperPane.getChildren().add(ba);
		state = new int[3][Yama.N];
		can = new int[6][2];     //選択できる棒のリスト
		turnClear();
		//全体配置
		VBox root = new VBox();
		root.getChildren().addAll(upperPane, lowerPane);
		Scene scene = new Scene(root);
		pstage.setTitle("Mitsuyama kuzushi");
		pstage.setScene(scene);
		pstage.sizeToScene();
		pstage.show();

//       ba.debugPrint();

		//イベントハンドラの設定
		doB.setOnAction((event)-> {   //棒の選択終了ボタン
			if(first) return;          //まだ選択されていない
			donePlay();                //人間の手を反映、コンピュータがやる
//          ba.debugPrint();			
			afterButtonClicked();
		});

		cancelB.setOnAction((event)-> {   //棒の選択やり直しボタン
			for (int i=0; i<3; i++){
				for (int j=0; j<Yama.N; j++)
					if(ba.state[i][j] == 3) { ba.state[i][j] = 1; }
			}
			afterButtonClicked();			
		});

		newB.setOnAction((event)-> {   //ゲームの開始ボタン
			ba.initState();
			over = 0;
			afterButtonClicked();
		});

		ba.setOnMousePressed((MouseEvent e) -> {  //マウスプレス時の処理
			double ex = e.getX();           // イベントの起こった位置
			double ey = e.getY();
			int bx = Yama.bx;     
			int by = Yama.by;
			int ci=0, cj=0;                  // クリックされた棒の位置

			if (over != 0) return;
			if (ex>=bx && ex<bx+Yama.N*20 && ey>=by && ey<by+3*60){
			  for (int i=0; i<3; i++){
				for(int j=0; j<Yama.N; j++){
					if(ex>=bx+j*20 && ex<bx+(j+1)*20){
						cj = j;
						break;
					}
				}
				if(ey>=by+i*60 && ey<by+(i+1)*60){
					ci = i;
					break;
				}
			  }
			//System.out.println("BAR (" + ci +","+ cj + ")");
			  if (checkSelect(ci,cj)){
				state[ci][cj] = 2;
				ba.state[ci][cj] = 3;  //選択したが未確定状態
				ba.drawYama();  //選択した棒の色を変える
				okSelect(ci,cj);  // クリックできる棒のリストを作る
			  }else{
				Toolkit.getDefaultToolkit().beep();
				return;
			  }
			}  //end of if
		});
	}


		public void afterButtonClicked(){
			ba.over=over;
			ba.drawYama();
			turnClear();
		}

    //人間の手を反映、勝負判定、コンピュータが自分の手を決め、実行する。
    private void donePlay(){
       for (int i=0; i<3; i++){
          for (int j=0; j<Yama.N; j++)
            ba.state[i][j] = state[i][j];
       }
       ba.count();
       ba.setBinary();

       if (winPlay()){
         over = 1;  // コンピュータの勝ち (ひとつの山だけに棒がある)

         return;
       }

       compPlay();

       if (winPlay()){
         over = 2;  // 人間の勝ち 終了
         return;
       }
    }

    // クリックされた棒が正当かどうか調べる
    private boolean checkSelect(int ci, int cj){
       for (int i=0; i<canNum; i++){
          if (can[i][0] == ci && can[i][1] == cj) {
              first = false;
              return true;
          }
       }
       return false;
    }

    // 人間の手ごとにワーク変数をクリア
    private void turnClear(){
       for (int i=0; i<3; i++){
          for (int j=0; j<Yama.N; j++)
            state[i][j] = ba.state[i][j];
       }
       first = true;
       okSelect(0,0);
     }

     // クリックできる棒のリストを作る
     private void okSelect(int ci, int cj){
       int m=0, j; 
       if (first){ // 初めての選択
          for (int i=0; i<3; i++){ 
              if (ba.kazu[i][1] == 0) continue;  //その山に棒はない
              for (j=0; j<ba.kazu[i][0]; j++){
                  if (state[i][j] == 1){
                     can[m][0] = i;
                     can[m++][1] = j;
                     break;
                  }
              }
              for (j=ba.kazu[i][0]-1; j>=0; j--){
                  if (state[i][j] == 1){
                     can[m][0] = i;
                     can[m++][1] = j;
                     break;
                  }
              }
          }
          canNum = m;
       }
       else {
          can[0][0] = ci;
          canNum = 1;
          if (cj < Yama.N && state[ci][cj+1] == 1) can[0][1] = cj+1;
          else if (cj > 0 && state[ci][cj-1] == 1) can[0][1] = cj-1;
          else canNum = 0;
       }
    }

    // コンピュータの手
    private void compPlay(){
       if (!checkSafe(ba.binary)) { // safeでない状態なら適当に１本消す
          noThinkPlay();
       }
       else{
         thinkPlay();
       }
       ba.setBinary();
       ba.count();

    }

    private void thinkPlay(){       
       char binary[][] = new char[3][Yama.B];
       int changed = 0;
       int i, j;

       for (i=0; i<3; i++){
          for (j=0; j<Yama.B; j++)
            binary[i][j] = ba.binary[i][j];
       }

       if ((j=isOneCnt()) != 9) { //奇数の列は１つだけ 9は「バイナリの1の数が奇数の列が複数」の意味
          for(i=0; i<3; i++){
             if (binary[i][j] == '1'){
                changed = i;
                binary[i][j] = '0';
             }
          }
       }
       else {  // 奇数の列が複数ある
           // 左から１が奇数個の列を探す
              changed = leftOneCnt(binary);
              int tmp = ba.kazu[changed][1];


           // バイナリの１の数が偶数個になるように、changedの行を操作
           do{
               tmp = changeBinary(binary, tmp, changed);
           } while(checkSafe(binary));
        }

        
        // 変更したバイナリから消す棒の本数を調べる
        String str = new String(binary[changed]); 
        int newKazu = Integer.parseInt(str, 2);  // 新しい棒の本数
        int sa = ba.kazu[changed][1] - newKazu;
        ba.kazu[changed][1] = newKazu;

        for (j=0; j<ba.kazu[changed][0] && sa>0; j++){ 
                                      // 棒を差の本数だけ消す
           if (ba.state[changed][j] == 1){
                 ba.state[changed][j] = 2;
                 sa--;
              }
         }
   }


   // 1の数が奇数である列が１つだけならその列の添字を返し、
   // そうでなければ９を返す。
   private int isOneCnt(){
      int num = 0, one = 0;
  
      for (int j=0; j<Yama.B && num<2; j++){
        if (cnt[j]%2 != 0) {
           num++;
           one = j;
        }
      }
      if (num == 1) return one;
      else return 9;
   }
      
   // 一番左の1の数が奇数である列に１がある行を探し、返す
   private int leftOneCnt(char binary[][]){
      int j;
      for (j=0; j<Yama.B; j++){
        if (cnt[j]%2 != 0) {
           break;
        }
      }
      for (int i=0; i<3; i++){
         if (binary[i][j] == '1') return i;
      }
     return -1; // error
   }
      
   // 山から１本棒を取り除き、そのバイナリをセット
   private int changeBinary(char binary[][], int kazu, int row){
      int tmpkazu, len;
      String tmpstr;


      tmpkazu = kazu - 1;
      tmpstr = Integer.toBinaryString(tmpkazu);
      len = tmpstr.length();
      for (int j=len-1; j>=0; j--){
          if (tmpstr.charAt(j) == '1')
             binary[row][j+Yama.B-len] = '1';
          else
             binary[row][j+Yama.B-len] = '0';
      }
      for (int m=0; m<Yama.B-len; m++)
          binary[row][m] = '0';

      return tmpkazu;

   }

   // safeな状態ならtrueを、そうでないならfalseを返す。
   private boolean checkSafe(char bin[][]){

      int i=0,j;
      for (j=0; j<Yama.B; j++){       // バイナリデータの１の数を数える
         cnt[j] = 0;
         for (i=0; i<3; i++){
            if(bin[i][j] == '1') cnt[j]++;
         }
      }
      for (j=0; j<Yama.B; j++){
         if ( cnt[j]%2 != 0 )
             return true;
      }
      return false;
   }

   // safeな状態の時の手。適当に１本消す
   private void noThinkPlay(){
      for (int i=0; i<3; i++){
         if (ba.kazu[i][1] != 0){
             for (int j=0; j<ba.kazu[i][1]; j++){ 
                if (ba.state[i][j] == 1){
                    ba.state[i][j] = 2;
                    ba.kazu[i][1]--;
                   // ba.delBar(i,j);
					ba.drawYama();
                    return;
                }
              }
          }
      }

   }


   // 勝敗を調べる
   private boolean winPlay(){
      for (int i=0; i<3; i++){
         if (ba.kazu[i][1] >= 1 && ba.kazu[(i+1)%3][1] == 0 
                                      && ba.kazu[(i+2)%3][1] == 0 ) 
             return true;
      }
      return false;   
   }

	public static void main(String... args) {
		launch(args);
	} 
  }
