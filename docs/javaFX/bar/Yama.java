/*
 * 三山くずしゲーム
 */
import javafx.scene.image.*; //Image
import javafx.scene.canvas.*;  //Canvas, GraphicsContext
import javafx.scene.paint.*; //Color
import javafx.scene.text.Font;  
 

//yamaのクラス
public class Yama extends Canvas{
   static final int N = 15;    // 最大の棒の数
   static final int B = 4;     // バイナリ表現したときの桁数

   int state[][];      // 棒があるかないか 0:なし、1:あり、2:チェック済
   int kazu[][];       // 棒の最初の数(kazu[][0])と現在の数(kazu[][1])
   char binary[][];      // バイナリ表現
   byte over = 0; // ０：ゲーム中 １：コンピュータ勝ち ２：人間勝ち
   Image barImg, checkImg, delImg;
   static final int bx=20, by=100;
   double w = 400;
   double h = 400;

   // コンストラクタ
   Yama(){
       super(400, 400);
       state = new int[3][N];      
       kazu = new int[3][2];      
       binary = new char[3][B];      

       //棒の画像
       barImg = new Image(getClass().getResourceAsStream("/bar.gif"));
       checkImg = new Image(getClass().getResourceAsStream("/check.gif"));
       delImg = new Image(getClass().getResourceAsStream("/del.gif"));

       initState();        // 棒の初期設定
       drawYama();
   }

   // 乱数を使って棒の数を決める。３以下には３を加える
   // 棒の数から、stateの値を初期設定
   void initState(){
        int tmp, k;
        for (int i=0; i<3; i++){
           kazu[i][0] = ((tmp = (int)(Math.random()*N)) < 3) ? tmp+3 : tmp;
           kazu[i][1] = kazu[i][0];
           for (k=0; k<kazu[i][0]; k++)
               state[i][k] = 1;
           for (k=kazu[i][0]; k<N; k++)
               state[i][k] = 0;
        }
        setBinary();  
   }

   // 変数stateから、残った棒の数をかぞえ、kazuに設定
   void count(){
        int num;
        for (int i=0; i<3; i++){
           num = 0;
           for (int j=0; j<kazu[i][0]; j++){
              if(state[i][j] == 1)
                 num++;
           }
           kazu[i][1] = num;
        }
   }

   // i番めの山のj番目の棒を消す
   void setState(int i, int j){
        state[i][j] = 0;
   }

   // 変数kazuの現在の棒の数から、数のバイナリ表現を作る
   void setBinary(){
        String tmp;
        int len, i, j;

        for (i=0; i<3; i++){  
           tmp = Integer.toBinaryString(kazu[i][1]); //本数の2進数表記(文字列)
           len = tmp.length();
           for (j=len-1; j>=0; j--){
              if (tmp.charAt(j) == '1')
                 binary[i][j+B-len] = '1';
              else
                 binary[i][j+B-len] = '0';
           }
           for (int m=0; m<B-len; m++){
                 binary[i][m] = '0';
		   }
		   //↑本数の2進数表記の文字列を分解して、charの配列に入れる
        }
    }

    public void drawYama(){
		GraphicsContext gc = getGraphicsContext2D();

		gc.clearRect(0, 0, w, h); 

        //グラフィックスを描く
		gc.setFill(Color.WHITE);
        gc.fillRect(0, 0, w, h);   // 背景塗る
       	gc.setFill(Color.BLACK);
		gc.setFont(Font.font(18));
        gc.fillText("列の端から任意の数の棒をクリックして消してください。", 10, 50);
        gc.fillText("最後に棒を消すことになった方が勝ちです。", 10, 80);

        for (int i=0; i<3; i++){
           for (int j=0; j<N; j++){
              if (state[i][j] == 1){
                 gc.drawImage(barImg, bx+j*20, by+i*60);
              } else if (state[i][j] == 2){
                 gc.drawImage(delImg, bx+j*20, by+i*60);
              } else if (state[i][j] == 3){
                 gc.drawImage(checkImg, bx+j*20, by+i*60);
              }
           }
        }
		if(over == 1){
			gc.fillText("コンピュータの勝ち。もう一戦どうですか？", 10, by+220);
		}else if(over == 2){
			gc.fillText("人間の勝ち。もう一戦どうですか？", 10, by+220);
		}
    }

    public void debugPrint(){
        int i, j;
        System.out.println("State ");
        for (i=0; i<3; i++){
           for(j=0; j<N; j++)
             System.out.print(state[i][j] + "  ");
           System.out.println();
        }
        System.out.println("Binary ");
        for (i=0; i<3; i++){
           for(j=0; j<B; j++)
             System.out.print(binary[i][j] + "  ");
           System.out.println();
        }

        System.out.println("Kazu ");
        for (i=0; i<3; i++)
             System.out.print(kazu[i][1] + "  ");
        System.out.println();
    }
}
