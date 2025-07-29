 // レヴィ曲線
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


public class LevyStandAlone extends JPanel{
    InputP ip;
    DrawLevy da;
    int n=1;               // 繰り返し回数 
    int h,w;
    public LevyStandAlone() {
       w=400;               // 幅
       h=400;              // 高さ
       BoxLayout layout = new BoxLayout(this, BoxLayout.Y_AXIS);
       setLayout(layout);    //配置方式を設定
       ip = new InputP();     //入力パネルを作る
       da = new DrawLevy(w,h-40);  //キャンバスを作る
       add(da);
       add(ip);
    } 

    public static void main(String args[]){
       JFrame f  = new JFrame("Levy curve");
       LevyStandAlone example = new  LevyStandAlone();
       f.getContentPane().add(example, BorderLayout.CENTER);
       f.pack();
       f.setVisible(true);
    }

   //ボタンを置くパネル
   class InputP extends Panel implements ActionListener,ItemListener { 
       Button goB;            //描画ボタン
       Choice nC;  // 選択
       InputP(){
         nC = new Choice();     // 繰り返し回数の設定
         for (int i=1; i<=15; i++) {  
            nC.addItem(""+i); 
         } 
         goB = new Button("描画");
         //イベントリスナーの設定  
         nC.addItemListener(this);
         goB.addActionListener(this);
         //配置
         add(new Label("繰り返し回数"));
         add(nC);
         add(goB);
      }
      public void actionPerformed(ActionEvent e) { // ボタン 
         if (e.getSource() == goB) {   
            da.repaint(); 
         } 
      } 

      public void itemStateChanged(ItemEvent e) { // チョイス 
         if (e.getSource() == nC) { 
            n=nC.getSelectedIndex()+1; //繰り返し回数決定
         } 
      }
   }
   class DrawLevy extends Canvas {
       int w, h;
       int sX, sY;        // 画をcanvasの中央に描くためのスタート位置の調整
       double len;        // 線分の長さ 
       double x0,y0;      // 線分の左側の点のx,y座標
       static final double RAD=Math.PI/180.0;  // ラジアンに変換するための値
       Color col;         // 線分の色
       Color colB;        // 背景の色
       DrawLevy(int w, int h){  //コンストラクタ
          setSize(w, h);   //キャンバスの大きさを設定
          this.w=w;
          this.h=h;
          col = new Color(0, 0, 124);
          colB = new Color(255, 255, 211);
       }

     public void paint( Graphics g ) { 
         x0=0.0;
         y0=0.0;
         //1辺の長さは((ルート2)のn乗分の1)
         //どんどん図が大きくなるので、wを3分の1にして計算
         len = ((double)w/3)/Math.pow(Math.sqrt(2), (double)n);
         g.setColor(colB); // 背景色 
         g.fillRect(0,0,w,h);        // 背景 
         g.setColor(col);       // 描画色
         levyCarve(g,n);               // コッホ曲線を描く
      } 

      public void levyCarve(Graphics g,int nn) { 
         sX = w/3;          //図のx位置の調整
         sY = h/2;          //図のy位置の調整
         rlevy(g,nn,0.0);   //ベースラインが一本のレビ曲線
      }

      //レビ曲線を再帰的に描画
      public void rlevy(Graphics g,int nn, double angle) { 
         double x,y; 
         if (nn <= 0) { 
            x=len*Math.cos(angle*RAD)+x0;     //x座標
            y=len*Math.sin(angle*RAD)+y0;     //y座標
            g.drawLine((int)(sX+x0),(int)(sY-y0),(int)(sX+x),(int)(sY-y)); 
            x0=x; y0=y;                  // x,yの置き換え 
            return; 
         } 
         angle=angle+45;
         rlevy(g,nn-1,angle);     //左側の線分
         angle=angle-90;
         rlevy(g,nn-1, angle);     //右側の線分
      }
  } 
 } 


